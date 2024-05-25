import { PrismaClient } from "@prisma/client";
import { User } from "@/types/types";

const prisma = new PrismaClient();

export async function getUser(userId: number): Promise<User | null> {
  return await prisma.user.findUnique({
    where: { id: userId },
  });
}
