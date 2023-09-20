"use client";
import { useSession, signIn } from "next-auth/react";
import axios from "axios";
import Link from "next/link";
import Loading from "@/components/Loading";

export default function Login() {
  const { data: session } = useSession();
  return (
    <>
    <Loading />
    </>
  );

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
  return (
    <>
      <h1>
        Hello {session?.user?.name ?? session?.user?.email}! You can now access our
        <br />
        ypur role is {session?.user?.role}
        <br />
        <Link href="/about" legacyBehavior>
          <a>about</a>
        </Link>
      </h1>
    </>
  );
}