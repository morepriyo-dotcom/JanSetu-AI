import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { isConfigValid, testFirebaseConnection } from "@/lib/firebase";

export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
  const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
  const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;

  const isConfigured = Boolean(
    apiKey &&
      apiKey !== "your_firebase_api_key" &&
      projectId &&
      projectId !== "your-project-id"
  );

  return NextResponse.json({
    success: true,
    isConfigured,
    config: {
      projectId: projectId || "",
      authDomain: authDomain || "",
      storageBucket: storageBucket || "",
      messagingSenderId: messagingSenderId || "",
      appId: appId || "",
      apiKeyMasked: apiKey ? `${apiKey.substring(0, 6)}...${apiKey.substring(apiKey.length - 4)}` : "",
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId } = body;

    if (!apiKey || !projectId) {
      return NextResponse.json(
        { success: false, error: "Firebase API Key and Project ID are required." },
        { status: 400 }
      );
    }

    // Test the connection
    const testResult = await testFirebaseConnection({
      apiKey,
      authDomain,
      projectId,
      storageBucket,
      messagingSenderId,
      appId,
    });

    if (!testResult.firestoreSuccess) {
      return NextResponse.json(
        {
          success: false,
          error:
            testResult.error ||
            "Failed to connect to Firebase Firestore. Please verify project ID and security rules.",
        },
        { status: 400 }
      );
    }

    // Persist to .env.local
    const envPath = path.join(process.cwd(), ".env.local");
    let envContent = "";
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, "utf-8");
    }

    const updates: Record<string, string> = {
      NEXT_PUBLIC_FIREBASE_API_KEY: apiKey,
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: authDomain || `${projectId}.firebaseapp.com`,
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: projectId,
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: storageBucket || `${projectId}.appspot.com`,
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: messagingSenderId || "",
      NEXT_PUBLIC_FIREBASE_APP_ID: appId || "",
    };

    let updatedContent = envContent;
    for (const [key, val] of Object.entries(updates)) {
      const regex = new RegExp(`^${key}=.*$`, "m");
      if (regex.test(updatedContent)) {
        updatedContent = updatedContent.replace(regex, `${key}=${val}`);
      } else {
        updatedContent += `\n${key}=${val}`;
      }
    }

    fs.writeFileSync(envPath, updatedContent.trim() + "\n", "utf-8");

    // Also update current process.env
    for (const [key, val] of Object.entries(updates)) {
      process.env[key] = val;
    }

    return NextResponse.json({
      success: true,
      message: "Firebase configuration validated and saved successfully!",
      storageTested: testResult.storageSuccess,
    });
  } catch (error: any) {
    console.error("Firebase config save error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update Firebase configuration." },
      { status: 500 }
    );
  }
}
