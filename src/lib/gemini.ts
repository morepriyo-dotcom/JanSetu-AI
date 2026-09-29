import { GoogleGenerativeAI } from "@google/generative-ai";
import { AIAnalysisResult, CivicCategory, ComplaintPriority } from "@/types/complaint";

const VALID_CATEGORIES: CivicCategory[] = [
  "ROADS",
  "WATER",
  "SANITATION",
  "ELECTRICITY",
  "STREETLIGHT",
  "DRAINAGE",
  "PUBLIC_SAFETY",
  "OTHER",
];

const VALID_PRIORITIES: ComplaintPriority[] = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];

const SYSTEM_PROMPT = `
You are JanSetu AI, an expert Indian civic grievance analysis and public service triage system built for municipal governance.
Analyze citizen complaints regarding municipal and public infrastructure issues.

You MUST respond ONLY with a raw JSON object (no markdown fences, no explanatory text, no code blocks).
The JSON object must strictly match this schema:
{
  "category": "ROADS | WATER | SANITATION | ELECTRICITY | STREETLIGHT | DRAINAGE | PUBLIC_SAFETY | OTHER",
  "issue": "Short concise name of the civic issue (e.g. Hazardous Pothole, Overflowing Garbage)",
  "priority": "LOW | MEDIUM | HIGH | CRITICAL",
  "department": "Name of the Indian municipal department responsible (e.g. Municipal Roads & Infrastructure Department, Solid Waste Management Department, Water Supply & Sewerage Board, Electrical & Public Lighting Department, Public Health & Sanitation, Disaster Management Cell)",
  "summary": "1-2 sentence professional summary of the problem and its public impact",
  "recommendedAction": "Specific, actionable civic engineering or municipal operational step to resolve it within standard citizen charter turnaround times",
  "locationRequired": boolean
}

CRITICAL RULES:
1. Priority Guidelines:
   - CRITICAL: Life-threatening hazards, live dangling wires, road cave-ins on bridges, major water main bursts flooding traffic, severe open sewage outbreaks.
   - HIGH: Deep potholes causing vehicular accidents, blocked main storm drains causing flooding, heavy garbage accumulation near schools/markets.
   - MEDIUM: Non-functional streetlights on residential roads, moderate water leakages, dirty public parks.
   - LOW: Minor litter, faded road signage, non-urgent public garden maintenance.
2. DO NOT INVENT or assume a precise street address or coordinates that the citizen didn't mention.
3. If the citizen complaint contains no identifiable location or landmark, set "locationRequired": true. Otherwise set false.
4. Category must be one of: ROADS, WATER, SANITATION, ELECTRICITY, STREETLIGHT, DRAINAGE, PUBLIC_SAFETY, OTHER.
5. Priority must be one of: LOW, MEDIUM, HIGH, CRITICAL.
`;

/**
 * Intelligent civic heuristic fallback if Gemini API key is missing or encounters rate limiting/network failure.
 * Ensures the application is 100% demo-ready and never crashes.
 */
