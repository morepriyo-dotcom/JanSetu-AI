import {
  Complaint,
  ComplaintStatus,
  ComplaintStats,
  CivicCategory,
  ComplaintPriority,
} from "@/types/complaint";
import { SAMPLE_COMPLAINTS } from "./demoData";
import { db, isFirebaseConfigured } from "./firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";

// Server-side & client-side in-memory store initialized with realistic demo data
let inMemoryComplaints: Complaint[] = [...SAMPLE_COMPLAINTS];

const LOCAL_STORAGE_KEY = "jansetu_ai_complaints_v1";

function getClientStoredComplaints(): Complaint[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error("Failed to read from localStorage:", err);
  }
  return null;
}

function saveClientStoredComplaints(complaints: Complaint[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(complaints));
  } catch (err) {
    console.error("Failed to save to localStorage:", err);
  }
}

/**
 * Fetch all complaints (from Firestore if configured, else from demo store)
 */
export async function getAllComplaints(): Promise<Complaint[]> {
  if (isFirebaseConfigured && db) {
    try {
      const colRef = collection(db, "complaints");
      const q = query(colRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Complaint));
      }
    } catch (err) {
      console.warn("Firestore fetch error, falling back to local store:", err);
    }
  }

  // Fallback to client or in-memory store
  if (typeof window !== "undefined") {
    const cached = getClientStoredComplaints();
    if (cached && cached.length > 0) {
      return cached;
    }
    // initialize local storage with sample data
    saveClientStoredComplaints(inMemoryComplaints);
  }
  return inMemoryComplaints;
}

/**
 * Get single complaint by ID
 */
export async function getComplaintById(id: string): Promise<Complaint | null> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "complaints", id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return { id: snapshot.id, ...snapshot.data() } as Complaint;
      }
    } catch (err) {
      console.warn("Firestore getDoc error, checking local store:", err);
    }
  }

  const all = await getAllComplaints();
  return all.find((c) => c.id.toLowerCase() === id.toLowerCase()) || null;
}

/**
 * Create a new citizen complaint
 */
export async function createComplaint(
  newComplaintData: Omit<Complaint, "id" | "createdAt" | "updatedAt" | "timeline">
): Promise<Complaint> {
  const timestamp = new Date().toISOString();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const id = `JS-2026-${randomSuffix}`;

  const initialTimeline = [
    {
      status: (newComplaintData.status || "REPORTED") as ComplaintStatus,
      timestamp,
      note: "Citizen grievance officially submitted and logged via JanSetu AI.",
      updatedBy: newComplaintData.citizenName || "Citizen User",
    },
  ];

  const fullComplaint: Complaint = {
    ...newComplaintData,
    id,
    createdAt: timestamp,
    updatedAt: timestamp,
    timeline: initialTimeline,
  };

  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "complaints", id);
      await setDoc(docRef, fullComplaint);
      console.log(`[JanSetu AI] Complaint ${id} saved to Firestore.`);
    } catch (err) {
      console.warn("Firestore save failed, persisting locally:", err);
    }
  }

  // Update in-memory & local store
  inMemoryComplaints = [fullComplaint, ...inMemoryComplaints];
  if (typeof window !== "undefined") {
    const existing = getClientStoredComplaints() || inMemoryComplaints;
    const updated = [fullComplaint, ...existing.filter((c) => c.id !== id)];
    saveClientStoredComplaints(updated);
  }

  return fullComplaint;
}

/**
 * Update complaint status (Admin action)
 */
export async function updateComplaintStatus(
  id: string,
  newStatus: ComplaintStatus,
  note?: string,
  updatedBy: string = "Municipal Admin"
): Promise<Complaint | null> {
  const timestamp = new Date().toISOString();
  const existing = await getComplaintById(id);
  if (!existing) return null;

  const statusNote =
    note ||
    `Status transitioned from ${existing.status} to ${newStatus} by ${updatedBy}.`;

  const updatedTimeline = [
    ...existing.timeline,
    {
      status: newStatus,
      timestamp,
      note: statusNote,
      updatedBy,
    },
  ];

  const updatedComplaint: Complaint = {
    ...existing,
    status: newStatus,
    updatedAt: timestamp,
    timeline: updatedTimeline,
  };

  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "complaints", id);
      await updateDoc(docRef, {
        status: newStatus,
        updatedAt: timestamp,
        timeline: updatedTimeline,
      });
      console.log(`[JanSetu AI] Status for ${id} updated to ${newStatus} in Firestore.`);
    } catch (err) {
      console.warn("Firestore update error, updating local store:", err);
    }
  }

  // Update memory & local store
  inMemoryComplaints = inMemoryComplaints.map((c) =>
    c.id.toLowerCase() === id.toLowerCase() ? updatedComplaint : c
  );

  if (typeof window !== "undefined") {
    const cached = getClientStoredComplaints() || inMemoryComplaints;
    const updated = cached.map((c) =>
      c.id.toLowerCase() === id.toLowerCase() ? updatedComplaint : c
    );
    saveClientStoredComplaints(updated);
  }

  return updatedComplaint;
}

/**
 * Reset and Seed with 8+ Realistic Indian Civic Complaints
 */
export async function seedDemoData(): Promise<Complaint[]> {
  inMemoryComplaints = [...SAMPLE_COMPLAINTS];

  if (typeof window !== "undefined") {
    saveClientStoredComplaints(SAMPLE_COMPLAINTS);
  }

  if (isFirebaseConfigured && db) {
    try {
      for (const sample of SAMPLE_COMPLAINTS) {
        const docRef = doc(db, "complaints", sample.id);
        await setDoc(docRef, sample);
      }
      console.log("[JanSetu AI] Seeded 8 realistic complaints into Firestore.");
    } catch (err) {
      console.warn("Firestore seeding error:", err);
    }
  }

  return inMemoryComplaints;
}

/**
 * Compute real-time dashboard statistics
 */
export function computeComplaintStats(complaints: Complaint[]): ComplaintStats {
  const total = complaints.length;
  let reported = 0;
  let assigned = 0;
  let inProgress = 0;
  let resolved = 0;
  let criticalOrHigh = 0;

  for (const c of complaints) {
    if (c.status === "REPORTED") reported++;
    if (c.status === "ASSIGNED") assigned++;
    if (c.status === "IN_PROGRESS") inProgress++;
    if (c.status === "RESOLVED") resolved++;

    if (c.priority === "CRITICAL" || c.priority === "HIGH") {
      criticalOrHigh++;
    }
  }

  return {
    total,
    reported,
    assigned,
    inProgress,
    resolved,
    criticalOrHigh,
  };
}
