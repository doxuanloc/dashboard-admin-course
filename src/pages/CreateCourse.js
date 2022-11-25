import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faCartArrowDown,
  faChevronDown,
  faClipboard,
  faCommentDots,
  faFileAlt,
  faRocket,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Button, Dropdown } from "@themesberg/react-bootstrap";
import { ProfileCardWidget } from "../components/Widgets";
import { GeneralInfoForm } from "../components/Forms";
import { useHistory } from "react-router-dom";

export default () => {
  let history = useHistory();
  useEffect(() => {
    const token = localStorage.getItem("tokenAdmin");
    if (!token) {
      history.push("/sign-in");
    }
  });

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <Dropdown>
          <Dropdown.Toggle
            as={Button}
            variant="secondary"
            className="text-dark me-2"
          >
            <FontAwesomeIcon icon={faBoxOpen} className="me-2" />{" "}
            <span>Khóa Học</span>
          </Dropdown.Toggle>
          <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
            <Dropdown.Item>
              <FontAwesomeIcon icon={faFileAlt} className="me-2" /> Tài Liệu
            </Dropdown.Item>
            <Dropdown.Item>
              <FontAwesomeIcon icon={faCommentDots} className="me-2" /> Các Khóa
              Học Đã Đăng
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <div className="d-flex">
          <Dropdown>
            <Dropdown.Toggle as={Button} variant="primary">
              <FontAwesomeIcon icon={faClipboard} className="me-2" /> Báo Cáo{" "}
              <span className="icon icon-small ms-1">
                <FontAwesomeIcon icon={faChevronDown} />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-1">
              <Dropdown.Item>
                <FontAwesomeIcon icon={faBoxOpen} className="me-2" /> Khóa Học
              </Dropdown.Item>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faStore} className="me-2" /> Người Dùng
              </Dropdown.Item>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faCartArrowDown} className="me-2" /> Đơn
                Hàng
              </Dropdown.Item>

              <Dropdown.Divider />

              <Dropdown.Item>
                <FontAwesomeIcon
                  icon={faRocket}
                  className="text-success me-2"
                />{" "}
                Tổng Quan Báo Cáo
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <Row>
        <Col xs={12} xl={8}>
          <GeneralInfoForm />
        </Col>

        <Col xs={12} xl={4}>
          <Row>
            <Col xs={12}>
              <ProfileCardWidget />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