function analyzeWithHeuristics(
  text: string,
  userProvidedLocation?: string
): AIAnalysisResult {
  const lower = text.toLowerCase();

  let category: CivicCategory = "OTHER";
  let issue = "Civic Infrastructure Issue";
  let priority: ComplaintPriority = "MEDIUM";
  let department = "Municipal Public Works Department";
  let summary = "Citizen grievance regarding civic amenities requiring municipal inspection.";
  let recommendedAction = "Site inspection by ward junior engineer and remedial action.";

  const hasLocationInText =
    lower.includes("near") ||
    lower.includes("road") ||
    lower.includes("street") ||
    lower.includes("colony") ||
    lower.includes("chowk") ||
    lower.includes("gate") ||
    lower.includes("ward") ||
    lower.includes("nagar") ||
    lower.includes("sector") ||
    lower.includes("opposite") ||
    lower.includes("behind");

  const hasLocation = Boolean(
    (userProvidedLocation && userProvidedLocation.trim().length > 3) || hasLocationInText
  );

  // 1. Roads
  if (
    lower.includes("pothole") ||
    lower.includes("road") ||
    lower.includes("gadda") ||
    lower.includes("tar") ||
    lower.includes("asphalt") ||
    lower.includes("speed breaker") ||
    lower.includes("cave-in")
  ) {
    category = "ROADS";
    issue = lower.includes("pothole") ? "Pothole & Damaged Road Surface" : "Road Infrastructure Hazard";
    department = "Municipal Roads & Infrastructure Department";
    if (lower.includes("accident") || lower.includes("fall") || lower.includes("fell") || lower.includes("deep") || lower.includes("dangerous") || lower.includes("danger")) {
      priority = "HIGH";
      summary = "Deep pothole/damaged road surface causing vehicular skidding and accident hazards.";
      recommendedAction = "Immediate cold-mix asphalt patching followed by road surface stabilization.";
    } else {
      priority = "MEDIUM";
      summary = "Deteriorated road pavement requiring bitumen patching and leveling.";
      recommendedAction = "Schedule bitumen repair with zonal road maintenance crew.";
    }
  }
  // 2. Sanitation & Garbage
  else if (
    lower.includes("garbage") ||
    lower.includes("kachra") ||
    lower.includes("waste") ||
    lower.includes("dump") ||
    lower.includes("stench") ||
    lower.includes("smell") ||
    lower.includes("dustbin") ||
    lower.includes("trash")
  ) {
    category = "SANITATION";
    issue = "Garbage Accumulation & Waste Clearance";
    department = "Solid Waste Management Department";
    if (lower.includes("days") || lower.includes("week") || lower.includes("market") || lower.includes("school") || lower.includes("unbearable")) {
      priority = "HIGH";
      summary = "Prolonged garbage accumulation breeding foul odor, insects, and health risks.";
      recommendedAction = "Deploy municipal compactor truck for urgent disposal and sanitize area with lime powder.";
    } else {
      priority = "MEDIUM";
      summary = "Uncollected municipal waste accumulating in public space.";
      recommendedAction = "Dispatch ward sanitation workers for immediate waste clearing.";
    }
  }
  // 3. Streetlight & Electrical
  else if (
    lower.includes("wire") ||
    lower.includes("shock") ||
    lower.includes("spark") ||
    lower.includes("current") ||
    lower.includes("transformer") ||
    lower.includes("hanging wire")
  ) {
    category = "ELECTRICITY";
    issue = "Electrical Wire Hazard";
    priority = "CRITICAL";
    department = "State Electricity Distribution Company";
    summary = "Exposed or dangling electric wire posing acute electrocution danger to pedestrians.";
    recommendedAction = "Emergency isolation of line circuit and urgent re-tensioning/replacement of conductor wire.";
  } else if (
    lower.includes("streetlight") ||
    lower.includes("street light") ||
    lower.includes("dark") ||
    lower.includes("pole") ||
    lower.includes("lamp")
  ) {
    category = "STREETLIGHT";
    issue = "Non-Functional Streetlight";
    department = "Electrical & Public Lighting Department";
    priority = lower.includes("pitch dark") || lower.includes("unsafe") || lower.includes("women") ? "HIGH" : "MEDIUM";
    summary = "Defective streetlight creating safety concerns in public passage.";
    recommendedAction = "Inspect feeder pillar, photo-sensor timer, and replace luminaire bulb.";
  }
  // 4. Water supply
  else if (
    lower.includes("water") ||
    lower.includes("pipeline") ||
    lower.includes("pipe") ||
    lower.includes("leak") ||
    lower.includes("drinking water") ||
    lower.includes("burst")
  ) {
    category = "WATER";
    issue = lower.includes("burst") ? "Major Pipeline Burst" : "Water Supply Leakage";
    department = "Water Supply & Sewerage Board";
    if (lower.includes("burst") || lower.includes("gushing") || lower.includes("waste") || lower.includes("flooding")) {
      priority = "CRITICAL";
      summary = "Potable water pipeline burst causing high-volume water loss and road flooding.";
      recommendedAction = "Close sector valve immediately and send emergency pipeline repair crew.";
    } else {
      priority = "MEDIUM";
      summary = "Underground water pipe leakage reducing water pressure and causing water puddling.";
      recommendedAction = "Excavate leaking joint, repair collar coupling, and restore supply.";
    }
  }
  // 5. Drainage & Sewage
  else if (
    lower.includes("drain") ||
    lower.includes("gutter") ||
    lower.includes("sewage") ||
    lower.includes("overflow") ||
    lower.includes("choke") ||
    lower.includes("nali")
  ) {
    category = "DRAINAGE";
    issue = "Blocked Drainage & Sewage Overflow";
    department = "Drainage & Sewerage Department";
    priority = lower.includes("mosquito") || lower.includes("house") || lower.includes("flood") ? "HIGH" : "MEDIUM";
    summary = "Clogged culvert causing foul water stagnation and sewage backflow.";
    recommendedAction = "Deploy super-sucker desilting machine and clear debris from drainage channel.";
  }
  // 6. Public safety
  else if (
    lower.includes("debris") ||
    lower.includes("encroach") ||
    lower.includes("illegal") ||
    lower.includes("open manhole") ||
    lower.includes("manhole") ||
    lower.includes("safety")
  ) {
    category = lower.includes("manhole") ? "DRAINAGE" : "PUBLIC_SAFETY";
    issue = lower.includes("manhole") ? "Open Manhole Danger" : "Public Safety & Obstruction";
    priority = lower.includes("manhole") ? "CRITICAL" : "MEDIUM";
    department = lower.includes("manhole") ? "Drainage & Sewerage Department" : "Town Planning & Enforcement Cell";
    summary = lower.includes("manhole")
      ? "Uncovered manhole posing severe danger of fatal pedestrian falls."
      : "Public safety concern and unlawful obstruction in civic area.";
    recommendedAction = lower.includes("manhole")
      ? "Immediate barricading and installation of reinforced concrete manhole cover."
      : "Site inspection by municipal squad to clear obstruction.";
  }

  return {
    category,
    issue,
    priority,
    department,
    summary,
    recommendedAction,
    locationRequired: !hasLocation,
  };
}

