import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

interface Request extends NextRequest {
  params: {
    title: string;
  };
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const search = url.pathname.split("/")[4];
  const page = Number(url.searchParams.get("page") ?? 1);
  const perPage = Number(url.searchParams.get("per_page") ?? 10);
  try {
    const series = await prisma.series.findMany({
      skip: perPage * (page - 1),
      take: perPage,
      where: {
        OR: [
          {
            title: {
              contains: search,
            },
          },
        ],
      },
    });
    const allSeries = await prisma.series.findMany({
      where: {
        OR: [
          {
            title: {
              contains: search,
            },
          },
        ],
      },
    });
    const total = allSeries.length;
    const per_page = perPage;
    const total_series = await prisma.series.count();
    const total_pages = Math.ceil(total / perPage);
    const data = {
      series,
      total,
      total_pages,
      page,
      per_page,
      total_series,
    };
    return new NextResponse(JSON.stringify(data));
  } catch (error) {
    console.error("Error fetching series:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
