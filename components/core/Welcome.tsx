import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Welcome() {
  const { data: session } = useSession();
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0 md:h-screen block md:flex md:items-center md:justify-start">
      <svg
        viewBox="0 0 1024 1024"
        className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
        aria-hidden="true"
      >
        <circle
          cx={512}
          cy={512}
          r={512}
          fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
          fillOpacity="0.7"
        />
        <defs>
          <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
            <stop stopColor="#7775D6" />
            <stop offset={1} stopColor="#E935C1" />
          </radialGradient>
        </defs>
      </svg>
      <div className="mx-auto max-w-md text-center lg:flex-auto lg:py-32 lg:text-left">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Welcome to <span className="text-indigo-600">Site Name</span>
          <br />
          Series Bot Site{" "}
          <small className="text-indigo-600">V {process.env.VERSION}</small>
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-300">
          Through <span className="text-indigo-600">Site Name</span>, you can
          add points and chapters to the bot, in addition to actions and display
          more statistics and numbers.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
          <button
            {...(session && {
              onClick: () => signOut(),
            })}
            {...(!session && {
              onClick: () => signIn("discord"),
            })}
            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {session ? "Logout" : "Login with Discord"}
          </button>
          {session?.user?.role !== "USER" &&
            session?.user.role !== undefined &&
            session?.user.role !== "" && (
              <Link
                href="/dashboard"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Dashboard
              </Link>
            )}
          <a
            href="https://docs.maximumdev.xyz"
            className="text-sm font-semibold leading-6 text-white"
          >
            Learn more <span aria-hidden="true">→</span>
          </a>
        </div>
        {session?.user.role === "USER" && (
          <p className="mt-6 text-lg leading-8 text-gray-300">
            You are a <span className="text-red-600">User</span>, you can&apos;t
            see any more pages.
          </p>
        )}
        {session?.user?.role !== "USER" &&
          session?.user.role !== undefined &&
          session?.user.role !== "" && (
            <p className="mt-6 text-lg leading-8 text-gray-300">
              You are a{" "}
              <span className="text-indigo-600">
                {session?.user.role === "ADMIN"
                  ? "Administrator"
                  : session?.user.role === "EDITOR"
                  ? "Editor"
                  : "Publisher"}
              </span>
              , you can see more pages.
            </p>
          )}
      </div>
    </div>
  );
}
