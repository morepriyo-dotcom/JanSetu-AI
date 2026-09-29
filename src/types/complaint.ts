export type CivicCategory =
  | "ROADS"
  | "WATER"
  | "SANITATION"
  | "ELECTRICITY"
  | "STREETLIGHT"
  | "DRAINAGE"
  | "PUBLIC_SAFETY"
  | "OTHER";

export type ComplaintPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type ComplaintStatus = "REPORTED" | "ASSIGNED" | "IN_PROGRESS" | "RESOLVED";

export interface AIAnalysisResult {
  category: CivicCategory;
  issue: string;
  priority: ComplaintPriority;
  department: string;
  summary: string;
  recommendedAction: string;
  locationRequired?: boolean;
}

export interface LocationData {
  address?: string;
  latitude?: number | null;
  longitude?: number | null;
  city?: string;
  landmark?: string;
}

export interface ComplaintTimelineEvent {
  status: ComplaintStatus;
  timestamp: string;
  note: string;
  updatedBy: string;
}

export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: CivicCategory;
  issue: string;
  priority: ComplaintPriority;
  department: string;
  summary: string;
  recommendedAction: string;
  location: LocationData;
  imageUrl?: string | null;
  status: ComplaintStatus;
  citizenName?: string;
  citizenPhone?: string;
  createdAt: string;
  updatedAt: string;
  timeline: ComplaintTimelineEvent[];
}

export interface ComplaintStats {
  total: number;
  reported: number;
  assigned: number;
  inProgress: number;
  resolved: number;
  criticalOrHigh: number;
}
