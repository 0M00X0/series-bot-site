import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const messageid = String(url.searchParams.get("messageid") ?? 1);

  try {
    const GetSeries = await prisma.getSeries.findUnique({
      where: {
        messageId: messageid,
      },
    });
    return NextResponse.json(GetSeries);
  } catch (error) { 
    console.error("error", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const GetSeries = await prisma.getSeries.create({
      data: {
        messageId: body.messageId,
        per_page: body.per_page,
        page: body.page,
        search: body.search,
      },
    });
    return NextResponse.json(GetSeries);
  } catch (error) {
    console.error("error", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PUT(request: Request) {
  const body = await request.json();
  const url = new URL(request.url);
  const id = String(url.searchParams.get("id") ?? 1);

  try {
    const GetSeries = await prisma.getSeries.update({
      where: {
        id: id,
      },
      data: {
        page: body.page,
      },
    });
    return NextResponse.json(GetSeries);
  } catch (error) {
    console.error("error", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = Number(url.searchParams.get("id") ?? 1);

  try {
    const GetSeries = await prisma.getSeries.delete({
      where: {
        id: String(id),
      },
    });
    return NextResponse.json(GetSeries);
  } catch (error) {
    console.error("error", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
