import { NextRequest, NextResponse } from "next/server";
import { prisma } from "db";
export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.pathname.split("/")[5];
  try {
  const account = await prisma.account.findMany({
    where: {
      userId: userId,
    },
  });
  const { providerAccountId } = account[0];

  return NextResponse.json({ providerAccountId });
  } catch (error) {
    return NextResponse.json({ providerAccountId: "not found" });
  }

}
