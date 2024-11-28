import { createEmbedding } from "@/lib/embeddings";
import { openai } from "@ai-sdk/openai";
import { Pinecone } from "@pinecone-database/pinecone";
import { convertToCoreMessages, streamText } from "ai";

// Initialize Pinecone Client
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

const businessInfoIndex = pinecone.Index(process.env.PINECONE_BUSINESS_INDEX!);
const hormoziIndex = pinecone.Index(process.env.PINECONE_HORMOZI_INDEX!);

export async function POST(request: Request) {
  const { messages } = await request.json();

  const userQuery = messages[messages.length - 1]?.content;

  const userEmbedding = await createEmbedding(userQuery);

  const businessInfo = await businessInfoIndex.query({
    vector: userEmbedding,
    topK: 3,
  });

  const hormoziInfo = await hormoziIndex.query({
    vector: userEmbedding,
    includeMetadata: true,
    topK: 3,
  });

  // Combine results into a prompt-friendly format
  const businessContext = businessInfo.matches
    .map((res) => res.metadata?.text)
    .join("\n");
  const hormoziContext = hormoziInfo.matches
    .map((res) => res.metadata?.text)
    .join("\n");

  const systemPrompt = `
You are a helpful assistant for CEOs, providing tailored advice based on their business information and leveraging external knowledge from Alex Hormozi’s teachings.

CEO Business Context:
${businessContext}

External Knowledge (Alex Hormozi’s Insights):
${hormoziContext}

User Query:
${userQuery}
`;

  const result = await streamText({
    model: openai("gpt-4o-mini"),
    system: systemPrompt,
    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
}
