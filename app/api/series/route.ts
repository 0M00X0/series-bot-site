import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

interface Request extends NextRequest {
  params: {
    title: string;
  };
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") ?? 1);
  const perPage = Number(url.searchParams.get("per_page") ?? 10);
  const search = String(url.searchParams.get("search") ?? "");
  try {
    if (search) {
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
      const allseries = await prisma.series.findMany({
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
      const total = allseries.length;
      const per_page = perPage;
      const total_series = await prisma.series.count();
      const total_pages = Math.ceil(total / perPage);
      let next_page_url = null;
      if (page < total_pages) {
        const next_page = page + 1;
        next_page_url = `/api/series?page=${next_page}&per_page=${perPage}`;
      }
      let prev_page_url = null;
      if (page > 1) {
        const prev_page = page - 1;
        prev_page_url = `/api/series?page=${prev_page}&per_page=${perPage}`;
      }
      const first_series = perPage * (page - 1) + 1;
      let last_series = perPage * page;
      if (last_series > total) {
        last_series = total;
      }
      let links = [];
      for (let i = 1; i <= total_pages; i++) {
        const link = `/api/series?page=${i}&per_page=${perPage}`;
        links.push(link);
      }
      const all_series = total;

      const data = {
        series,
        total,
        total_pages,
        page,
        per_page,
        total_series,
        links,
        all_series,
        prev_page_url,
        next_page_url,
        first_series,
        last_series,
      };
      return new NextResponse(JSON.stringify(data));
    } else {
      const series = await prisma.series.findMany({
        skip: perPage * (page - 1),
        take: perPage,
      });
      const total_series = series.length;
      const per_page = perPage;
      const all_series = await prisma.series.count();
      const total_pages = Math.ceil(all_series / perPage);
      let next_page_url = null;
      if (page < total_pages) {
        const next_page = page + 1;
         next_page_url = `/api/series?page=${next_page}&per_page=${perPage}`;
      }
      let prev_page_url = null;
      if (page > 1) {
        const prev_page = page - 1;
         prev_page_url = `/api/series?page=${prev_page}&per_page=${perPage}`;
      }
      let links = [];
      for (let i = 1; i <= total_pages; i++) {
        const link = `/api/series?page=${i}&per_page=${perPage}`;
        links.push(link);
      }
      const first_series = perPage * (page - 1) + 1;

      let last_series = perPage * page;
      if (last_series > all_series) {
        last_series = all_series;
      }
      const data = {
        series,
        total_series,
        total_pages,
        page,
        per_page,
        all_series,
        links,
        prev_page_url,
        next_page_url,
        first_series,
        last_series,
      };
      return new NextResponse(JSON.stringify(data));
    }
  } catch (error) {
    console.error("Error fetching series:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
