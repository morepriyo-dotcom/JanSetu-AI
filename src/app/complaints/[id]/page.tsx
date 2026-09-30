import React from "react";
import { getComplaintById } from "@/lib/complaintsStore";
import { ComplaintDetailViewer } from "@/components/ComplaintDetailViewer";

export const dynamic = "force-dynamic";

export default async function ComplaintDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let complaint = null;
  try {
    complaint = await getComplaintById(id);
  } catch (err) {
    console.warn("Could not retrieve complaint from server store:", err);
  }

  return <ComplaintDetailViewer initialComplaint={complaint} id={id} />;
}
