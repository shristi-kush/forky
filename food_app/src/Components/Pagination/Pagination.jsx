import React from "react";
import PropTypes from "prop-types";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "./Pagination.css";

const Pagination = ({
  page,
  totalPages,
  totalItems,
  rangeStart,
  rangeEnd,
  onPageChange,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}) => {
  if (totalItems <= 0 || totalPages <= 1) {
    return null;
  }

  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, page - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages, start + maxVisible - 1);
  start = Math.max(1, end - maxVisible + 1);

  for (let i = start; i <= end; i += 1) {
    pages.push(i);
  }

  return (
    <nav className="pagination" aria-label="Pagination">
      <p className="pagination__summary">
        Showing {rangeStart}–{rangeEnd} of {totalItems}
      </p>
      <div className="pagination__controls">
        <button
          type="button"
          className="pagination__btn pagination__btn--arrow"
          onClick={onPrev}
          disabled={!hasPrev}
          aria-label="Previous page"
        >
          <FiChevronLeft aria-hidden />
        </button>

        <div className="pagination__pages">
          {start > 1 && (
            <>
              <button
                type="button"
                className="pagination__btn pagination__btn--page"
                onClick={() => onPageChange(1)}
              >
                1
              </button>
              {start > 2 && <span className="pagination__ellipsis">…</span>}
            </>
          )}

          {pages.map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              className={`pagination__btn pagination__btn--page${
                pageNum === page ? " pagination__btn--active" : ""
              }`}
              onClick={() => onPageChange(pageNum)}
              aria-current={pageNum === page ? "page" : undefined}
            >
              {pageNum}
            </button>
          ))}

          {end < totalPages && (
            <>
              {end < totalPages - 1 && (
                <span className="pagination__ellipsis">…</span>
              )}
              <button
                type="button"
                className="pagination__btn pagination__btn--page"
                onClick={() => onPageChange(totalPages)}
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        <button
          type="button"
          className="pagination__btn pagination__btn--arrow"
          onClick={onNext}
          disabled={!hasNext}
          aria-label="Next page"
        >
          <FiChevronRight aria-hidden />
        </button>
      </div>
    </nav>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  rangeStart: PropTypes.number.isRequired,
  rangeEnd: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  hasPrev: PropTypes.bool.isRequired,
  hasNext: PropTypes.bool.isRequired,
};

export default Pagination;
