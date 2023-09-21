"use client";
import ViewPage from "@/components/roles/View";
import Layout from "@/components/layouts/Layout";
export default function Settings() {
  const RolesView = process.env.ROLES_ADMIN;
  return (
    <>
      <ViewPage RolesView={RolesView}>
        <Layout>
          <h1>Settings</h1>
        </Layout>
      </ViewPage>
    </>
  );
}
