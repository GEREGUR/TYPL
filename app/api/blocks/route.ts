import { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "@/lib/mongodb";
import Block from "@/app/models/Test";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectMongoDB();
    const blocks = await Block.find();
    return res.status(200).json(blocks);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
