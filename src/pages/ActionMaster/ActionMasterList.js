import React, { useMemo, useState, useEffect } from "react";
import TableContainer from "../../components/Common/TableContainer";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Card, CardBody, Button, Container } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../services/fetchData";
import BasicDatatable from "../../basic_components/Components/BasicDatatable";

const breadcrumbItems = [];
export default function ActionMasterList() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

    useEffect(() => {
        getData();
    }, [searchKeyword, page, pageSize, sortConfig]);

    const getData = async () => {
        try {
            const payload = {
                "modelName": "users",
                "fetchCountandDateSeparately": true,
                "subQuery": false,
                "whereCondition": {
                    "is_active": "Active"
                },
                "relations": [
                    {
                        "module": "free_trials",
                        "moduleAs": "free_trials",
                        "required": true
                    },
                    {
                        "module": "user_subscriptions",
                        "moduleAs": "user_subscriptions",
                        "required": true
                    }
                ],
                order: {
                    field: sortConfig.key,
                    order: sortConfig.direction,
                },
                "pagination": {
                    "page": page + 1,
                    "pageSize": pageSize
                },
                "search": {
                    "field_name": [
                        "users.full_name",
                        "users.email",
                        "users.mobile_number",
                        "free_trials.status",
                        "free_trials.end_date",
                        "free_trials.status",
                        "user_subscriptions.start_date",
                        "user_subscriptions.end_date",
                        "user_subscriptions.actual_end_date"
                    ],
                    "searchKeyword": searchKeyword
                }
            };

            const responseData = await fetchData("/api/masters/getRecords", payload);
            if (responseData.code === 1) {
                setTotalCount(responseData.count);
                responseData.data.forEach((element, index) => {
                    element.index = page * pageSize + (index + 1);
                });
                const sortedData = responseData.data.sort((a, b) => b.index - a.index);
                setData(sortedData);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreate = () => {
        navigate("/action-master-create");
    };

    const handleEdit = (id) => {
        navigate(`/action-master-create/${id}`);
    };

    const handleView = (id) => {
        navigate(`/action-master-view/${id}`);
    };

    const nextToPages = () => {
        setPage(page + 1);
    };

    const handleSort = (key, direction) => {
        setSortConfig({ key, direction });
    };

    const handlePageSizeChange = (newPageSize) => {
        setPageSize(newPageSize);
        setPage(0); // Reset to first page
    };

    const previousToPages = () => {
        setPage(page - 1);
    };

    const getSearchInputData = (inputValue) => {
        setSearchKeyword(inputValue);  // Update search query
    };

    const columns = useMemo(
        () => [
            {
                Header: "Sr.No.",
                accessor: "index",
            },
            {
                Header: "Actions Name",
                accessor: "full_name",
            },
            {
                Header: "Is Active",
                accessor: "is_active",
                Cell: ({ value }) => (value === "Active" ? "Active" : "Inactive"),
            },
            {
                Header: "Actions",
                accessor: "",
                Cell: ({ row }) => (
                    <div>
                        <Button className="btn btn-primary btn-sm" onClick={() => handleEdit(row.original.id)}>
                            Edit
                        </Button>
                        <Button className="btn btn-success btn-sm" style={{marginLeft:"5px"}} onClick={() => handleView(row.original.id)}>
                            View
                        </Button>
                    </div>
                ),
            },
        ],
        []
    );

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                        <Breadcrumbs title="Actions List" breadcrumbItems={breadcrumbItems} />
                        <Button color="primary" className="waves-effect waves-light me-1" onClick={handleCreate} style={{ marginLeft: "auto" }}>
                            Create Actions
                        </Button>
                    </div>

                    <Card>
                        <CardBody>
                            <div>
                                <BasicDatatable
                                    columns={columns}
                                    data={data}
                                    page={page}
                                    pageSize={pageSize}
                                    nextToPage={nextToPages}
                                    previousToPage={previousToPages}
                                    totalCount={totalCount}
                                    onSearch={getSearchInputData} // Trigger the search when it changes
                                    onSort={handleSort}
                                    onPageSizeChange={handlePageSizeChange}
                                    pageSizeOptions={[5, 10, 15, 25]} // Custom page size options
                                />
                            </div>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    );
}
