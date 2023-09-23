"use server";

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function createSetting(data: any) {
  try {
    const setting = await prisma.settings.create({
      data: {
        slug: data.slug,
        value: data.value,
      },
    });

    return new NextResponse(JSON.stringify(setting));
  } catch (error) {
    console.error("Error creating setting:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function getSingleSetting(context: { params: any }) {
  const { settingslug } = context.params;
  try {
    if (!settingslug) {
      return new NextResponse("Setting slug is required", { status: 400 });
    }

    const setting = await prisma.settings.findUnique({
      where: {
        slug: settingslug,
      },
    });

    if (!setting) {
      return new NextResponse("Setting not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(setting));
  } catch (error) {
    console.error("Error fetching setting:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function getAllSettings() {
  try {
    const settingsList = await prisma.settings.findMany();
    return new NextResponse(JSON.stringify(settingsList));
  } catch (error) {
    console.error("Error fetching settings:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function deleteSetting(context: { params: any }) {
  const { settingslug } = context.params;
  try {
    if (!settingslug) {
      return new NextResponse("Setting slug is required", { status: 400 });
    }

    const setting = await prisma.settings.delete({
      where: {
        slug: settingslug,
        canDeleted: true,
      },
    });

    return new NextResponse(JSON.stringify(setting));
  } catch (error) {
    console.error("Error deleting setting:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
