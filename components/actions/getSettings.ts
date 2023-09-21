"use server";

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function getSettings(context: { params: any }) {
const settingName = context.params.settingName;
  try {
    if (settingName) {
      const settings = await prisma.settings.findMany({
        where: {
          name: settingName,
        },
      });

      if (!settings) {
        return new NextResponse("Setting not found", { status: 404 });
      }

      return new NextResponse(JSON.stringify(settings));
    } else {
      // Fetch all manga posts
      const settingsList = await prisma.settings.findMany();
      return new NextResponse(JSON.stringify(settingsList));
    }
  } catch (error) {
    console.error("Error fetching setting:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}