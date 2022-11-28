import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faSignOutAlt,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import {
  Nav,
  Image,
  Navbar,
  Dropdown,
  Container,
} from "@themesberg/react-bootstrap";

import { useHistory } from "react-router-dom";

export default (props) => {
  let history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    history.push("/sign-in");
  };

  return (
    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
      <Container fluid className="px-0">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex align-items-center"></div>
          <Nav className="align-items-center">
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                <div className="media d-flex align-items-center">
                  <Image
                    src="https://nauphache.com/wp-content/uploads/2022/05/nau-pha-che-09-1024x721.png"
                    className="user-avatar md-avatar w-10 h-10"
                  />
                  <p className="mb-0 fs-2 fw-bold">Admin</p>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
                <Dropdown.Item className="fw-bold">
                  <FontAwesomeIcon icon={faUserCircle} className="me-2" /> Hồ Sơ
                  Cá Nhân
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold">
                  <FontAwesomeIcon icon={faCog} className="me-2" /> Cài Đặt
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold">
                  <FontAwesomeIcon icon={faUserShield} className="me-2" /> Hỗ
                  Trợ
                </Dropdown.Item>

                <Dropdown.Divider />

                <Dropdown.Item className="fw-bold">
                  <button
                    type="button"
                    className="btn btn-outline-warning"
                    onClick={handleLogout}
                  >
                    <FontAwesomeIcon
                      icon={faSignOutAlt}
                      className="text-danger me-2"
                    />{" "}
                    Đăng Xuất
                  </button>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};