/**
 * Validates and sanitizes Gemini output to guarantee data contract compliance.
 */
function sanitizeAIOutput(parsed: any, userProvidedLocation?: string): AIAnalysisResult {
  const category: CivicCategory = VALID_CATEGORIES.includes(parsed?.category?.toUpperCase())
    ? (parsed.category.toUpperCase() as CivicCategory)
    : "OTHER";

  const priority: ComplaintPriority = VALID_PRIORITIES.includes(parsed?.priority?.toUpperCase())
    ? (parsed.priority.toUpperCase() as ComplaintPriority)
    : "MEDIUM";

  const issue =
    typeof parsed?.issue === "string" && parsed.issue.trim().length > 0
      ? parsed.issue.trim()
      : "Reported Civic Issue";

  const department =
    typeof parsed?.department === "string" && parsed.department.trim().length > 0
      ? parsed.department.trim()
      : "Municipal Administration Department";

  const summary =
    typeof parsed?.summary === "string" && parsed.summary.trim().length > 0
      ? parsed.summary.trim()
      : "Civic complaint registered for municipal inspection and resolution.";

  const recommendedAction =
    typeof parsed?.recommendedAction === "string" && parsed.recommendedAction.trim().length > 0
      ? parsed.recommendedAction.trim()
      : "Inspect site and take corrective action according to municipal standards.";

  const locationRequired =
    Boolean(parsed?.locationRequired) && (!userProvidedLocation || userProvidedLocation.trim().length === 0);

  return {
    category,
    issue,
    priority,
    department,
    summary,
    recommendedAction,
    locationRequired,
  };
}

export interface AnalyzeComplaintParams {
  description: string;
  location?: string;
  imageBase64?: string;
  imageMimeType?: string;
}

export async function analyzeComplaintWithGemini(
  params: AnalyzeComplaintParams
): Promise<AIAnalysisResult> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === "" || apiKey === "your_gemini_api_key_here") {
    console.log("[JanSetu AI] No GEMINI_API_KEY detected in environment. Using intelligent civic triage engine.");
    return analyzeWithHeuristics(params.description, params.location);
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    // Use gemini-1.5-flash as the fast, recommended multimodal model
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.2,
        responseMimeType: "application/json",
      },
    });

    const userPrompt = `
Citizen Complaint Details:
Description: "${params.description}"
Location provided by citizen: "${params.location || "None provided explicitly"}"
${params.imageBase64 ? "Note: An image of the civic issue has also been attached by the citizen." : ""}

Analyze this complaint and return strict JSON as specified in system instructions.
`;

    let result;
    if (params.imageBase64) {
      const mimeType = params.imageMimeType || "image/jpeg";
      // Strip data URL prefix if present
      const cleanBase64 = params.imageBase64.replace(/^data:image\/\w+;base64,/, "");
      const imagePart = {
        inlineData: {
          data: cleanBase64,
          mimeType,
        },
      };

      result = await model.generateContent([
        { text: SYSTEM_PROMPT },
        imagePart,
        { text: userPrompt },
      ]);
    } else {
      result = await model.generateContent([
        { text: SYSTEM_PROMPT },
        { text: userPrompt },
      ]);
    }

    const responseText = result.response.text();
    // Clean response text from any unexpected wrapping
    const cleanJson = responseText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleanJson);
    return sanitizeAIOutput(parsed, params.location);
  } catch (error: any) {
    console.warn("[JanSetu AI] Gemini API call error, falling back to resilient civic analysis:", error?.message || error);
    // Graceful fallback prevents demo crash
    return analyzeWithHeuristics(params.description, params.location);
  }
}
