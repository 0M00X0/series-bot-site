"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import ViewPage from "@/components/roles/View";
import Welcome from "@/components/core/Welcome";
export default function Home() {
  const { data: session } = useSession();

  if (!session || session.user.role === "USER") {
    return (
      <>
        <Welcome />
      </>
    );
  }

  const roles = process.env.ROLES_PUBLISHER;

  return (
    <>
      <ViewPage RolesView={roles}>
        <Welcome />
      </ViewPage>
    </>
  );
}
