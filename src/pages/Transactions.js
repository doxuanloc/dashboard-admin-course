import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCog } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Button,
  ButtonGroup,
  Breadcrumb,
  Dropdown,
} from "@themesberg/react-bootstrap";

import { TransactionsTable } from "../components/Tables";

export default () => {
  const handleFiller = (e) => {
    console.log(e);
  };
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
          ></Breadcrumb>
          <h4>Danh Sách Giao Dịch</h4>
          <p className="mb-0">Thông Tin Trang Khóa Học</p>
        </div>
      </div>
      {/* 
      <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">
          <Col xs={4} md={2} xl={1} className="ps-md-0 text-end">
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle
                split
                as={Button}
                variant="link"
                className="text-dark m-0 p-0"
              >
                <span className="icon icon-sm icon-gray">
                  <FontAwesomeIcon icon={faCog} />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-ml dropdown-menu-right">
                <Dropdown.Item className="fw-bold text-dark" disabled>
                  Xem
                </Dropdown.Item>
                <Dropdown.Item
                  className="d-flex fw-bold"
                  onClick={() => handleFiller("PENDING")}
                >
                  PENDING
                  <span className="icon icon-small ms-auto">
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                </Dropdown.Item>
                <Dropdown.Item
                  className="fw-bold"
                  onClick={() => handleFiller("COMPLETED")}
                >
                  COMPLETED
                </Dropdown.Item>
                <Dropdown.Item
                  className="fw-bold"
                  onClick={() => handleFiller("CANCELED")}
                >
                  CANCELED
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </div> */}

      <TransactionsTable />
    </>
  );
};
