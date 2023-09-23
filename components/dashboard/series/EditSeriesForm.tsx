"use client";
import { useTranslation } from "react-i18next";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import slugify from "slugify";
import axios from "axios";
import Swal from "sweetalert2";

interface SeriesData {
  id: string;
  title: string;
  slug: string;
  priceType: string;
  priceTl: number;
  priceEd: number;
  pricePr: number;
}

interface ViewSeriesFormProps {
  seriesdata: SeriesData; 
}
export default function EditSeriesForm({ seriesdata }: ViewSeriesFormProps) {
  const { t } = useTranslation("series", { keyPrefix: "editform" });
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

  const router = useRouter();
  function EditSeries(e: any) {
    e.preventDefault();
    setUserId(session?.user?.id);
    const slug = slugify(title, {
      replacement: "-",
      remove: /[*+~.()'"!:@]/g,
      lower: true,
      strict: false,
      locale: "en",
    });
    setSlug(slug);
    const data = {
      id: seriesdata?.id,
      userId,
      title,
      slug,
      priceType,
      priceTl,
      priceEd,
      pricePr,
    };
    axios
      .put(`/api/series/${seriesdata?.slug}`, data)
      .then((res) => {
      })
      .catch((err) => {
        setError(err);
      });
  }

  function deleteSeries(id: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/api/series/${id}`).then(
          (response) => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              router.push("/dashboard/series");
            });
          },
          (error) => {
            console.log(error);
            Swal.fire("Error!", "Your file has not been deleted.", "error");
          }
        );
      }
    });
  }

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            {t("edit")}
          </h2>
          <form onSubmit={EditSeries}>
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
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  name="title"
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  onChange={(e) => setPriceType(e.target.value)}
                  id="priceType"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
                      onChange={(e) => setPriceTl(parseInt(e.target.value))}
                      type="number"
                      name="priceTl"
                      id="priceTl"
                      defaultValue={priceTl}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
                      onChange={(e) => setPriceEd(parseInt(e.target.value))}
                      type="number"
                      name="priceEd"
                      id="priceEd"
                      defaultValue={priceEd}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
                      onChange={(e) => setPricePr(parseInt(e.target.value))}
                  type="number"
                  name="pricePr"
                  id="pricePr"
                  defaultValue={pricePr}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                />
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-4">
              <button
                type="submit"
                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-1/2"
              >
                Update product
              </button>
              <button
                type="button"
                onClick={() => deleteSeries(parseInt(seriesdata?.id))}

                className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 w-1/2 justify-center"
              >
                <svg
                  className="w-5 h-5 mr-1 -ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Delete
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
