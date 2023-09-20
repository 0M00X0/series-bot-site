"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import ViewPage from "@/components/roles/View";
import Welcome from "@/components/core/Welcome";
export default function Login() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <>
        <div className="bg-blue-900 h-screen w-screen flex items-center text-black justify-center flex-col">
          <div className="text-center w-full">
            <div className="flex justify-center items-center flex-col space-y-4">
              <h1 className="text-white text-3xl font-semibold">
                You are not signed in
              </h1>
              <button
                className="bg-white p-2 px-4 rounded-lg"
                onClick={() => signIn("google")}
              >
                Login with Google
              </button>
              <button
                className="bg-white p-2 px-4 rounded-lg"
                onClick={() => signIn("facebook")}
              >
                Login with facebook
              </button>
              <button
                className="bg-white p-2 px-4 rounded-lg"
                onClick={() => signIn("discord")}
              >
                Login with discord
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }


  const roles = process.env.ROLES_ADMIN;

  return (
    <>
      <ViewPage RolesView={roles}>
        <Welcome />
      </ViewPage>
    </>
  );
} 