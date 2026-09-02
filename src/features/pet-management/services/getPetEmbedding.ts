import type { GetEmbeddingType } from "../types";

export default async function getPetEmbedding(imageBytes: Blob | null) {
  if(!imageBytes) throw new Error("No bytes")
  const snnapi = import.meta.env.VITE_MODEL_BACKEND_URL;
  const formData = new FormData();
  formData.append("file", imageBytes);

  const response = await fetch(`${snnapi}/get_embedding`, {
    method: "POST",
    body: formData
  })

  if(!response.ok) throw new Error(`Embedding request failed: ${response.status}`);
  const data: GetEmbeddingType = await response.json();
  return data;
}