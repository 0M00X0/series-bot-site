"use server";

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function createSeries(data: any) {
  try {
    const series = await prisma.series.create({
      data: {
        slug: data.slug,
        title: data.title,
        priceType: data.priceType,
        priceTl: Number(data.priceTl),
        priceEd: Number(data.priceEd),
        pricePr: Number(data.pricePr),
        userId: data.userId,
      },
    });

    return new NextResponse(JSON.stringify(series));
  } catch (error) {
    console.error("Error creating series:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function getSingleSeries(context: { params: any }) {
  const { serieslug } = context.params;
  try {
    if (!serieslug) {
      return new NextResponse("Series slug is required", { status: 400 });
    }

    const setting = await prisma.series.findUnique({
      where: {
        slug: serieslug,
      },
    });

    if (!setting) {
      return new NextResponse("Series not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(setting));
  } catch (error) {
    console.error("Error fetching setting:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
