import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import { exportToExcel } from "../../helpers/exportToExcel"; // Import the export function
// import "./BasicDatatable.css";

const BasicDatatable = ({
  columns,
  data,
  nextToPage,
  previousToPage,
  totalCount,
  page,
  pageSize,
  pageSizeOptions,
  onPageSizeChange,
  onSort,
  onSearch,
  isLoading,
  onPageChange,
  serverSideSorting = false, // Flag to enable server-side sorting
  is_export = false, // New prop for export button visibility
  exportFileName,
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchQuery, setSearchQuery] = useState("");

  const totalPages = Math.ceil(totalCount / pageSize);

  // Generate page numbers for pagination with ellipsis
  const generatePageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 3; // Maximum number of pages to display in the range

    if (totalPages <= maxPagesToShow) {
      // Show all pages if totalPages is less than maxPagesToShow
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always include the first page
      pages.push(1);

      // Add pages around the current page
      const startPage = Math.max(2, page - 1);
      const endPage = Math.min(totalPages - 1, page + 2);

      if (startPage > 2) {
        // Add ellipsis if there's a gap between the first page and the range start
        pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) {
        // Add ellipsis if there's a gap between the range end and the last page
        pages.push("...");
      }

      // Always include the last page
      pages.push(totalPages);
    }

    return pages;
  };

  // Handle page click
  const handlePageClick = (pageNumber) => {
    if (pageNumber !== page) onPageChange(pageNumber - 1);
  };

  // Handle sorting logic
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc")
      direction = "desc";
    setSortConfig({ key, direction });
    onSort(key, direction); // Trigger server-side sorting
  };

  // Trigger onSearch when the search query changes
  useEffect(() => {
    if (onSearch) onSearch(searchQuery, page, pageSize);
  }, [searchQuery, page, pageSize, onSearch]);

  // Determine sorted data
  const sortedData = React.useMemo(() => {
    if (!serverSideSorting && sortConfig.key) {
      return [...data].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key])
          return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key])
          return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return data; // Skip sorting if server-side sorting is enabled
  }, [data, sortConfig, serverSideSorting]);

  return (
    <div
      className="datatable container-fluid p-4 rounded shadow-sm"
      style={{ backgroundColor: "#FFF" }}
    >
      {/* Search and Page Size Selector */}
      <div className="row align-items-center mb-4">
        <div className="col-md-6 col-sm-12 mb-2">
          <div className="d-flex align-items-center">
            <select
              id="page-size"
              className="form-select form-select-sm shadow-sm"
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              style={{ borderRadius: "8px", width: "120px", padding: "10px" }}
            >
              {pageSizeOptions.map((size, index) => (
                <option key={index} value={size}>
                  Show {size}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-md-2 col-sm-12 mb-2 justify-content-end"></div>
        <div className="col-md-3 col-sm-12 mb-2 justify-content-end">
          <div
            className="d-flex align-items-center shadow-sm"
            style={{
              backgroundColor: "#f4f8fb", // Light background
              borderRadius: "25px", // Rounded corners
              padding: "5px",
            }}
          >
            <i
              className="ri-search-line"
              style={{
                fontSize: "18px",
                color: "#888",
                marginRight: "8px",
                marginLeft: "10px",
              }} // Search icon styling
            ></i>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control"
              style={{
                border: "none",
                background: "none",
                outline: "none",
                boxShadow: "none",
              }}
            />
          </div>
        </div>

        {is_export && (
          <div className="col-md-1 col-sm-12 mb-2">
            {/* <button
              className="btn btn-primary"
              onClick={() => exportToExcel(data, columns, exportFileName )}
            >
              Export to Excel
            </button> */}
            <button
              className="btn btn-primary"
              onClick={() => exportToExcel(data, columns, exportFileName)}
            >
              <i className="ri-upload-2-fill"></i>
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="table-responsive rounded shadow-sm">
        <table className="table table-striped table-bordered">
          <thead className="thead-light">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  onClick={() => col.accessor && handleSort(col.accessor)}
                  style={{
                    cursor: col.accessor ? "pointer" : "default",
                    fontWeight: "600",
                    color: "#333",
                  }}
                  className="text-center"
                >
                  {col.Header}
                  {sortConfig.key === col.accessor && (
                    <span className="ms-2">
                      {sortConfig.direction === "asc" ? "🔼" : "🔽"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody style={{ position: "relative" }}>
            {isLoading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{ position: "relative", height: "100px" }}
                >
                  <div
                    className="d-flex flex-column justify-content-center align-items-center"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      zIndex: 10,
                    }}
                  >
                    <div
                      className="spinner-border text-primary mb-2"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#555",
                      }}
                    >
                      Loading...
                    </div>
                  </div>
                </td>
              </tr>
            ) : sortedData.length > 0 ? (
              sortedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  style={{
                    backgroundColor: rowIndex % 2 === 0 ? "#fdfdfd" : "#ffffff",
                  }}
                >
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="text-center">
                      {typeof col.accessor === "function"
                        ? col.accessor(row)
                        : row[col.accessor]
                        ? row[col.accessor]
                        : col.Cell
                        ? col.Cell({ row })
                        : null}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center text-muted py-3"
                >
                  No Data Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-end align-items-center mt-4">
        {/* Previous Page Button */}
        <button
          className="btn btn-outline-primary btn-sm px-4"
          onClick={previousToPage}
          disabled={page === 0}
          style={{ borderRadius: "20px" }}
        >
          <i className="ri-arrow-left-fill"></i>
        </button>

        {/* Page Numbers */}
        <div className="mx-3">
          {generatePageNumbers().map((pageNumber, index) =>
            pageNumber === "..." ? (
              <span key={`ellipsis-${index}`} className="mx-2 text-muted">
                ...
              </span>
            ) : (
              <button
                key={`page-${pageNumber}`}
                onClick={() => handlePageClick(pageNumber)}
                className={`btn btn-sm mx-1 ${
                  page === pageNumber - 1
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                style={{ borderRadius: "50%" }}
              >
                {pageNumber}
              </button>
            )
          )}
        </div>

        {/* Next Page Button */}
        <button
          className="btn btn-outline-primary btn-sm px-4"
          onClick={nextToPage}
          disabled={page + 1 >= totalPages}
          style={{ borderRadius: "20px" }}
        >
          <i className="ri-arrow-right-fill"></i>
        </button>
      </div>
    </div>
  );
};

BasicDatatable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  nextToPage: PropTypes.func.isRequired,
  previousToPage: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageSizeOptions: PropTypes.array,
  onPageSizeChange: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  serverSideSorting: PropTypes.bool, // New Prop for server-side sorting
  is_export: PropTypes.bool, // New prop for controlling export button visibility
  exportFileName: PropTypes.string, // New prop for export file name
};

BasicDatatable.defaultProps = {
  pageSizeOptions: [5, 10, 20, 50],
  isLoading: false,
  serverSideSorting: false,
};

export default BasicDatatable;
