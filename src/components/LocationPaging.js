// import React, { useState, useEffect } from 'react';
import { Link } from "wouter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPage } from "../redux/redux";
const LocationPaging = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.pagination);
  const totalPage = state[0].totalPage[2];
  const currentPage = state[0].currentPage[2];
  const generatePageLinks = () => {
    const links = [];

    if (totalPage == 1) {
    return links;
    } else {
      const start = Math.max(1, currentPage - 1);
      const end = Math.min(totalPage, currentPage + 1);

      if (currentPage > 2) {
        links.push(
            <Link
            className="page-link"
              key="leftEllipsis"
              to="/location-list/#prodisplay"
              onClick={() => {
                dispatch(updateCurrentPage({index: 2, newCurrentPage: currentPage - 2}));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              ...
            </Link>
        );
      }

      for (let i = start; i <= end; i++) {
        links.push(
          <li key={i} className={`page-item ${i === currentPage ? "active" : ""}`}>
            <Link
            className={`page-link ${i === currentPage ? "active" : ""}`}
              key={i}
              to="/location-list/#prodisplay"
              onClick={() => {
                dispatch(updateCurrentPage({index: 2, newCurrentPage: i}));
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
              to="/location-list/#prodisplay"
              onClick={() => {
                dispatch(updateCurrentPage({index: 2, newCurrentPage: currentPage + 2}));
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
              to="/location-list/#prodisplay"
              onClick={() => {
                dispatch(updateCurrentPage({index:2, newCurrentPage: currentPage - 1}));
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
              to={`/location-list/#prodisplay?page=${currentPage + 1}`}
              onClick={() => {
                dispatch(updateCurrentPage({index: 2, newCurrentPage: currentPage + 1}));
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

export default LocationPaging;
