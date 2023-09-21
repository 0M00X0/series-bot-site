"use client";
import ViewPage from "@/components/roles/View";
import Layout from "@/components/layouts/Layout";
export default function Dashboard() {
  const RolesView = process.env.ROLES_PUBLISHER;
  return (
    <>
      <ViewPage RolesView={RolesView}>
        <Layout>
          <h1>Dashboard</h1>
        </Layout>
      </ViewPage>
    </>
  );
}
