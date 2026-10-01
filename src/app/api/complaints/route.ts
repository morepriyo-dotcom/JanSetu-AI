import { NextRequest, NextResponse } from "next/server";
import { getAllComplaints, createComplaint } from "@/lib/complaintsStore";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const status = searchParams.get("status");
    const priority = searchParams.get("priority");
    const query = searchParams.get("q")?.toLowerCase();

    let complaints = await getAllComplaints();

    if (category && category !== "ALL") {
      complaints = complaints.filter(
        (c) => c.category.toUpperCase() === category.toUpperCase()
      );
    }

    if (status && status !== "ALL") {
      complaints = complaints.filter(
        (c) => c.status.toUpperCase() === status.toUpperCase()
      );
    }

    if (priority && priority !== "ALL") {
      complaints = complaints.filter(
        (c) => c.priority.toUpperCase() === priority.toUpperCase()
      );
    }

    if (query) {
      complaints = complaints.filter(
        (c) =>
          c.title.toLowerCase().includes(query) ||
          c.description.toLowerCase().includes(query) ||
          c.id.toLowerCase().includes(query) ||
          (c.location?.address && c.location.address.toLowerCase().includes(query)) ||
          c.department.toLowerCase().includes(query)
      );
    }

    return NextResponse.json({
      success: true,
      data: complaints,
      total: complaints.length,
    });
  } catch (error: any) {
    console.error("API /api/complaints GET error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve complaints." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.description || !body.category || !body.priority) {
      return NextResponse.json(
        { success: false, error: "Missing required complaint information." },
        { status: 400 }
      );
    }

    const title =
      body.title ||
      body.issue ||
      `${body.category} issue reported at ${body.location?.address || "Unknown Location"}`;

    const complaint = await createComplaint({
      title,
      description: body.description,
      category: body.category,
      issue: body.issue || "Reported Civic Problem",
      priority: body.priority,
      department: body.department || "Municipal Administration",
      summary: body.summary || body.description.slice(0, 150),
      recommendedAction: body.recommendedAction || "Inspect site and resolve.",
      location: body.location || { address: "Civic Ward Area" },
      imageUrl: body.imageUrl || null,
      status: body.status || "REPORTED",
      citizenName: body.citizenName || "Anonymous Citizen",
      citizenPhone: body.citizenPhone || "",
    });

    return NextResponse.json(
      {
        success: true,
        data: complaint,
        message: "Complaint registered successfully.",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("API /api/complaints POST error:", error);
    return NextResponse.json(
      { success: false, error: "Unable to submit complaint. Please try again." },
      { status: 500 }
    );
  }
}
