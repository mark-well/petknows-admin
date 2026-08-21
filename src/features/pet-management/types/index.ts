import type getMaoPets from "../services/getMaoPets";

export type Pet = Awaited<ReturnType<typeof getMaoPets>>[number];
