import React from "react";
import { Row, Spinner } from "reactstrap";

export function LoaderCreatePage() {
  return (
    <Row
      style={{
        display: "flex",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Spinner size={30} className="me-2" color="primary" />
    </Row>
  );
}

export function LoaderListPage() {
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "95%",
        marginTop: "10px",
      }}>
      <div>
        <Spinner size={30} className="me-2" color="primary" />
      </div>
    </div>
  );
}

export function LoaderDownloadMedia() {
  return  <Spinner size={30} className="me-2" color="success" />
 
}
