import { getFirebaseStorage } from "./firebase";
import { ref, uploadBytes, getDownloadURL, uploadString } from "firebase/storage";

export interface ImageUploadResult {
  url: string;
  source: "FIREBASE_STORAGE" | "LOCAL_FALLBACK";
}

/**
 * Uploads a complaint photo to Firebase Storage and returns the public download URL.
 * Gracefully falls back to local data URL if Firebase Storage is not yet configured or permissions fail.
 */
export async function uploadComplaintImage(
  fileOrBase64: File | string,
  fileNamePrefix: string = "complaint"
): Promise<ImageUploadResult> {
  const storage = getFirebaseStorage();

  if (!storage) {
    console.log("[JanSetu AI] Firebase Storage not active. Using inline image data fallback.");
    if (typeof fileOrBase64 === "string") {
      return { url: fileOrBase64, source: "LOCAL_FALLBACK" };
    }
    // Convert file to base64
    const base64 = await fileToBase64(fileOrBase64);
    return { url: base64, source: "LOCAL_FALLBACK" };
  }

  try {
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);

    if (typeof fileOrBase64 === "string") {
      // It's a base64 string
      const fileExt = fileOrBase64.includes("image/png") ? "png" : "jpg";
      const storagePath = `complaints/${timestamp}_${randomSuffix}.${fileExt}`;
      const imageRef = ref(storage, storagePath);

      // Clean prefix if needed
      const cleanBase64 = fileOrBase64.replace(/^data:image\/\w+;base64,/, "");
      const mimeType = fileOrBase64.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)?.[1] || "image/jpeg";

      await uploadString(imageRef, cleanBase64, "base64", {
        contentType: mimeType,
      });

      const downloadUrl = await getDownloadURL(imageRef);
      console.log("[JanSetu AI] Uploaded image to Firebase Storage:", downloadUrl);
      return { url: downloadUrl, source: "FIREBASE_STORAGE" };
    } else {
      // It's a browser File object
      const safeName = fileOrBase64.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const storagePath = `complaints/${timestamp}_${safeName}`;
      const imageRef = ref(storage, storagePath);

      await uploadBytes(imageRef, fileOrBase64, {
        contentType: fileOrBase64.type || "image/jpeg",
      });

      const downloadUrl = await getDownloadURL(imageRef);
      console.log("[JanSetu AI] Uploaded image file to Firebase Storage:", downloadUrl);
      return { url: downloadUrl, source: "FIREBASE_STORAGE" };
    }
  } catch (err: any) {
    console.warn(
      "[JanSetu AI] Firebase Storage upload encountered an issue (check Storage security rules):",
      err?.message || err
    );
    // Graceful fallback to avoid blocking citizen submission
    if (typeof fileOrBase64 === "string") {
      return { url: fileOrBase64, source: "LOCAL_FALLBACK" };
    }
    const fallbackBase64 = await fileToBase64(fileOrBase64);
    return { url: fallbackBase64, source: "LOCAL_FALLBACK" };
  }
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}
