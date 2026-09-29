import { NextRequest, NextResponse } from "next/server";
import { getComplaintById, updateComplaintStatus } from "@/lib/complaintsStore";
import { ComplaintStatus } from "@/types/complaint";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const complaint = await getComplaintById(id);

    if (!complaint) {
      return NextResponse.json(
        { success: false, error: "Complaint not found with ID: " + id },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: complaint });
  } catch (error: any) {
    console.error("API /api/complaints/[id] GET error:", error);
    return NextResponse.json(
      { success: false, error: "Error fetching complaint details." },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status, note, updatedBy } = body;

    const validStatuses: ComplaintStatus[] = [
      "REPORTED",
      "ASSIGNED",
      "IN_PROGRESS",
      "RESOLVED",
    ];

    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid status. Must be REPORTED, ASSIGNED, IN_PROGRESS, or RESOLVED.",
        },
        { status: 400 }
      );
    }

    const updated = await updateComplaintStatus(
      id,
      status as ComplaintStatus,
      note,
      updatedBy || "Municipal Authority"
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Complaint not found with ID: " + id },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updated,
      message: `Complaint ${id} status updated to ${status}.`,
    });
  } catch (error: any) {
    console.error("API /api/complaints/[id] PATCH error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update complaint status." },
      { status: 500 }
    );
  }
}
