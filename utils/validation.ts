import { z } from "zod";

export const answerSchema = z.object({
    personality: z.string().describe("First name of the personality in lowercase that user mentions and want answer from."),
    answer: z.string(),
  })