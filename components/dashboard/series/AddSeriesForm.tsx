import { useTranslation } from "react-i18next";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { createSeries } from "@/components/actions/Series";
import slugify from "slugify";
import Link from "next/link";

export default function AddSeriesForm() {
  const { t } = useTranslation("series", { keyPrefix: "addform" });
  const { data: session } = useSession();
  const [slugSite, setSlugSite] = useState<string>("");
  useEffect(() => {
    const slugOld = window.location.href;
    const slugNew = slugOld.substring(0, slugOld.lastIndexOf("/"));
    setSlugSite(slugNew + "/");
  }, []);

  const [userId, setUserId] = useState(session?.user?.id);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState<string>("");
  const [priceType, setPriceType] = useState("Dollar");
  const [priceTl, setPriceTl] = useState("");
  const [priceEd, setPriceEd] = useState("");
  const [pricePr, setPricePr] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (title) {
      // اذا كان هناك حروف عربية حولها الي مقبلها بالانجليزي
      const slug = slugify(title, {
        replacement: "-",
        remove: /[*+~.()'"!:@]/g,
        lower: true,
        strict: false,
        locale: "en",
      });
      setSlug(slug);
    }
  }, [title]);
  const router = useRouter();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (
      !userId ||
      !title ||
      !slug ||
      !priceType ||
      !priceTl ||
      !priceEd ||
      !pricePr
    ) {
      setError(t("adderror"));
      return;
    }

    const data = {
      userId,
      title,
      slug,
      priceType,
      priceTl,
      priceEd,
      pricePr,
    };

    const response = await createSeries(data);
    if (response) {
      setError(t("addsuccess"));
      router.push(`/dashboard/series/${slug}`);
    } else {
      setError(t("adderror"));
    }
  }
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            {t("add")}
          </h2>
          <form onSubmit={handleSubmit}>
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
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder={t("title_placeholder")}
                />
              </div>
              <div className="sm:col-span-2 w-[90%]">
                <p className="text-sm text-gray-500 dark:text-gray-400 w-[90%]">
                  {t("slug")} 
                  <Link href={`${slugSite}${slug}`} legacyBehavior>
                    <a className="text-blue-500">
                    {slugSite}{slug}
                    </a>
                  </Link>
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
                  onChange={(e) => setPriceType(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
                  onChange={(e) => setPriceTl(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder={t("pricetl_placeholder")}
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
                  onChange={(e) => setPriceEd(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder={t("priceed_placeholder")}
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
                  onChange={(e) => setPricePr(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder={t("pricepr_placeholder")}
                  required
                />
              </div>
            </div>
            <button
              disabled={
                !userId ||
                !title ||
                !slug ||
                !priceType ||
                !priceTl ||
                !priceEd ||
                !pricePr
                  ? true
                  : false
              }
              type="submit"
              className="items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 w-full flex justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t("addbtn")}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
