// app/actions/items.ts
"use server";

import { prisma } from "@/lib/prisma";
import { CreateLetter } from "@/src/types";
import { revalidatePath } from "next/cache";

export async function saveLetterToDb(data: CreateLetter) {
  try {
    const newLetter = await prisma.letter.create({
      data: {
        title: data.title,
        from: data.from,
        to: data.to,
        text: data.text,
      },
    });

    revalidatePath("/letters"); // Revalidate cache where letters are displayed
    return { success: true, letter: newLetter };
  } catch (error) {
    console.error("Failed to save letter:", error);
    return { success: false, error: "Failed to save letter" };
  }
}
