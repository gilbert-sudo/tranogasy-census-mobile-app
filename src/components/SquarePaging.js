// import React, { useState, useEffect } from 'react';
import { Link } from "wouter";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPage, updateSearchCurrentPage} from "../redux/redux";
const SquarePaging = (pagination) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.pagination);
  let isSearch = state[0].isSearch[pagination.index];
  const totalPage = state[0].totalPage[pagination.index];
 let currentPage = 1;
  currentPage = isSearch?state[0].searchCurrentPage[pagination.index]:state[0].currentPage[pagination.index];
  const generatePageLinks = () => {
    const links = [];
    if (totalPage === 1) {
      return links;
    } else {
      const start = Math.max(1, currentPage - 1);
      const end = Math.min(totalPage, currentPage + 1);

      if (currentPage > 2) {
        links.push(
           <Link
            className="page-link"
            key="leftEllipsis"
            to={pagination.linkKey}
            onClick={() => {
              isSearch
                ? dispatch(updateSearchCurrentPage({index:pagination.index, newSearchCurrentPage: currentPage-2}))
                : dispatch(
                    updateCurrentPage({
                      index: pagination.index,
                      newCurrentPage: currentPage - 2,
                    })
                  );
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            ...
          </Link>
        );
      }

      for (let i = start; i <= end; i++) {
        links.push(
          <li
            key={i}
            className={`page-item ${i === currentPage ? "active" : ""}`}
          >
            <Link
              className={`page-link ${i === currentPage ? "active" : ""}`}
              key={i}
              to={pagination.linkKey}
              onClick={() => {
                isSearch
                  ? dispatch(updateSearchCurrentPage({index:pagination.index, newSearchCurrentPage: i}))
                  : dispatch(
                      updateCurrentPage({ index: pagination.index, newCurrentPage: i })
                    );
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              {i}
            </Link>
          </li>
        );
      }

      if (currentPage < totalPage - 1) {
        links.push(
          <Link
            key="rightEllipsis"
            to={pagination.linkKey}
            onClick={() => {
              isSearch
                ? dispatch(updateSearchCurrentPage({index:pagination.index, newSearchCurrentPage: currentPage+2}))
                : dispatch(
                    updateCurrentPage({
                      index: pagination.index,
                      newCurrentPage: currentPage +2
                    })
                  );
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            ...
          </Link>
        );
      }
    }

    return links;
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        {currentPage > 1 && (
          <li className="page-item">
            <Link
              className="page-link"
              to={pagination.linkKey}
              onClick={() => {
                isSearch
                  ?  dispatch(updateSearchCurrentPage({index:pagination.index, newSearchCurrentPage: currentPage-1}))
                  : dispatch(
                      updateCurrentPage({
                        index: pagination.index,
                        newCurrentPage: currentPage - 1,
                      })
                    );
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </Link>
          </li>
        )}
        {totalPage > 1 && generatePageLinks()}
        {currentPage < totalPage && (
          <li className="page-item">
            <Link
              className="page-link"
              to={pagination.linkKey}
              onClick={() => {
               
                isSearch
                  ?  dispatch(updateSearchCurrentPage({index:pagination.index, newSearchCurrentPage: currentPage+1}))
                  :dispatch(
                      updateCurrentPage({
                        index: pagination.index,
                        newCurrentPage: currentPage + 1,
                      })
                    );
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default SquarePaging;
