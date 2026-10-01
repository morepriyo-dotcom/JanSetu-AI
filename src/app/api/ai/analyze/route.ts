import { NextRequest, NextResponse } from "next/server";
import { analyzeComplaintWithGemini } from "@/lib/gemini";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { description, location, imageBase64, imageMimeType } = body;

    if (!description || typeof description !== "string" || description.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide a description of the civic problem.",
        },
        { status: 400 }
      );
    }

    const analysis = await analyzeComplaintWithGemini({
      description: description.trim(),
      location: typeof location === "string" ? location.trim() : undefined,
      imageBase64,
      imageMimeType,
    });

    return NextResponse.json({
      success: true,
      data: analysis,
    });
  } catch (error: any) {
    console.error("API /api/ai/analyze error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "We couldn't analyze your complaint right now. Please try again.",
      },
      { status: 500 }
    );
  }
}
