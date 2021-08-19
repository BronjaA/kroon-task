import "./page-indicator.scss";
import PropTypes from "prop-types";

const PageIndicator = ({ pageNumber, currentPage, onClick }) => {
  return (
    <p
      onClick={() => onClick(pageNumber)}
      className={`indicator ${currentPage === pageNumber ? "current" : ""}`}
    >
      {pageNumber}
    </p>
  );
};

PageIndicator.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PageIndicator;
