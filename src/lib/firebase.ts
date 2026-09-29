import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore, collection, getDocs, limit, query } from "firebase/firestore";
import { getStorage, FirebaseStorage, ref, uploadString, getDownloadURL } from "firebase/storage";

export interface FirebaseConfigParams {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
}

const LOCAL_STORAGE_FIREBASE_CONFIG_KEY = "jansetu_firebase_config";

/**
 * Get active Firebase config from env or localStorage (if in browser)
 */
export function getActiveFirebaseConfig(): FirebaseConfigParams {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_FIREBASE_CONFIG_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.apiKey && parsed.projectId) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Failed to read Firebase config from localStorage", e);
    }
  }

  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };
}

export function isConfigValid(config: FirebaseConfigParams): boolean {
  return Boolean(
    config.apiKey &&
      config.apiKey.trim() !== "" &&
      config.apiKey !== "your_firebase_api_key" &&
      config.projectId &&
      config.projectId.trim() !== "" &&
      config.projectId !== "your-project-id"
  );
}

let cachedApp: FirebaseApp | null = null;
let cachedDb: Firestore | null = null;
let cachedStorage: FirebaseStorage | null = null;

export function getFirebaseApp(overrideConfig?: FirebaseConfigParams): FirebaseApp | null {
  const config = overrideConfig || getActiveFirebaseConfig();
  if (!isConfigValid(config)) return null;

  try {
    if (getApps().length > 0 && !overrideConfig) {
      cachedApp = getApp();
    } else {
      cachedApp = initializeApp(config, overrideConfig ? `app-${Date.now()}` : "[DEFAULT]");
    }
    return cachedApp;
  } catch (err) {
    console.warn("[JanSetu AI] Firebase App initialization error:", err);
    return null;
  }
}

export function getFirestoreDb(overrideConfig?: FirebaseConfigParams): Firestore | null {
  const app = getFirebaseApp(overrideConfig);
  if (!app) return null;
  try {
    cachedDb = getFirestore(app);
    return cachedDb;
  } catch (err) {
    console.warn("[JanSetu AI] Firestore error:", err);
    return null;
  }
}

export function getFirebaseStorage(overrideConfig?: FirebaseConfigParams): FirebaseStorage | null {
  const app = getFirebaseApp(overrideConfig);
  if (!app) return null;
  try {
    cachedStorage = getStorage(app);
    return cachedStorage;
  } catch (err) {
    console.warn("[JanSetu AI] Firebase Storage error:", err);
    return null;
  }
}

// Initial setup with environment variables
export const isFirebaseConfigured = isConfigValid(getActiveFirebaseConfig());
export const app = getFirebaseApp();
export const db = getFirestoreDb();
export const storage = getFirebaseStorage();

/**
 * Save Firebase configuration to localStorage and notify app
 */
export function saveFirebaseConfigClient(config: FirebaseConfigParams): boolean {
  if (typeof window === "undefined") return false;
  try {
    localStorage.setItem(LOCAL_STORAGE_FIREBASE_CONFIG_KEY, JSON.stringify(config));
    // Clear caches
    cachedApp = null;
    cachedDb = null;
    cachedStorage = null;
    getFirebaseApp(config);
    return true;
  } catch (err) {
    console.error("Failed to save Firebase config to localStorage:", err);
    return false;
  }
}

/**
 * Clear custom Firebase config from localStorage
 */
export function clearFirebaseConfigClient() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(LOCAL_STORAGE_FIREBASE_CONFIG_KEY);
  cachedApp = null;
  cachedDb = null;
  cachedStorage = null;
}

/**
 * Test Firebase Firestore and Storage connection
 */
export async function testFirebaseConnection(config: FirebaseConfigParams): Promise<{
  firestoreSuccess: boolean;
  storageSuccess: boolean;
  error?: string;
}> {
  try {
    const db = getFirestoreDb(config);
    if (!db) {
      return {
        firestoreSuccess: false,
        storageSuccess: false,
        error: "Could not initialize Firestore with provided configuration.",
      };
    }

    // Test Firestore Read
    const complaintsRef = collection(db, "complaints");
    const q = query(complaintsRef, limit(1));
    await getDocs(q);

    // Test Storage
    const storageInstance = getFirebaseStorage(config);
    let storageSuccess = false;
    if (storageInstance) {
      try {
        const testRef = ref(storageInstance, `connection-test-${Date.now()}.txt`);
        await uploadString(testRef, "JanSetu AI Firebase Storage connection test OK");
        storageSuccess = true;
      } catch (storageErr: any) {
        console.warn("Storage test note (might require storage bucket rules):", storageErr);
        // If firestore succeeds, we still consider DB connected
      }
    }

    return {
      firestoreSuccess: true,
      storageSuccess,
    };
  } catch (err: any) {
    return {
      firestoreSuccess: false,
      storageSuccess: false,
      error: err?.message || "Firebase connection test failed.",
    };
  }
}
