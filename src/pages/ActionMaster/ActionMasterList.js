import React, { useMemo, useState, useEffect } from "react";
import TableContainer from "../../components/Common/TableContainer";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Card, CardBody, Button, Container } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../services/fetchData";


const breadcrumbItems = [];
export default function ActionMasterList() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [channelTypeId, setChannelTypeId] = useState([]);

    useEffect(() => {
        getData();
      }, [searchKeyword, page, pageSize, channelTypeId]);
    
      const getData = async () => {
        try {
          const payload = {
            modelName: "service_masters",
            pagination: {
              page: page + 1,
              pageSize: pageSize,
            },
            search: {
              field_name: ["service_name"],
              searchKeyword: searchKeyword,
            },    
            channel_id: channelTypeId,
            whereCondition: {
              is_active: 1,
            },
          };
          const responseData = await fetchData("getMasterList", payload);
          if (responseData.code == 1) {            
            // responseData.data.forEach((element, index) => {
            //   element.index = index + 1;
            // });
            setTotalCount(responseData.count);
            responseData.data.forEach((element, index) => {
              element.index = page * pageSize + (index + 1);
            });
            const sortedData = responseData.data.sort((a, b)=>b.index - a.index);  
            setData(sortedData);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }finally{
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
     
      const previousToPages = () => {
        setPage(page - 1);
      };
     
      const handlePageSizeChange = (data) => {
        setPageSize(data);
      };
    
      const getSearchInputData = (inputValue) => {
        setSearchKeyword(inputValue);
      };
    
      const getChannelTypeId = (channeId) => {
        setChannelTypeId(channeId);
      };
    
      const columns = useMemo(
        () => [
          {
            Header: "Sr.No.",
            accessor: "index",
            disableFilters: true,
            filterable: false,
          },
          {
            Header: "Actions Name",
            accessor: (row) => (row.service_name ? row.service_name : "-"),
            disableFilters: true,
            filterable: false,
          },
          {
            Header: "Is Active",
            accessor: "is_active",
            disableFilters: true,
            filterable: false,
            Cell: ({ value }) => (value === 0 ? "Inactive" : "Active"),
          },
          {
            Header: "Actions",
            accessor: "actions",
            disableFilters: true,
            filterable: false,
            Cell: ({ row }) => (
              <div className="d-flex">
                <Button
                  color="primary"
                  className="me-2"
                  onClick={() => handleEdit(row.original.id)}
                >
                  <i className="fas fa-edit"></i>
                </Button>
                <Button
                  color="secondary"
                  onClick={() => handleView(row.original.id)}
                >
                  <i className="fas fa-eye"></i>
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}>
            <Breadcrumbs
              title="Actions List"
              breadcrumbItems={breadcrumbItems}
            />
            <Button
              color="primary"
              className="waves-effect waves-light me-1"
              onClick={handleCreate}
              style={{ marginLeft: "auto" }}>
              Create Actions
            </Button>
          </div>

          <Card>
            <CardBody>
              <TableContainer
                columns={columns || []}
                data={data || []}
                isPagination={false}
                isGlobalFilter={false}
                iscustomPageSize={false}
                isBordered={false}
                customPageSize={10}
                isLoading={isLoading}
                pageIndexProp={page}
                totalCount={totalCount}
                onPageSizeChange={handlePageSizeChange}
                nextToPage={nextToPages}
                previousToPage={previousToPages}
                onSearchInputData={getSearchInputData}
                onChannelDropselect={getChannelTypeId}
              />
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}
