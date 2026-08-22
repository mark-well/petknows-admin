import type { Database } from "../../../shared/types/database.types";
import type getMaoPets from "../services/getMaoPets";

export type Pet = Awaited<ReturnType<typeof getMaoPets>>[number];
export type PetUpdateType = Database["public"]["Tables"]["pets"]["Update"];
