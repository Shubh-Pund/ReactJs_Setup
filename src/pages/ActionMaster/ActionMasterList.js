import React, { useMemo, useCallback } from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Card, CardBody, Button, Container } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { generateColumns } from "../../helpers/columnUtils";
import useFetchData from "../../helpers/useFetchData";
import usePagination from "../../helpers/usePagination";
import BasicDatatable from "../../basic_components/Components/BasicDatatable";

const breadcrumbItems = [];
export default function ActionMasterList() {
    const navigate = useNavigate();
    const {
        page,
        pageSize,
        sortConfig,
        onPageChange,
        handleSort,
        handlePageSizeChange,
        setPage,
    } = usePagination();

    const {
        data,
        isLoading,
        getSearchInputData, // Updated to include getSearchInputData
        totalCount,
    } = useFetchData(
        useMemo(() => ({
            modelName: "users",
            fetchCountandDateSeparately: true,
            subQuery: false,
            whereCondition: {
                is_active: "Active",
            },
            search: {
                field: ["users.full_name"],
            },
            orderByModel: {
                field: "users.full_name",
                order: sortConfig.direction,
            },
            relations: [
                {
                    module: "free_trials",
                    moduleAs: "free_trials",
                    required: true,
                },
                {
                    module: "user_subscriptions",
                    moduleAs: "user_subscriptions",
                    required: true,
                },
            ],
        }), [sortConfig, page, pageSize]), // Dependencies
        page,
        pageSize,
    );

    const handleCreate = () => navigate(navigatePage.create);

    const navigatePage = { create: "/city-create", edit: "/city-create" };

    const handleEdit = useCallback((id) => {
        navigate(navigatePage.edit + "/" + id);
    }, [navigate, navigatePage.edit]);

    const columnData = useMemo(() => [
        { label: "sr.no", value: "index" },
        { label: "Full Name", value: "full_name" },
        { label: "Status", value: "is_active" },
        { label: "Action", value: "actions" },
    ], []);

    const columns = useMemo(() => generateColumns(data, columnData, handleEdit), [data, columnData, handleEdit]);

    const handlePageSizeChangeWrapper = useCallback((newSize) => {
        if (newSize !== pageSize) {
            handlePageSizeChange(newSize, totalCount);
            setPage(0); // Reset to first page when page size changes
        }
    }, [handlePageSizeChange, pageSize, totalCount, setPage]);

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                        <Breadcrumbs title="Actions List" breadcrumbItems={breadcrumbItems} />
                        <Button
                            color="primary"
                            className="waves-effect waves-light me-1"
                            onClick={handleCreate}
                            style={{ marginLeft: "auto" }}
                        >
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
                                    isLoading={isLoading}
                                    pageSize={pageSize}
                                    nextToPage={() => onPageChange(page + 1)}
                                    previousToPage={() => onPageChange(page - 1)}
                                    totalCount={totalCount}
                                    onSearch={getSearchInputData} // Pass search input handler
                                    onSort={handleSort}
                                    onPageSizeChange={handlePageSizeChangeWrapper}
                                    pageSizeOptions={[1, 2, 3, 5, 10, 20, 50]}
                                    onPageChange={onPageChange}
                                    serverSideSorting={true}
                                    is_export = {true} 
                                    exportFileName="MyCustomFileName.xlsx" // Pass the file name here
                                />
                            </div>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    );
}

