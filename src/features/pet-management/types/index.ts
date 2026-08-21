import type getMaoPets from "../services/getMaoPets";
import type getSinglePet from "../services/getSinglePet";

export type Pet = Awaited<ReturnType<typeof getMaoPets>>[number];
export type SinglePet = Awaited<ReturnType<typeof getSinglePet>>;
