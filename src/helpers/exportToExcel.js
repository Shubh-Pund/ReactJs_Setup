// utils/exportToExcel.js
import * as XLSX from "xlsx";

/**
 * Exports data to an Excel file.
 * @param {Array} data - The data to export.
 * @param {Array} columns - The column definitions for the data table.
 * @param {string} fileName - The name of the Excel file to generate.
 */
export const exportToExcel = (data, columns, fileName = "datatable_export.xlsx") => {
  // Map data for export based on column definitions
  const exportData = data.map((row) =>
    columns.reduce((acc, col) => {
      if (col.accessor) {
        acc[col.Header] =
          typeof col.accessor === "function"
            ? col.accessor(row) // Custom accessor function
            : row[col.accessor] || "";
      }
      return acc;
    }, {})
  );

  // Convert data to a worksheet and create a workbook
  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

  // Generate Excel file and download
  XLSX.writeFile(workbook, fileName);
};
