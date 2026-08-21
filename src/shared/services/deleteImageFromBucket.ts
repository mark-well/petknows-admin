import { supabase } from "../../utils/supabase";

export default async function deleteImageFromBucket(
  bucketName: string,
  url: string[],
) {
  const { error } = await supabase.storage.from(bucketName).remove(url);

  if (error) throw error;
}
