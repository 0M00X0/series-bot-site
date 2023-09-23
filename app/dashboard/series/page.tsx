"use client";
import ViewPage from "@/components/roles/View";
import TableLayout from "@/components/layouts/TableLayout";
import TableSeries from "@/components/dashboard/series/TableSeries";

export default function SeriesPage() {
  const RolesView = process.env.ROLES_PUBLISHER;

  return (
    <>
      <ViewPage RolesView={RolesView}>
        <TableLayout classSidebar="">
          <TableSeries />
        </TableLayout>
      </ViewPage>
    </>
  );
}
