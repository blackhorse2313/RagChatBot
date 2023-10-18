import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FiChevronsLeft,
  FiChevronsRight,
  FiChevronRight,
  FiChevronLeft,
} from "react-icons/fi";

const TableWithPagination = () => {
  const dataLimit = 10;

  const [data, setData] = useState([]);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const leftBound = currentPage - 1 > 0 ? currentPage - 1 : 1;
  const rightBound = currentPage + 1 <= pages ? currentPage + 1 : pages;

  useEffect(() => {
    axios
      .post("https://www.medicalcodingbot.com/api/firstquery10180", {
        page: currentPage,
      })
      .then((response) => {
        setData(response.data.first_query);
        setPages(Math.ceil(response.data.count / dataLimit));
      });
  }, [currentPage]);

  function goNext() {
    setCurrentPage((page) => Math.min(page + 1, pages));
  }

  function goPrev() {
    setCurrentPage((page) => Math.max(page - 1, 1));
  }

  function goToFirst() {
    setCurrentPage(1);
  }

  function goToLast() {
    setCurrentPage(pages);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  return (
    <div className="w-full">
      <div className="bg-white shadow-md rounded my-6">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-indigo-600 text-white text-sm leading-normal">
              <th className="py-3 px-6 text-left">First Query</th>
              <th className="py-3 px-6 text-left w-48">Date</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {data.length === 0 ? (
              <tr>
                <td className="py-3 px-6 text-left">No data</td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr
                  className="border-b border-gray-200 hover:bg-gray-100"
                  key={index}
                >
                  <td className="py-3 px-6 text-left">
                    <div className="flex items-center whitespace-break-spaces">
                      <div className="font-medium">{item.query}</div>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <div className="flex items-center whitespace-break-spaces">
                      <div className="font-medium">
                        {item.updated_at.substring(0, 10) +
                          " " +
                          item.updated_at.substring(11, 19)}
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="flex items-center justify-center p-4">
          <button
            onClick={goToFirst}
            disabled={currentPage === 1}
            className="text-gray-900 px-2 py-2 rounded-md"
          >
            <FiChevronsLeft />
          </button>
          <button
            onClick={goPrev}
            disabled={currentPage === 1}
            className="text-gray-900 px-2 py-2 rounded-md"
          >
            <FiChevronLeft />
          </button>
          {[...Array(pages).keys()]
            .slice(leftBound - 1, rightBound)
            .map((item, index) => (
              <button
                key={index}
                onClick={changePage}
                className={`text-gray-900 px-3 py-1 rounded-md mx-1 ${
                  currentPage === item + 1
                    ? "border border-indigo-700 text-indigo-700"
                    : null
                }`}
              >
                <span>{item + 1}</span>
              </button>
            ))}
          <button
            onClick={goNext}
            disabled={currentPage === pages}
            className="text-gray-900 px-2 py-2 rounded-md"
          >
            <FiChevronRight />
          </button>
          <button
            onClick={goToLast}
            disabled={currentPage === pages}
            className="text-gray-900 px-2 py-2 rounded-md"
          >
            <FiChevronsRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableWithPagination;
