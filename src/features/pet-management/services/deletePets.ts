import { supabase } from "../../../utils/supabase";

export default async function (petIds: Set<string>) {
  if (petIds.size === 0) throw new Error("No pets to delete");
  const { error } = await supabase
    .from("pets")
    .delete()
    .in("id", [...petIds]);

  if (error) throw error;
}
