"use client";
import ViewPage from "@/components/roles/View";
import Layout from "@/components/layouts/Layout";
import AddSeriesForm from "@/components/dashboard/series/AddSeriesForm";
export default function AddSeries() {
  const RolesView = process.env.ROLES_EDITOR;
  return (
    <>
      <ViewPage RolesView={RolesView}>
        <Layout classSidebar="grid">
          <AddSeriesForm />
        </Layout>
      </ViewPage>
    </>
  );
}
