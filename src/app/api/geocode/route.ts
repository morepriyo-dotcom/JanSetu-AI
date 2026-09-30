import { NextRequest, NextResponse } from "next/server";

// Cache for recent geocoding lookups (1 hour TTL)
const cache = new Map<string, { address: string; timestamp: number }>();
const CACHE_TTL = 3600 * 1000;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon) {
      return NextResponse.json(
        { success: false, error: "Latitude and longitude required" },
        { status: 400 }
      );
    }

    const latNum = parseFloat(lat);
    const lonNum = parseFloat(lon);

    if (isNaN(latNum) || isNaN(lonNum)) {
      return NextResponse.json(
        { success: false, error: "Invalid coordinate values" },
        { status: 400 }
      );
    }

    // Cache key rounded to ~100m to reduce external requests
    const cacheKey = `${latNum.toFixed(3)},${lonNum.toFixed(3)}`;
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return NextResponse.json({
        success: true,
        address: cached.address,
        source: "CACHE",
      });
    }

    // Call OSM Nominatim with official compliant User-Agent
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const osmUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latNum}&lon=${lonNum}&addressdetails=1`;
    const response = await fetch(osmUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent": "JanSetu-AI-CivicTriage/1.0 (https://jansetu-ai.gov.in; contact@jansetu.gov.in)",
        Accept: "application/json",
      },
    });
    clearTimeout(timeout);

    if (response.ok) {
      const data = await response.json();
      const addr =
        data.display_name ||
        [data.address?.road, data.address?.suburb, data.address?.city, data.address?.state]
          .filter(Boolean)
          .join(", ") ||
        `Lat: ${latNum.toFixed(4)}, Lon: ${lonNum.toFixed(4)}`;

      cache.set(cacheKey, { address: addr, timestamp: Date.now() });

      return NextResponse.json({
        success: true,
        address: addr,
        source: "OSM_NOMINATIM",
      });
    }

    // Graceful fallback to formatted coordinates if OSM is unavailable or rate-limited
    const fallback = `Latitude: ${latNum.toFixed(4)}, Longitude: ${lonNum.toFixed(4)}`;
    return NextResponse.json({
      success: true,
      address: fallback,
      source: "COORDINATE_FALLBACK",
    });
  } catch (err: any) {
    // Return formatted coordinates on any network/timeout error
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get("lat") || "0";
    const lon = searchParams.get("lon") || "0";
    return NextResponse.json({
      success: true,
      address: `Latitude: ${parseFloat(lat).toFixed(4)}, Longitude: ${parseFloat(lon).toFixed(4)}`,
      source: "FALLBACK",
    });
  }
}
