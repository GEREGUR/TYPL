// pages/api/tests/index.ts

import { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "@/lib/mongodb";
import Block from "@/app/models/Test";
import Test from "@/app/models/Test";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectMongoDB();
    const { title, description, questions, blockId } = req.body;

    // Find the block by ID
    const block = await Block.findById(blockId);
    if (!block) {
      return res.status(404).json({ error: "Block not found" });
    }

    // Create the test
    const test = new Test({ title, description, questions });
    await test.save();

    // Add the test to the block
    block.tests.push(test);
    await block.save();

    return res.status(201).json({ test, message: "Тест был создан!" });
  } catch (error) {
    console.error("Error creating test:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
