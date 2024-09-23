"use server";

import { PrismaClient } from "@prisma/client";
import { verifySession } from "./dal";

const prisma = new PrismaClient();

export async function getUser() {
  const session = await verifySession();
  if (!session) return null;

  const name: Array<{ name: string }> =
    await prisma.$queryRaw`SELECT name FROM users WHERE email LIKE ${session?.userEmail}`;

  return name[0]?.name;
}
