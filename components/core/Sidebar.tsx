"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import React, { ReactNode } from "react";
import Footer from "@/components/core/Footer";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "@/lib/i18n";

interface MenuState {
  seires: boolean;
  chapters: boolean;
  users: boolean;
  analytics: boolean;
  settings: boolean;
}

export default function Sidebar({
  children,
  classGrid,
}: {
  children: ReactNode;
  classGrid?: string;
}) {
  const { t } = useTranslation();
  const { data: session } = useSession();
  const [closeMeassageId, setCloseMeassageId] = useState(false);

  const inactiveLink = "hidden";
  const [openProfile, setOpenProfile] = useState(false);
  const [closeMeassage, setCloseMeassage] = useState(false);
  const [openSidebar, setOpenSidebar] = useState({
    phone: false,
    desktop: true,
  });

  const [showMenu, setShowMenu] = useState({
    seires: false,
    chapters: false,
    users: false,
    analytics: false,
    settings: false,
  });

  const [openDropdownLanguage, setOpenDropdownLanguage] = useState(false);
  const [userLanguage, setUserLanguage] = useState("en");

  useEffect(() => {
    setUserLanguage(localStorage.getItem("language") || "en");
    if (!localStorage.getItem("language")) {
      localStorage.setItem("language", "en");
    }
  }, []);

  function toggleDropdownLanguage() {
    setOpenDropdownLanguage((prevState) => !prevState);
  }

  function toggleMenu(menu: keyof MenuState) {
    setShowMenu((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  }

  function toggleSidebar(sidebar: keyof typeof openSidebar) {
    setOpenSidebar((prevState) => ({
      ...prevState,
      [sidebar]: !prevState[sidebar],
    }));
    setShowMenu((prevState) => ({
      ...prevState,
      settings: false,
    }));
    if (sidebar === "phone") {
      setOpenSidebar((prevState) => ({
        ...prevState,
        desktop: true,
      }));
    }
    if (closeMeassage === true) {
      setCloseMeassage(false);
    } else if (closeMeassageId === true) {
      setCloseMeassage(false);
    } else {
      setCloseMeassage(true);
    }
  }

  function toggleProfile() {
    setOpenProfile((prevState) => !prevState);
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 480px)");
    function handleTabletChange(e: any) {
      if (e.matches) {
        setOpenSidebar((prevState) => ({
          ...prevState,
          phone: false,
          desktop: true,
        }));
      } else {
        setOpenSidebar((prevState) => ({
          ...prevState,
          phone: false,
          desktop: true,
        }));
      }
    }
    mediaQuery.addListener(handleTabletChange);
    handleTabletChange(mediaQuery);
    return () => mediaQuery.removeListener(handleTabletChange);
  }, []);

  function deletecloseMeassageFunc() {
    setCloseMeassageId(true);
  }

  const handleLanguageChange = (lng: string) => {
    changeLanguage(lng);
    setUserLanguage(lng);
  };

  const [langMsg, setLangMsg] = useState("false");
  useEffect(() => {
    const dropdown = document.getElementById("language-dropdown");
    dropdown?.addEventListener("mouseover", () => {
      setLangMsg("true");
    });

    dropdown?.addEventListener("mouseout", () => {
      setLangMsg("false");
    });
  }, []);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                id="sidebar-toggle-button-phone"
                onClick={() => toggleSidebar("phone")}
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <Link href="/dashboard" className="flex ml-2 md:mr-24">
                <Image
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="h-8 mr-3"
                  alt="FlowBite Logo"
                  width={32}
                  height={32}
                />
                <span className="self-center text-xl font-semibold md:text-2xl whitespace-nowrap dark:text-white">
                  {t("site_title")}
                </span>
              </Link>
              <button
                onClick={() => toggleSidebar("desktop")}
                type="button"
                className="md:inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
              </button>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ml-3">
                <div>
                  <button
                    onClick={toggleProfile}
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                    <Image
                      className="w-8 h-8 rounded-full"
                      src={session?.user?.image || "/images/user.png"}
                      alt="user photo"
                      width={32}
                      height={32}
                    />
                  </button>
                </div>

                <div
                  aria-labelledby="headlessui-menu-button-1"
                  id="headlessui-menu-items-2"
                  role="menu"
                  className={`absolute top-16 right-0 mt-2 origin-top-right ring-1 ring-black ring-opacity-5 focus:outline-none  text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 block ${
                    openProfile ? "" : "hidden"
                  }`}
                >
                  <div className="px-1 py-1" role="none">
                    <div className="px-4 py-3" role="none">
                      <p
                        className="text-sm text-gray-900 dark:text-white"
                        role="none"
                      >
                        {session?.user?.name}
                      </p>
                      <p
                        className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                        role="none"
                      >
                        {session?.user?.email}
                      </p>
                    </div>
                    <ul className="py-1" role="none">
                      <li>
                        <Link
                          href="/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/dashboard/user/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/dashboard/user/balance"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          My Banlance
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => signOut()}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Sign out
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 h-screen pt-20 transition-transform bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700 ${
          openSidebar.phone ? "translate-none" : "-translate-x-full"
        } ${openSidebar.desktop ? "w-64" : "w-16"}`}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/dashboard"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path>
                </svg>
                <span className={`ml-3 ${openSidebar.desktop ? "" : "hidden"}`}>
                  Dashboard
                </span>
              </Link>
            </li>

            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
                onClick={() => toggleMenu("chapters")}
                aria-expanded={showMenu.chapters}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H6a2 2 0 0 0-2 2h14v12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Z"></path>
                  <path d="M14 4H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM2 16v-6h12v6H2Z"></path>
                </svg>
                <span
                  className={`flex-1 ml-3 text-left whitespace-nowrap ${
                    openSidebar.desktop ? "" : "hidden"
                  }`}
                >
                  Chapters
                </span>
                <svg
                  className={`w-3 h-3 ${openSidebar.desktop ? "" : "hidden"}`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  ></path>
                </svg>
              </button>
              <ul
                id="dropdown-example"
                className={`py-2 space-y-2 ${
                  showMenu.chapters ? "" : inactiveLink
                }`}
              >
                <li>
                  <Link
                    href="/dashboard/chapters"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    All Chapter
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/chapters/add"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Add Chapter
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
                onClick={() => toggleMenu("seires")}
                aria-expanded={showMenu.seires}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 17 20"
                >
                  <path d="M7.958 19.393a7.7 7.7 0 0 1-6.715-3.439c-2.868-4.832 0-9.376.944-10.654l.091-.122a3.286 3.286 0 0 0 .765-3.288A1 1 0 0 1 4.6.8c.133.1.313.212.525.347A10.451 10.451 0 0 1 10.6 9.3c.5-1.06.772-2.213.8-3.385a1 1 0 0 1 1.592-.758c1.636 1.205 4.638 6.081 2.019 10.441a8.177 8.177 0 0 1-7.053 3.795Z" />
                </svg>
                <span
                  className={`flex-1 ml-3 text-left whitespace-nowrap ${
                    openSidebar.desktop ? "" : "hidden"
                  }`}
                >
                  Series
                </span>
                <svg
                  className={`w-3 h-3 ${openSidebar.desktop ? "" : "hidden"}`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  ></path>
                </svg>
              </button>
              <ul
                id="dropdown-example"
                className={`py-2 space-y-2 ${
                  showMenu.seires ? "" : inactiveLink
                }`}
              >
                <li>
                  <Link
                    href="/dashboard/series"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    All Series
                  </Link>
                </li>
                {session?.user?.role !== "PUBLISHER" && (
                  <li>
                    <Link
                      href="/dashboard/series/add"
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Add Series
                    </Link>
                  </li>
                )}
              </ul>
            </li>

            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
                onClick={() => toggleMenu("users")}
                aria-expanded={showMenu.users}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span
                  className={`flex-1 ml-3 text-left whitespace-nowrap ${
                    openSidebar.desktop ? "" : "hidden"
                  }`}
                >
                  Users
                </span>
                <svg
                  className={`w-3 h-3 ${openSidebar.desktop ? "" : "hidden"}`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  ></path>
                </svg>
              </button>
              <ul
                id="dropdown-example"
                className={`py-2 space-y-2 ${
                  showMenu.users ? "" : inactiveLink
                }`}
              >
                {session?.user?.role !== "PUBLISHER" && (
                  <li>
                    <Link
                      href="/dashboard/users"
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      All Users
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    href="/dashboard/users/profile"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Profile
                  </Link>
                </li>

                <li>
                  <Link
                    href="/dashboard/users/banlance"
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    My Banlance
                  </Link>
                </li>
              </ul>
            </li>

            {session?.user?.role !== "PUBLISHER" &&
              session?.user?.role !== "EDITOR" && (
                <>
                  <li>
                    <Link
                      href="/dashboard/analytics"
                      className="flex items-start p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full"
                    >
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 21"
                      >
                        <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                        <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                      </svg>
                      <span
                        className={`ml-3 whitespace-nowrap ${
                          openSidebar.desktop ? "" : "hidden"
                        }`}
                      >
                        Analytics
                      </span>
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      aria-controls="dropdown-example"
                      data-collapse-toggle="dropdown-example"
                      onClick={() => toggleMenu("settings")}
                      aria-expanded={showMenu.settings}
                    >
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7.75 4H19M7.75 4a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 4h2.25m13.5 6H19m-2.25 0a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 10h11.25m-4.5 6H19M7.75 16a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 16h2.25"
                        ></path>
                      </svg>
                      <span
                        className={`flex-1 ml-3 text-left whitespace-nowrap ${
                          openSidebar.desktop ? "" : "hidden"
                        }`}
                      >
                        Settings
                      </span>
                      <svg
                        className={`w-3 h-3 ${
                          openSidebar.desktop ? "" : "hidden"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 4 4 4-4"
                        ></path>
                      </svg>
                    </button>
                    <ul
                      id="dropdown-example"
                      className={`py-2 space-y-2 ${
                        showMenu.settings ? "" : inactiveLink
                      }`}
                    >
                      <li>
                        <Link
                          href="/dashboard/settings"
                          className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                        >
                          All Settings
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/dashboard/settings/add"
                          className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                        >
                          Add Settings
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            <li>
              <button
                onClick={() => signOut()}
                className="flex items-start p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                  />
                </svg>
                <span
                  className={`ml-3 whitespace-nowrap ${
                    openSidebar.desktop ? "" : "hidden"
                  }`}
                >
                  Sign out
                </span>
              </button>
            </li>
          </ul>
          <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
            <li>
              <Link
                href="https://docs.maximumdev.xyz"
                className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 20"
                >
                  <path d="M16 14V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 0 0 0-2h-1v-2a2 2 0 0 0 2-2ZM4 2h2v12H4V2Zm8 16H3a1 1 0 0 1 0-2h9v2Z" />
                </svg>
                <span className={`ml-3 ${openSidebar.desktop ? "" : "hidden"}`}>
                  Documentationt
                </span>
              </Link>
            </li>

            <li>
              <Link
                href="https://discord.gg/r2dQhvgxrg"
                className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 21 21"
                >
                  <path d="m5.4 2.736 3.429 3.429A5.046 5.046 0 0 1 10.134 6c.356.01.71.06 1.056.147l3.41-3.412c.136-.133.287-.248.45-.344A9.889 9.889 0 0 0 10.269 1c-1.87-.041-3.713.44-5.322 1.392a2.3 2.3 0 0 1 .454.344Zm11.45 1.54-.126-.127a.5.5 0 0 0-.706 0l-2.932 2.932c.029.023.049.054.078.077.236.194.454.41.65.645.034.038.078.067.11.107l2.927-2.927a.5.5 0 0 0 0-.707Zm-2.931 9.81c-.024.03-.057.052-.081.082a4.963 4.963 0 0 1-.633.639c-.041.036-.072.083-.115.117l2.927 2.927a.5.5 0 0 0 .707 0l.127-.127a.5.5 0 0 0 0-.707l-2.932-2.931Zm-1.442-4.763a3.036 3.036 0 0 0-1.383-1.1l-.012-.007a2.955 2.955 0 0 0-1-.213H10a2.964 2.964 0 0 0-2.122.893c-.285.29-.509.634-.657 1.013l-.01.016a2.96 2.96 0 0 0-.21 1 2.99 2.99 0 0 0 .489 1.716c.009.014.022.026.032.04a3.04 3.04 0 0 0 1.384 1.1l.012.007c.318.129.657.2 1 .213.392.015.784-.05 1.15-.192.012-.005.02-.013.033-.018a3.011 3.011 0 0 0 1.676-1.7v-.007a2.89 2.89 0 0 0 0-2.207 2.868 2.868 0 0 0-.27-.515c-.007-.012-.02-.025-.03-.039Zm6.137-3.373a2.53 2.53 0 0 1-.35.447L14.84 9.823c.112.428.166.869.16 1.311-.01.356-.06.709-.147 1.054l3.413 3.412c.132.134.249.283.347.444A9.88 9.88 0 0 0 20 11.269a9.912 9.912 0 0 0-1.386-5.319ZM14.6 19.264l-3.421-3.421c-.385.1-.781.152-1.18.157h-.134c-.356-.01-.71-.06-1.056-.147l-3.41 3.412a2.503 2.503 0 0 1-.443.347A9.884 9.884 0 0 0 9.732 21H10a9.9 9.9 0 0 0 5.044-1.388 2.519 2.519 0 0 1-.444-.348ZM1.735 15.6l3.426-3.426a4.608 4.608 0 0 1-.013-2.367L1.735 6.4a2.507 2.507 0 0 1-.35-.447 9.889 9.889 0 0 0 0 10.1c.1-.164.217-.316.35-.453Zm5.101-.758a4.957 4.957 0 0 1-.651-.645c-.033-.038-.077-.067-.11-.107L3.15 17.017a.5.5 0 0 0 0 .707l.127.127a.5.5 0 0 0 .706 0l2.932-2.933c-.03-.018-.05-.053-.078-.076ZM6.08 7.914c.03-.037.07-.063.1-.1.183-.22.384-.423.6-.609.047-.04.082-.092.129-.13L3.983 4.149a.5.5 0 0 0-.707 0l-.127.127a.5.5 0 0 0 0 .707L6.08 7.914Z" />
                </svg>
                <span className={`ml-3 ${openSidebar.desktop ? "" : "hidden"}`}>
                  Help
                </span>
              </Link>
            </li>
          </ul>
          {closeMeassage === false && closeMeassageId === false ? (
            <div
              id="dropdown-cta"
              className="p-4 mt-6 rounded-lg bg-blue-50 dark:bg-blue-900"
              role="alert"
            >
              <div className="flex items-center mb-3">
                <span className="bg-orange-100 text-orange-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">
                  Beta
                </span>
                <button
                  onClick={deletecloseMeassageFunc}
                  type="button"
                  className="ml-auto -mx-1.5 -my-1.5 bg-blue-50 inline-flex justify-center items-center w-6 h-6 text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800"
                  data-dismiss-target="#dropdown-cta"
                  aria-label="Close"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="w-2.5 h-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>
              <p className="mb-3 text-sm text-blue-800 dark:text-blue-400">
                This site is still a beta version under development
              </p>
            </div>
          ) : null}
        </div>

        <div className="flex absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex bg-white dark:bg-gray-800 z-20 border-r border-gray-200 dark:border-gray-700">
          <button
            onClick={() => toggleDropdownLanguage()}
            type="button"
            id="language-dropdown"
            data-dropdown-toggle="language-dropdown"
            className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:hover:text-white dark:text-gray-400 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            {userLanguage === "en" && (
              <svg
                aria-hidden="true"
                className="h-5 w-5 rounded-full mt-0.5"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 3900 3900"
              >
                <path fill="#b22234" d="M0 0h7410v3900H0z" />
                <path
                  d="M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0"
                  stroke="#fff"
                  strokeWidth="300"
                />
                <path fill="#3c3b6e" d="M0 0h2964v2100H0z" />
                <g fill="#fff">
                  <g id="d">
                    <g id="c">
                      <g id="e">
                        <g id="b">
                          <path
                            id="a"
                            d="M247 90l70.534 217.082-184.66-134.164h228.253L176.466 307.082z"
                          />
                          <use xlinkHref="#a" y="420" />
                          <use xlinkHref="#a" y="840" />
                          <use xlinkHref="#a" y="1260" />
                        </g>
                        <use xlinkHref="#a" y="1680" />
                      </g>
                      <use xlinkHref="#b" x="247" y="210" />
                    </g>
                    <use xlinkHref="#c" x="494" />
                  </g>
                  <use xlinkHref="#d" x="988" />
                  <use xlinkHref="#c" x="1976" />
                  <use xlinkHref="#e" x="2470" />
                </g>
              </svg>
            )}
            {userLanguage === "ar" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="20px"
                height="20px"
                viewBox="0 0 64 64"
                aria-hidden="true"
                className="h-5 w-5 rounded-full mt-0.5"
                role="img"
                preserveAspectRatio="xMidYMid meet"
              >
                <path
                  d="M32 2C18.9 2 7.8 10.4 3.7 22h56.6C56.2 10.4 45.1 2 32 2z"
                  fill="#ed4c5c"
                />
                <path
                  d="M32 62c13.1 0 24.2-8.3 28.3-20H3.7C7.8 53.7 18.9 62 32 62z"
                  fill="#3e4347"
                />
                <path
                  d="M3.7 22C2.6 25.1 2 28.5 2 32s.6 6.9 1.7 10h56.6c1.1-3.1 1.7-6.5 1.7-10s-.6-6.9-1.7-10H3.7z"
                  fill="#f9f9f9"
                />
                <g fill="#ffffff">
                  <path d="M30.6 25.1c.3-.2.5 0 .7.2c.1.2.1.8-.1 1.5c-.1.4-.4.8-.6 1.1c.4 0 .9-.1 1.4-.3c.5.2.9.3 1.4.3c-.2-.4-.4-1.2-.3-1.8c0-.9-.1-1.2-.3-1.4c-.2-.2-.7-.3-1-.3c-.2 0-.2.1-.2.1c-.4-.1-.7-.1-.9 0c-.2.2-.2.7-.1.6" />
                  <path d="M37.3 28.1c-.2-1.1-1.3-.8-2.2-.3c-.4.2-.8.4-1.2.4h-.3c-.5 0-1.1-.1-1.6-.3c-.5.2-1.1.3-1.6.3h-.2c-.5 0-.9-.2-1.3-.5c-.8-.4-1.9-.7-2.2.3c.2-.1.4-.3.5-.3l-.4 9.6l.2-.2l.4-9.3c.1.1.5.5.6.5l-.3 8.1l.3-.3l.3-7.7c.1.1.4.3.5.4l-.3 6.7l.8-.7l.8-2.7c-.7-1.5-.6-2.8-.6-2.8h.2c.5 0 1.6-.3 2.1-.6c.1 0 .1-.1.2-.1c0 .1.1.1.2.2c.5.3 1.6.6 2.1.6h.2s.1 1.3-.6 2.8l.7 2.6l.8.7l-.3-6.6c.1-.1.3-.3.5-.4l.3 7.5l.3.3l-.3-8c.1-.1.5-.4.6-.5l.4 9.2l.2.2l-.4-9.5c.1.1.4.3.6.4" />
                  <path d="M31.1 29.7v3.9s0 .1.1.1c.1.2.3.3.4.5l.3.3l.3-.3l.5-.5v-3.8c-.3-.1-.6-.2-.8-.4c-.1-.1-.4 0-.8.2" />
                </g>
                <path
                  d="M36.3 37.9c0-.5-.5-.5-.9-.4c-.1 0-.1 0-.2.1l-.6-2.2l3.3 3.2l-.4-10.4c-.1-1.6-1.4-1.2-2.3-.6c-.5.3-.9.5-1.4.5c-.7-1.2-.3-2.8-.8-3.2c-.2-.2-.9-.5-1.4-.5c-.3 0-.2.2-.2.2c-.5-.1-.9-.1-1.1.1c-.2.1 0 1.1.1.9c.3-.3.4-.2.6.1c.2.3-.2 1.5-.7 2.4c-.6 0-1.1-.2-1.6-.5c-1-.6-2.3-.9-2.3.6L26 38.5l3.3-3.1l-.6 2.1c-.1 0-.1 0-.2-.1c-.4-.1-.9-.1-.9.4c-.6-.1-.8.8-.2 1c0 .3 0 .5.4.5c.9.3 2.5.4 4.1.4s3.2-.1 4.1-.4c.4-.1.4-.3.4-.5c.8-.2.5-1.1-.1-.9m-5.1-4.3c0-.1 0-.1 0 0l-.1-.1v-3.8c.4-.1.7-.2.9-.4c.2.2.5.3.8.4v3.8c-.2.2-.3.4-.5.5l-.3.3l-.3-.3c-.2-.1-.3-.3-.5-.4m0-6.7c.2-.7.2-1.3.1-1.5c-.2-.2-.4-.4-.7-.2c-.1.1-.1-.4.1-.5c.2-.1.5-.1.9 0c0 0 0-.2.2-.1c.3 0 .9.2 1 .3c.1.1.3.5.3 1.4c0 .6.1 1.4.3 1.8c-.4 0-.9-.1-1.4-.3c-.5.2-.9.3-1.4.3c.2-.4.5-.8.6-1.2m-2.6 8.9l.3-6.7c-.1-.1-.3-.3-.5-.4l-.4 7.6l-.3.3l.3-8.1c-.1-.1-.5-.4-.6-.5l-.4 9.3l-.2.2l.4-9.6c-.1 0-.4.1-.5.3c.3-1 1.4-.7 2.2-.2c.4.3.9.4 1.3.5h.2c.5 0 1-.1 1.6-.3c.6.2 1.1.3 1.6.3h.3c.4-.1.8-.2 1.2-.4c.9-.5 2-.8 2.2.3c-.2-.1-.5-.3-.6-.3l.4 9.5l-.2-.2l-.4-9.4c-.1.1-.5.5-.6.5l.3 8l-.3-.3l-.3-7.5c-.1.1-.4.3-.5.4l.3 6.6l-.8-.7l-.7-2.6c.7-1.5.6-2.8.6-2.8h-.2c-.5 0-1.6-.2-2.1-.6c-.1 0-.1-.1-.2-.2c0 0-.1.1-.2.1c-.5.3-1.6.6-2.1.6h-.2s-.1 1.3.6 2.8l-.8 2.7l-.7.8m3.4 2h-1.1l.7-3.4c.1.1.2.2.4.3c.1-.1.3-.2.4-.3l.8 3.4H32"
                  fill="#c09300"
                />
              </svg>
            )}
          </button>

          <div
            className={`z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 ${
              openDropdownLanguage ? "fixed bottom-[40px]" : "hidden"
            }`}
            id="language-dropdown"
          >
            <ul role="none" className="py-1 flex flex-col items-start">
              <li className="w-full">
                <button
                  onClick={() => handleLanguageChange("en")}
                  className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:text-white dark:text-gray-300 dark:hover:bg-gray-600 w-full"
                  role="menuitem"
                >
                  <div className="inline-flex items-center">
                    <svg
                      aria-hidden="true"
                      className="h-3.5 w-3.5 rounded-full mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      id="flag-icon-css-us"
                      viewBox="0 0 512 512"
                    >
                      <g fillRule="evenodd">
                        <g strokeWidth="1pt">
                          <path
                            fill="#bd3d44"
                            d="M0 0h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z"
                            transform="scale(3.9385)"
                          />
                          <path
                            fill="#fff"
                            d="M0 10h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z"
                            transform="scale(3.9385)"
                          />
                        </g>
                        <path
                          fill="#192f5d"
                          d="M0 0h98.8v70H0z"
                          transform="scale(3.9385)"
                        />
                        <path
                          fill="#fff"
                          d="M8.2 3l1 2.8H12L9.7 7.5l.9 2.7-2.4-1.7L6 10.2l.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7L74 8.5l-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 7.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 24.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 21.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 38.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 35.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 52.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 49.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 66.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 63.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9z"
                          transform="scale(3.9385)"
                        />
                      </g>
                    </svg>
                    English (US)
                  </div>
                </button>
              </li>
              <li className="w-full">
                <button
                  onClick={() => handleLanguageChange("ar")}
                  className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-600 w-full"
                  role="menuitem"
                >
                  <div className="inline-flex items-cente">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="14px"
                      height="14px"
                      viewBox="0 0 64 64"
                      aria-hidden="true"
                      className="h-3.5 w-3.5 rounded-full mr-2"
                      role="img"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <path
                        d="M32 2C18.9 2 7.8 10.4 3.7 22h56.6C56.2 10.4 45.1 2 32 2z"
                        fill="#ed4c5c"
                      />
                      <path
                        d="M32 62c13.1 0 24.2-8.3 28.3-20H3.7C7.8 53.7 18.9 62 32 62z"
                        fill="#3e4347"
                      />
                      <path
                        d="M3.7 22C2.6 25.1 2 28.5 2 32s.6 6.9 1.7 10h56.6c1.1-3.1 1.7-6.5 1.7-10s-.6-6.9-1.7-10H3.7z"
                        fill="#f9f9f9"
                      />
                      <g fill="#ffffff">
                        <path d="M30.6 25.1c.3-.2.5 0 .7.2c.1.2.1.8-.1 1.5c-.1.4-.4.8-.6 1.1c.4 0 .9-.1 1.4-.3c.5.2.9.3 1.4.3c-.2-.4-.4-1.2-.3-1.8c0-.9-.1-1.2-.3-1.4c-.2-.2-.7-.3-1-.3c-.2 0-.2.1-.2.1c-.4-.1-.7-.1-.9 0c-.2.2-.2.7-.1.6" />
                        <path d="M37.3 28.1c-.2-1.1-1.3-.8-2.2-.3c-.4.2-.8.4-1.2.4h-.3c-.5 0-1.1-.1-1.6-.3c-.5.2-1.1.3-1.6.3h-.2c-.5 0-.9-.2-1.3-.5c-.8-.4-1.9-.7-2.2.3c.2-.1.4-.3.5-.3l-.4 9.6l.2-.2l.4-9.3c.1.1.5.5.6.5l-.3 8.1l.3-.3l.3-7.7c.1.1.4.3.5.4l-.3 6.7l.8-.7l.8-2.7c-.7-1.5-.6-2.8-.6-2.8h.2c.5 0 1.6-.3 2.1-.6c.1 0 .1-.1.2-.1c0 .1.1.1.2.2c.5.3 1.6.6 2.1.6h.2s.1 1.3-.6 2.8l.7 2.6l.8.7l-.3-6.6c.1-.1.3-.3.5-.4l.3 7.5l.3.3l-.3-8c.1-.1.5-.4.6-.5l.4 9.2l.2.2l-.4-9.5c.1.1.4.3.6.4" />
                        <path d="M31.1 29.7v3.9s0 .1.1.1c.1.2.3.3.4.5l.3.3l.3-.3l.5-.5v-3.8c-.3-.1-.6-.2-.8-.4c-.1-.1-.4 0-.8.2" />
                      </g>
                      <path
                        d="M36.3 37.9c0-.5-.5-.5-.9-.4c-.1 0-.1 0-.2.1l-.6-2.2l3.3 3.2l-.4-10.4c-.1-1.6-1.4-1.2-2.3-.6c-.5.3-.9.5-1.4.5c-.7-1.2-.3-2.8-.8-3.2c-.2-.2-.9-.5-1.4-.5c-.3 0-.2.2-.2.2c-.5-.1-.9-.1-1.1.1c-.2.1 0 1.1.1.9c.3-.3.4-.2.6.1c.2.3-.2 1.5-.7 2.4c-.6 0-1.1-.2-1.6-.5c-1-.6-2.3-.9-2.3.6L26 38.5l3.3-3.1l-.6 2.1c-.1 0-.1 0-.2-.1c-.4-.1-.9-.1-.9.4c-.6-.1-.8.8-.2 1c0 .3 0 .5.4.5c.9.3 2.5.4 4.1.4s3.2-.1 4.1-.4c.4-.1.4-.3.4-.5c.8-.2.5-1.1-.1-.9m-5.1-4.3c0-.1 0-.1 0 0l-.1-.1v-3.8c.4-.1.7-.2.9-.4c.2.2.5.3.8.4v3.8c-.2.2-.3.4-.5.5l-.3.3l-.3-.3c-.2-.1-.3-.3-.5-.4m0-6.7c.2-.7.2-1.3.1-1.5c-.2-.2-.4-.4-.7-.2c-.1.1-.1-.4.1-.5c.2-.1.5-.1.9 0c0 0 0-.2.2-.1c.3 0 .9.2 1 .3c.1.1.3.5.3 1.4c0 .6.1 1.4.3 1.8c-.4 0-.9-.1-1.4-.3c-.5.2-.9.3-1.4.3c.2-.4.5-.8.6-1.2m-2.6 8.9l.3-6.7c-.1-.1-.3-.3-.5-.4l-.4 7.6l-.3.3l.3-8.1c-.1-.1-.5-.4-.6-.5l-.4 9.3l-.2.2l.4-9.6c-.1 0-.4.1-.5.3c.3-1 1.4-.7 2.2-.2c.4.3.9.4 1.3.5h.2c.5 0 1-.1 1.6-.3c.6.2 1.1.3 1.6.3h.3c.4-.1.8-.2 1.2-.4c.9-.5 2-.8 2.2.3c-.2-.1-.5-.3-.6-.3l.4 9.5l-.2-.2l-.4-9.4c-.1.1-.5.5-.6.5l.3 8l-.3-.3l-.3-7.5c-.1.1-.4.3-.5.4l.3 6.6l-.8-.7l-.7-2.6c.7-1.5.6-2.8.6-2.8h-.2c-.5 0-1.6-.2-2.1-.6c-.1 0-.1-.1-.2-.2c0 0-.1.1-.2.1c-.5.3-1.6.6-2.1.6h-.2s-.1 1.3.6 2.8l-.8 2.7l-.7.8m3.4 2h-1.1l.7-3.4c.1.1.2.2.4.3c.1-.1.3-.2.4-.3l.8 3.4H32"
                        fill="#c09300"
                      />
                    </svg>
                    Arabic (EG)
                  </div>
                </button>
              </li>
            </ul>
          </div>
          <div
            id="tooltip-settings"
            role="tooltip"
            className={`z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm transition-opacity duration-300 tooltip  ${
              langMsg === "true"
                ? "inline-block opacity-100 visible fixed bottom-[60px]"
                : "opacity-0 invisible hidden"
            }`}
            data-popper-placement="top"
          >
            Language Settings
            <div className="tooltip-arrow" data-popper-arrow=""></div>
          </div>
        </div>
      </aside>

      <div
        className={`pt-4 px-2 w-full md:h-full ${
          openSidebar.desktop ? "md:ml-64" : "md:ml-16"
        }`}
      >
        <div className="p-1 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className={` gap-4 mb-4 ${classGrid}`}>
            <main className="flex-grow w-full">{children}</main>
          </div>
        </div>
        <div className="mb-[85px]"></div>
      </div>
      <div
        className={`px-4 pb-4 fixed ${
          openSidebar.desktop ? "md:ml-64" : "md:ml-16"
        } bottom-0 w-[-webkit-fill-available]`}
      >
        <Footer />
      </div>
    </>
  );
}
