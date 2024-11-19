import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
} from "react-table";
import { Table, Row, Col, Button, Input, Form, Spinner } from "reactstrap";
import { Filter, DefaultColumnFilter } from "./filters";
import JobListGlobalFilter from "../../components/Common/GlobalSearchFilter";
import { fetchData } from "../../services/fetchData";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import { LoaderListPage } from "../../pages/Loader/Loader";
import { FilterDropStyle } from "../../Style/dropStyle";

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  isJobListGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <React.Fragment>
      <Col md={4}>
        <div className="search-box me-xxl-2 my-3 my-xxl-0 d-inline-block">
          <div className="position-relative">
            <label htmlFor="search-bar-0" className="search-label">
              <span id="search-bar-0-label" className="sr-only">
                Search this table
              </span>
              <input
                onChange={(e) => {
                  setValue(e.target.value);
                  onChange(e.target.value);
                }}
                id="search-bar-0"
                type="text"
                className="form-control"
                placeholder={`${count} records...`}
                value={value || ""}
              />
            </label>
            <i className="bx bx-search-alt search-icon"></i>
          </div>
        </div>
      </Col>
      {isJobListGlobalFilter && <JobListGlobalFilter />}
    </React.Fragment>
  );
}

const TableContainer = ({
  columns,
  data,
  isGlobalFilter,
  isJobListGlobalFilter,
  isAddOptions,
  isAddUserList,
  handleOrderClicks,
  handleUserClick,
  handleCustomerClick,
  isAddCustList,
  customPageSize,
  className,
  customPageSizeOptions,
  onChannelDropselect,
  onSearchInputData,
  isLoading,
  onPageSizeChange,
  pageIndexProp,
  nextToPage,
  previousToPage,
  totalCount,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: {
        pageIndex: 0,
        pageSize: customPageSize,
        sortBy: [
          {
            desc: true,
          },
        ],
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
  );

  const location = useLocation();

  // pagination page route
  const isPaginationRoute = [
    "/ibo-user-list",
    "/environment-list",
    "/action-master-list"
  ].includes(location.pathname);

  // search page route
  const isSearchableRoute = [
    "/tenant-user-list",
    "/cms-user-list",
    "/environment-list",
    // "/action-master-list"
  ].includes(location.pathname);

  const [channelDropData, setchannelDropData] = useState([]);
  const [channelSelectedValue, setChannelSelectedValue] = useState("");

  const [searchInput, setSearchInput] = useState("");

  const totalPages = Math.ceil(totalCount / pageSize);
  const pageOptionList = Array.from({ length: totalPages }, (_, i) => i);
  const customCanNextPage = pageIndexProp < totalPages - 1;
  const customCanPreviousPage = pageIndexProp > 0;

  useEffect(() => {
  }, []);

  useEffect(() => {
    if (isPaginationRoute) {
      onPageSizeChange(pageSize);
    }
  }, [pageSize, onPageSizeChange, isPaginationRoute]);

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
  };

  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
    isPaginationRoute && onPageSizeChange(Number(event.target.value));
  };

  const onChangeInInput = (event) => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };

  // geting filter drop data




  // on Filter data select
  const onChannelFilterChangeSelect = async (value) => {
    let mapChannelValues = value.map((item, index) => item.value);
    setChannelSelectedValue(mapChannelValues);
    onChannelDropselect(mapChannelValues);
  };


  // getting filter drop options data
  const channelOptions = channelDropData.map((item) => ({
    value: item.id,
    label: item.channel_title,
  }));

  // handle search
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearchInputData(value);
  };

  return (
    <Fragment>
      <Row className="mb-2">
        <Col md={customPageSizeOptions ? 2 : 1} style={{ width: "140px" }}>
          <select
            className="form-select"
            value={pageSize}
            onChange={onChangeInSelect}>
            {[10, 20, 30, 40, 50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </Col>
        {isGlobalFilter && (
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
            isJobListGlobalFilter={isJobListGlobalFilter}
          />
        )}
        {isAddOptions && (
          <Col sm="7">
            <div className="text-sm-end">
              <Button
                type="button"
                color="success"
                className="btn-rounded  mb-2 me-2"
                onClick={handleOrderClicks}>
                <i className="mdi mdi-plus me-1" />
                Add New Order
              </Button>
            </div>
          </Col>
        )}
        {isAddUserList && (
          <Col sm="7">
            <div className="text-sm-end">
              <Button
                type="button"
                color="primary"
                className="btn mb-2 me-2"
                onClick={handleUserClick}>
                <i className="mdi mdi-plus-circle-outline me-1" />
                Create New User
              </Button>
            </div>
          </Col>
        )}
        {isAddCustList && (
          <Col sm="7">
            <div className="text-sm-end">
              <Button
                type="button"
                color="success"
                className="btn-rounded mb-2 me-2"
                onClick={handleCustomerClick}>
                <i className="mdi mdi-plus me-1" />
                New Customers
              </Button>
            </div>
          </Col>
        )}



        {location.pathname === "/environment-list" && (
          <Col md="2" style={{ paddingLeft: "5px", marginRight: "40px" }}>
            <Select
              value={channelOptions.find(
                (option) => option.value === channelSelectedValue
              )}
              onChange={(selectedOption) =>
                onChannelFilterChangeSelect(
                  selectedOption ? selectedOption : null
                )
              }
              options={channelOptions}
              placeholder="Select Channel"
              classNamePrefix="react-select"
              isClearable
              isMulti={true}
              noOptionsMessage={() => "no data found.."}
              maxMenuHeight={200}
              styles={FilterDropStyle}
            />
          </Col>
        )}

        {isSearchableRoute && (
          <Col className="ms-auto" md="3">
            <Form className="app-search d-flex d-lg-inline mt-0">
              <div className="position-relative">
                <Input
                  type="search"
                  className="form-control"
                  placeholder="Search"
                  value={searchInput}
                  onChange={handleSearchChange}
                />
                <span className="ri-search-line"></span>
              </div>
            </Form>
          </Col>
        )}
      </Row>

      <div className="table-responsive react-table mt-4">
        <Table bordered hover {...getTableProps()} className={className}>
          <thead className="table-light table-nowrap">
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th key={column.id}>
                    <div className="mb-2" {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                      {/* {console.log("column===>>>>>>>", column)} */}
                      {generateSortingIndicator(column)}
                    </div>
                    <Filter column={column} />
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {isLoading ? (
              <LoaderListPage />
            ) : data.length > 0 ? (
              <>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <Fragment key={row.getRowProps().key}>
                      <tr>
                        {row.cells.map((cell) => {
                          return (
                            <td key={cell.id} {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    </Fragment>
                  );
                })}
              </>
            ) : (
              <div
                style={{
                  position: "absolute",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "95%",
                }}>
                <h4 style={{ textAlign: "center", marginTop: "20px" }}>
                  No data found..!
                </h4>
              </div>
            )}
          </tbody>
        </Table>
      </div>

      <Row className="justify-content-md-end justify-content-center align-items-center">
        <Col className="col-md-auto">
          <div className="d-flex gap-1">
            {/* <Button
              color="primary"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}>
              {"<<"}
            </Button> */}
            <Button
              color="primary"
              onClick={isPaginationRoute ? previousToPage : previousPage}
              disabled={
                isPaginationRoute ? !customCanPreviousPage : !canPreviousPage
              }>
              {"<"}
            </Button>
          </div>
        </Col>
        <Col className="col-md-auto d-none d-md-block">
          Page{" "}
          <strong>
            {isPaginationRoute ? pageIndexProp + 1 : pageIndex + 1} of{" "}
            {isPaginationRoute ? pageOptionList.length : pageOptions.length}
          </strong>
        </Col>
        {/* <Col className="col-md-auto">
          <Input
            type="number"
            min={1}
            style={{ width: 70 }}
            max={pageOptions.length}
            defaultValue={pageIndex + 1}
            onChange={onChangeInInput}
          />
        </Col> */}

        <Col className="col-md-auto">
          <div className="d-flex gap-1">
            <Button
              color="primary"
              onClick={isPaginationRoute ? nextToPage : nextPage}
              disabled={isPaginationRoute ? !customCanNextPage : !canNextPage}>
              {">"}
            </Button>
            {/* <Button
              color="primary"
              onClick={() => gotoPage(totalPages - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </Button> */}
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

TableContainer.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default TableContainer;