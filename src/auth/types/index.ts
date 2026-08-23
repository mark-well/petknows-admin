import type { Database } from "../../shared/types/database.types";

export type SigninInputs = {
  email: string;
  password: string;
};

export type UserRoles = Database["public"]["Enums"]["user_roles"];
