import React, { useState, useEffect } from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Row, Col, Card, CardBody, Button, Label, Container } from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { fetchData } from "../../../services/fetchData";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Asterisk from "../../Asterisk/Asterisk";
import { LoaderCreatePage } from "../../Loader/Loader";
import { formContentContainer, loaderOverlay } from "../../../Style/loaderOverly";


const EnvironmentCreate = ({ router }) => {
  const navigate = useNavigate();
  let { id } = useParams();
  const [breadcrumbItems] = useState([]);
  const [loadingData, setLoadingData] = useState(id ? true : false);

  const [formData, setFormData] = useState({
    environment: "",
    firstName:"",
    is_active: 1,
  });

  useEffect(() => {
    getData(id);
  }, []);

  const getData = async (id) => {
    try {
      let payload = {
        modelName: "environment_masters",
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
          setFormData(responseData.data[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleTextChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? (checked == true ? 1 : 0) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.environment) {
      return toast.warning("All fields are required!");
    }
    try {
      setLoadingData(true);
      var payload = {
        modelName: "environment_masters",
        inputData: formData,
      };
      if (id) {
        payload.id = id;
      }
      const responseData = await fetchData("createAndUpdateMaster", payload);
      if (responseData.code == 1) {
        toast.success("Environment saved successfully!");
        navigate("/environment-list");
      } else {
        toast.error("Error while saving Environment!");
        navigate("/environment-list");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoadingData(false)
    }
  };

  const handleBackClick = () => {
    navigate("/environment-list");
  };

   return (
     <React.Fragment>
       <div className="page-content">
         <Container fluid={true}>
           <Breadcrumbs
             title="CREATE ENVIRONMENT"
             breadcrumbItems={breadcrumbItems}
           />
           <Row>
             <Col xl="12">
               <Card>
                 <CardBody>
                   <div style={formContentContainer}>
                     <AvForm
                       onSubmit={handleSubmit}
                       className="needs-validation">
                       <Row>
                         <Col md="6">
                           <div className="mb-3">
                             <Label className="form-label">
                               Environment Name
                             </Label>
                             <AvField
                               name="environment"
                               placeholder="Environment name"
                               type="text"
                               errorMessage="Enter Environment Name"
                               className="form-control"
                               onChange={handleTextChange}
                               validate={{
                                 required: { value: true },
                               }}
                               value={formData.environment}
                             />
                           </div>
                         </Col>
                         <Col md="6">
                           <div className="mb-3">
                             <Label className="form-label">
                               First Name
                               {/* <Asterisk /> */}
                             </Label>
                             <AvField
                               name="firstName"
                               placeholder="First Name"
                               type="text"
                               errorMessage="Enter Environment Name"
                               className="form-control"
                               onChange={handleTextChange}
                               validate={{
                                 required: { value: true },
                               }}
                               value={formData.firstName}
                             />
                           </div>
                         </Col>
                       </Row>
                       <Row className="mt-3">
                         <Col lg="12">
                           <div className="form-check mb-3">
                             <input
                               className="form-check-input"
                               type="checkbox"
                               value={formData.is_active}
                               id="invalidCheck"
                               name="is_active"
                               checked={formData.is_active}
                               onChange={handleTextChange}
                               required=""
                             />
                             <label
                               className="form-check-label"
                               htmlFor="invalidCheck">
                               Is Active
                             </label>
                           </div>
                         </Col>
                       </Row>
                       <Button
                         color="primary"
                         type="submit"
                         className="waves-effect waves-light me-1">
                         {id ? "Update" : "Submit"}
                       </Button>
                       <Button
                         color="primary"
                         className="waves-effect waves-light me-1"
                         onClick={handleBackClick}>
                         Back
                       </Button>
                     </AvForm>
                     {/* Loader Overlay */}
                     {loadingData && (
                       <div style={loaderOverlay}>
                         <LoaderCreatePage />
                       </div>
                     )}
                   </div>
                 </CardBody>
               </Card>
             </Col>
           </Row>
         </Container>
       </div>
     </React.Fragment>
   );
};

export default EnvironmentCreate;
