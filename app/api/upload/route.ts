import { extractText, getDocumentProxy } from "unpdf";
import { NextResponse, NextRequest } from "next/server";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Pinecone } from "@pinecone-database/pinecone";
import { createEmbedding } from "@/lib/embeddings";
import { updateUser } from "@/lib/actions/user.action";
import { revalidatePath } from "next/cache";

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const index = pinecone.Index(process.env.PINECONE_BUSINESS_INDEX!);
    const formData = await req.formData();
    const clerkId = formData.get("userId") as string;
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json("No file uploaded", { status: 400 });
    }

    const fileBuffer = await file.arrayBuffer();
    const fileData = new Uint8Array(fileBuffer);

    const pdf = await getDocumentProxy(fileData);
    const { text } = await extractText(pdf, { mergePages: true });

    if (!text.trim()) {
      throw new Error("PDF text is empty.");
    }

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 4000,
      chunkOverlap: 400,
      separators: ["\n\n", "\n", " ", ""],
    });

    const chunks = await splitter.splitText(text);

    if (chunks.length === 0) {
      throw new Error("No chunks generated from the text.");
    }

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

    await updateUser({
      clerkId,
      updateData: {
        isUploaded: true,
      },
    });

    revalidatePath("/");

    return NextResponse.json({ success: "ok" });
  } catch (error) {
    console.error("Error processing PDF:", error);
    return NextResponse.json("Failed to process PDF", { status: 500 });
  }
}
