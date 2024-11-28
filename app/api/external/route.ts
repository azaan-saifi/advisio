import { createEmbedding } from "@/lib/embeddings";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Pinecone } from "@pinecone-database/pinecone";
import { NextRequest, NextResponse } from "next/server";
import { YoutubeTranscript } from "youtube-transcript";

// Initialize Pinecone Client
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const index = pinecone.Index(process.env.PINECONE_BUSINESS_INDEX!);
    const { ytUrl } = await req.json();

    const response = await YoutubeTranscript.fetchTranscript(ytUrl);
    const transcript = response.map((value) => {
      return value.text;
    });

    const text = transcript.join(" ");

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 3000,
      chunkOverlap: 300,
      separators: ["\n\n", "\n", " ", ""],
    });

    // Split the text into chunks
    const chunks = await splitter.splitText(text);

    const embeddingPromises = chunks.map(async (chunk) => {
      const embedding = await createEmbedding(chunk);
      if (!Array.isArray(embedding) || embedding.length === 0) {
        throw new Error("Invalid embedding generated.");
      }
      return {
        id: crypto.randomUUID(),
        values: embedding,
        metadata: {
          text: chunk,
        },
      };
    });

    const vectors = await Promise.all(embeddingPromises);

    if (vectors.length === 0) {
      throw new Error("No embeddings were created.");
    }

    await index.upsert(vectors);

    return NextResponse.json({ sucess: "ok" });
  } catch (error) {
    return NextResponse.json({ error: "Error while transcribing" });
  }
}
