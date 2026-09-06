import type { Database } from "../../../shared/types/database.types";

export type UserProfile = Database["public"]["Tables"]["profiles"]["Row"];
export type UpdateUserRecord = Pick<
  Database["public"]["Tables"]["profiles"]["Update"],
  "first_name" | "last_name" | "birth_date" | "email" | "contact_number" | "sex"
>;
export type UserSex = Database["public"]["Enums"]["sex"];
