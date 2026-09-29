import { getAuth, Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as fbSignOut } from "firebase/auth";
import { getFirebaseApp, getFirestoreDb } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { UserProfile, UserRole } from "@/types/user";

export function getFirebaseAuth(): Auth | null {
  const app = getFirebaseApp();
  if (!app) return null;
  try {
    return getAuth(app);
  } catch (err) {
    console.warn("[JanSetu AI] Firebase Auth initialization notice:", err);
    return null;
  }
}

/**
 * Saves user profile to Cloud Firestore `users` collection if connected
 */
export async function saveUserProfileToFirestore(profile: UserProfile): Promise<void> {
  const db = getFirestoreDb();
  if (!db) return;
  try {
    const userDocRef = doc(db, "users", profile.uid);
    await setDoc(userDocRef, profile, { merge: true });
    console.log(`[JanSetu AI] User profile ${profile.uid} saved to Firestore.`);
  } catch (err) {
    console.warn("Could not save user profile to Firestore:", err);
  }
}

/**
 * Retrieves user profile from Cloud Firestore `users` collection if connected
 */
export async function getUserProfileFromFirestore(uid: string): Promise<UserProfile | null> {
  const db = getFirestoreDb();
  if (!db) return null;
  try {
    const userDocRef = doc(db, "users", uid);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      return snap.data() as UserProfile;
    }
  } catch (err) {
    console.warn("Could not retrieve user profile from Firestore:", err);
  }
  return null;
}
