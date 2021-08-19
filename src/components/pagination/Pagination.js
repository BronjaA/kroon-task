import "./pagination.scss";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PageIndicator from "../pageIndicator/PageIndicator";

const Pagination = ({ currentPage, lastPage, onChange }) => {
  const [pageRange, setPageRange] = useState([]);
  const [headSeparator, setHeadSeparator] = useState(false);
  const [tailSeparator, setTailSeparator] = useState(false);

  const returnNumberArray = (beginning, end) => {
    const array = [];
    for (let i = beginning; i <= end; i++) {
      array.push(i);
    }

    return array;
  };

  useEffect(() => {
    if (lastPage <= 10) {
      setPageRange(returnNumberArray(2, lastPage - 1));
      setHeadSeparator(false);
      setTailSeparator(false);
    } else if (currentPage < 5) {
      setPageRange(returnNumberArray(2, 5));
      setHeadSeparator(false);
      setTailSeparator(true);
    } else if (currentPage > lastPage - 4) {
      setPageRange(returnNumberArray(lastPage - 4, lastPage - 1));
      setHeadSeparator(true);
      setTailSeparator(false);
    } else {
      setPageRange(returnNumberArray(currentPage - 2, currentPage + 2));
      setHeadSeparator(true);
      setTailSeparator(true);
    }
  }, [currentPage]);

  const previousPage = () => {
    if (currentPage > 1) {
      onChange(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < lastPage) {
      onChange(currentPage + 1);
    }
  };

  return (
    <div id="pagination-container">
      <div className="wrapper">
        {/* Page Indicators */}
        <PageIndicator pageNumber={1} currentPage={currentPage} onClick={onChange} />
        <p className={!headSeparator ? "hidden" : ""}>...</p>
        {pageRange.map((number) => (
          <PageIndicator
            key={number}
            pageNumber={number}
            currentPage={currentPage}
            onClick={onChange}
          />
        ))}
        <p className={!tailSeparator ? "hidden" : ""}>...</p>
        <PageIndicator pageNumber={lastPage} currentPage={currentPage} onClick={onChange} />

        {/* Navigation Buttons */}
        <button type="button" onClick={previousPage}>
          {"<"}
        </button>
        <button type="button" onClick={nextPage}>
          {">"}
        </button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Pagination;
