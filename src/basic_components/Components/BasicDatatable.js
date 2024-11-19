import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BasicDatatable.css";

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
  onSearch // Prop to send the search query to the server
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchQuery, setSearchQuery] = useState("");

  const totalPages = Math.ceil(totalCount / pageSize);

  // Handle sorting logic
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    onSort(key, direction);
  };

  // When the search query changes, fetch the filtered data from the server
  useEffect(() => {
    if (onSearch) {
      onSearch(searchQuery, page, pageSize);  // Send search query along with page and pageSize
    }
  }, [searchQuery, page, pageSize, onSearch]);

  // Sorting logic on client-side after fetching from the server
  const sortedData = React.useMemo(() => {
    if (sortConfig.key) {
      return [...data].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return data;
  }, [data, sortConfig]);

  return (
    <div className="datatable container-fluid p-4 rounded shadow-sm" style={{ backgroundColor: "#f9f9f9" }}>
      {/* Search and Page Size Selector */}
      <div className="row align-items-center mb-4">
        <div className="col-md-6 col-sm-12 mb-2">
          <div className="d-flex align-items-center">
            <label htmlFor="page-size" className="me-2 mb-0" style={{ fontWeight: "600" }}>
              Rows per page:
            </label>
            <select
              id="page-size"
              className="form-select form-select-sm shadow-sm"
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              style={{ borderRadius: "8px", width: "120px", padding:"10px" }}
            >
              {pageSizeOptions.map((size, index) => (
                <option key={index} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-6 col-sm-12 mb-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control shadow-sm"
            style={{ borderRadius: "8px", padding: "10px" }}
          />
        </div>
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
                    <span className="ms-2">{sortConfig.direction === "asc" ? "🔼" : "🔽"}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          {/* <tbody>
            {sortedData.length > 0 ? (
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
                        : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center text-muted py-3">
                  No Data Available
                </td>
              </tr>
            )}
          </tbody> */}
          <tbody>
            {sortedData.length > 0 ? (
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
                        : // If the accessor is a function (custom Cell renderer)
                          row[col.accessor] ? row[col.accessor] : row[col.accessor] === undefined && col.Cell ? col.Cell({ row }) : null}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center text-muted py-3">
                  No Data Available
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <button
          className="btn btn-outline-primary btn-sm px-4"
          onClick={previousToPage}
          disabled={page === 0}
          style={{ borderRadius: "20px" }}
        >
          Previous
        </button>
        <span style={{ fontWeight: "600", color: "#555" }}>
          Page {page + 1} of {totalPages}
        </span>
        <button
          className="btn btn-outline-primary btn-sm px-4"
          onClick={nextToPage}
          disabled={page + 1 >= totalPages}
          style={{ borderRadius: "20px" }}
        >
          Next
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
  onSearch: PropTypes.func.isRequired, // onSearch prop for sending search query
};

BasicDatatable.defaultProps = {
  pageSizeOptions: [5, 10, 20, 50],
};

export default BasicDatatable;
