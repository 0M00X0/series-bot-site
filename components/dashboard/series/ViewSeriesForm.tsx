"use client";
import { useTranslation } from "react-i18next";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import slugify from "slugify";

interface SeriesData {
  title: string;
  slug: string;
  priceType: string;
  priceTl: number;
  priceEd: number;
  pricePr: number;
}

interface ViewSeriesFormProps {
  seriesdata: SeriesData; // استخدم الواجهة المناسبة هنا
}
export default function ViewSeriesForm({ seriesdata }: ViewSeriesFormProps) {
  const { t } = useTranslation("series", { keyPrefix: "viewform" });
  const { data: session } = useSession();
  const [slugSite, setSlugSite] = useState("");
  useEffect(() => {
    const slugOld = window.location.href;
    const slugNew = slugOld.substring(0, slugOld.lastIndexOf("/"));
    setSlugSite(slugNew + "/");
  }, []);

  const [userId, setUserId] = useState(session?.user?.id);
  const [title, setTitle] = useState(seriesdata?.title);
  const [slug, setSlug] = useState(seriesdata?.slug);
  const [priceType, setPriceType] = useState(seriesdata?.priceType);
  const [priceTl, setPriceTl] = useState(seriesdata?.priceTl);
  const [priceEd, setPriceEd] = useState(seriesdata?.priceEd);
  const [pricePr, setPricePr] = useState(seriesdata?.pricePr);
  const [error, setError] = useState("");

  
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            {t("view")}
          </h2>
          <form>
            {error && <div className="mb-4 text-sm text-red-500">{error}</div>}
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("title")}
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled
                  defaultValue={title}
                />
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t("slug")} <span className="font-medium">{slugSite}</span>
                  {slug}
                </p>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="priceType"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("pricetype")}
                </label>
                <select
                  id="priceType"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled
                  defaultValue={priceType}
                >
                  <option defaultValue="">{t("pricetype_placeholder")}</option>
                  <option defaultValue="Points">{t("pricetype_points")}</option>
                  <option defaultValue="Dollar">{t("pricetype_dollar")}</option>
                  <option defaultValue="Euro">{t("pricetype_euro")}</option>
                </select>
              </div>
              <div className="w-full">
                <label
                  htmlFor="priceTl"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("pricetl")}
                </label>
                <input
                  type="number"
                  name="priceTl"
                  id="priceTl"
                  defaultValue={priceTl}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="priceEd"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("priceed")}
                </label>
                <input
                  type="number"
                  name="priceEd"
                  id="priceEd"
                  defaultValue={priceEd}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="pricePr"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("pricepr")}
                </label>
                <input
                  type="number"
                  name="pricePr"
                  id="pricePr"
                  defaultValue={pricePr}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled
                  required
                />
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
