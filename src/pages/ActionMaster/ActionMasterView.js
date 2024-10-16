import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Container,
  Button,
  Spinner,
  Row,
  Col,
  Badge,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useNavigate, useParams } from "react-router-dom";
import { fetchData } from "../../services/fetchData";

const breadcrumbItems = [];

export default function ActionMasterView() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData(id);
  }, [id]);

  const handleBackClick = () => {
    navigate("/action-master-list");
  };

  const getData = async (id) => {
    try {
      let payload = {
        modelName: "service_masters",
        whereCondition: {
          is_active: 1,
        },
      };

      if (id) {
        payload.whereCondition = { id: id };
      }

      const responseData = await fetchData("getMasterList", payload);
      if (responseData.data && responseData.data.length > 0) {
        if (id) {
          setData(responseData.data[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Actions Service View" breadcrumbItems={breadcrumbItems} />
          
          {isLoading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
              <Spinner color="primary" style={{ width: "3rem", height: "3rem" }} />
            </div>
          ) : (
            <Card className="shadow-lg rounded" style={{ overflow: "hidden" }}>
              {/* Gradient Header */}
              <CardHeader style={{ color: "#fff" }}>
                <h4 className="mb-0">Service Information</h4>
              </CardHeader>
              <CardBody className="p-4">
                {/* Section 1: Service Details */}
                <Row className="mb-4">
                  <Col xs={12} md={6}>
                    <h6 className="text-muted">Service ID</h6>
                    <p className="text-dark font-weight-bold">{data.id || "N/A"}</p>
                  </Col>
                  <Col xs={12} md={6}>
                    <h6 className="text-muted">Service Name</h6>
                    <p className="text-dark font-weight-bold">{data.service_name || "N/A"}</p>
                  </Col>
                </Row>
                {/* Section Divider */}
                <hr style={{ margin: "1rem 0", borderColor: "#eee" }} />
                {/* Section 2: Status */}
                <Row className="mb-3">
                  <Col xs={12} md={6}>
                    <h6 className="text-muted">Status</h6>
                    <Badge color={data.is_active === 1 ? "success" : "danger"} pill>
                      {data.is_active === 1 ? "Active" : "Inactive"}
                    </Badge>
                  </Col>
                </Row>

                {/* No Data Message */}
                {!data.id && (
                  <div className="text-center text-muted">
                    <p>No data available for this service.</p>
                  </div>
                )}
              </CardBody>

              {/* Footer with Button */}
              <CardFooter className="d-flex justify-content-end" style={{ backgroundColor: "#f8f9fa" }}>
                <Button
                  color="primary"
                  onClick={handleBackClick}
                  style={{ transition: "background-color 0.3s ease", boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)" }}
                  className="px-4 py-2"
                >
                  Back
                </Button>
              </CardFooter>
            </Card>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
}
