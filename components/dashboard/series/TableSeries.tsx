"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

export default function TableSeries() {
  const { data: session } = useSession();
  const [series, setSeries] = useState({
    total: 0,
    page: 1,
    series: [],
    first_series: 0,
    last_series: 0,
    total_series: 0,
    all_series: 0,
  });
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const totalPages = Math.ceil(series.all_series / perPage);

  const pageButtons = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const hasPrevPage = series.page > 1;
  const hasNextPage = series.page < totalPages;

  const [showActions, setShowActions] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    axios
      .get(`/api/series?page=${page}&per_page=${perPage}&search=${search}`)
      .then((res) => {
        setSeries(res.data);
      })
      .catch((err) => {
        setError(err);
      });
  }, [page, perPage, search]);

  const toggleActions = (index: number) => {
    const newShowActions = [...showActions];
    newShowActions[index] = !newShowActions[index];
    for (let i = 0; i < newShowActions.length; i++) {
      if (i !== index) {
        newShowActions[i] = false;
      }
    }
    setShowActions(newShowActions);
  };

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
              window.location.reload();
            });
          },
          (error) => {
            Swal.fire("Error!", "Your file has not been deleted.", "error");
          }
        );
      }
    });
  }
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
        <div className="w-full md:w-1/2">
          <form className="flex items-center">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Search"
                required
              />
            </div>
          </form>
        </div>
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <Link
            href="/dashboard/series/add"
            className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
          >
            <svg
              className="h-3.5 w-3.5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              />
            </svg>
            Add product
          </Link>
        </div>
      </div>{" "}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3">
                Series Name
              </th>
              <th scope="col" className="px-4 py-3">
                Slug
              </th>
              <th scope="col" className="px-4 py-3">
                Price Type
              </th>
              <th scope="col" className="px-4 py-3">
                Price TL
              </th>
              <th scope="col" className="px-4 py-3">
                Price Ed
              </th>
              <th scope="col" className="px-4 py-3">
                Price Pr
              </th>
              <th scope="col" className="px-4 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {series.series.map((serie: any, index: number) => (
              <>
                <tr className="border-b dark:border-gray-700" key={serie.id}>
                  <th
                    scope="row"
                    className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {serie.title}
                  </th>
                  <td className="px-4 py-3">{serie.slug}</td>
                  <td className="px-4 py-3">{serie.priceType}</td>
                  <td className="px-4 py-3">{serie.priceTl}</td>
                  <td className="px-4 py-3">{serie.priceEd}</td>
                  <td className="px-4 py-3">{serie.pricePr}</td>
                  <td className="px-4 py-3 flex items-center justify-end">
                    <button
                      onClick={() => toggleActions(index)}
                      id="apple-imac-27-dropdown-button"
                      data-dropdown-toggle="apple-imac-27-dropdown"
                      className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                      type="button"
                    >
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                    </button>
                    <div
                      id="apple-imac-27-dropdown"
                      className={`absolute right-[45px] z-100 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 ${
                        showActions[index] ? "" : "hidden"
                      }`}
                    >
                      <ul
                        className="py-1 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="apple-imac-27-dropdown-button"
                      >
                        <li>
                          <Link
                            href={`/dashboard/series/${serie.slug}`}
                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Show
                          </Link>
                        </li>
                        {session?.user?.role !== "PUBLISHER" && (
                          <li>
                            <Link
                              href={`/dashboard/series/edit/${serie.slug}`}
                              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Edit
                            </Link>
                          </li>
                        )}
                      </ul>
                      {session?.user?.role !== "PUBLISHER" && (
                        <div className="py-1">
                          <button
                            onClick={() => deleteSeries(serie.id)}
                            className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full text-left"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
      <nav
        className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing
          <span className="font-semibold text-gray-900 dark:text-white">
            {" " + series.first_series + " "} -{" " + series.last_series + " "}
          </span>
          of
          <span className="font-semibold text-gray-900 dark:text-white">
            {" " + series.all_series}
          </span>
        </span>
        <ul className="inline-flex items-stretch -space-x-px">
          <li>
            <button
              {...(!hasPrevPage && { disabled: true })}
              onClick={() => setPage(series.page - 1)}
              className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </li>
          {pageButtons.map((page) => {
            if (page === series.page) {
              return (
                <li key={page}>
                  <span className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
                    {page}
                  </span>
                </li>
              );
            } else if (
              page === 1 ||
              page === totalPages ||
              (page >= series.page - 1 && page <= series.page + 1)
            ) {
              return (
                <li key={page}>
                  <button
                    onClick={() => setPage(page)}
                    className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    {page}
                  </button>
                </li>
              );
            } else if (
              page === series.page - 2 ||
              page === series.page + 2 ||
              (page === 2 && series.page === 1) ||
              (page === totalPages - 1 && series.page === totalPages)
            ) {
              return (
                <li key={page}>
                  <span className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    ...
                  </span>
                </li>
              );
            }
            return null;
          })}
          <li>
            <button
              {...(!hasNextPage && { disabled: true })}
              onClick={() => setPage(series.page + 1)}
              className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
