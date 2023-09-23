import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const seriesId = url.pathname.split("/")[3];
  try {
    const series = await prisma.series.delete({
      where: {
        id: String(seriesId),
      },
    });
    return NextResponse.json({ series });
  } catch (error) {
    return NextResponse.json({ series: "not found" });
  }
}

// تعديل
export async function PUT(request: Request) {
  const body = await request.json();
  const { id } = body;

  try {
    const series = await prisma.series.update({
      where: {
        id: String(id)
      },
      data: {
        slug: body.slug,
        title: body.title,
        priceType: body.priceType,
        priceTl: Number(body.priceTl),
        priceEd: Number(body.priceEd),
        pricePr: Number(body.pricePr),
        userId: body.userId,
      },
    });
    return NextResponse.json({ series });
  } catch (error) {
    return NextResponse.json({ series: "not found" });
  }
}
