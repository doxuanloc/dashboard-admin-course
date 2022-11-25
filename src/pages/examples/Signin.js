import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";

import {
  Col,
  Row,
  Form,
  Card,
  Button,
  FormCheck,
  Container,
  InputGroup,
} from "@themesberg/react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import BgImage from "../../assets/img/illustrations/signin.svg";
import axios from "../../api/axios";
import { useHistory } from "react-router-dom";

const LOGIN_ADMIN_URL = "auth/login";

export default () => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  let history = useHistory();

  const handleSignIn = async (e) => {
    setLoading(true);
    e.preventDefault();
    await axios
      .post(
        LOGIN_ADMIN_URL,
        JSON.stringify({ username: username, password: password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        localStorage.setItem("tokenAdmin", res.data.data.token.accessToken);
        localStorage.setItem("nameAdmin", res.data.data.user.fullName);
        toast.success("Đăng Nhập Thành Công!", {
          position: toast.POSITION.TOP_CENTER,
        });
        history.push("/");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setPassword("");
        setUserName("");
      });
    setLoading(false);
  };

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row
            className="justify-content-center form-bg-image"
            style={{ backgroundImage: `url(${BgImage})` }}
          >
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Đăng Nhập Cho ADMIN</h3>
                </div>
                <Form className="mt-4">
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control
                        onChange={(e) => setUserName(e.target.value)}
                        autoFocus
                        required
                        type="email"
                        placeholder="example@email.com"
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Mật Khẩu</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          type="password"
                          placeholder="Mật Khẩu"
                        />
                      </InputGroup>
                    </Form.Group>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check type="checkbox">
                        <FormCheck.Input id="defaultCheck5" className="me-2" />
                        <FormCheck.Label
                          htmlFor="defaultCheck5"
                          className="mb-0"
                        >
                          {" "}
                          Ghi Nhớ Mật Khẩu
                        </FormCheck.Label>
                      </Form.Check>
                      <Card.Link className="small text-end">
                        Quên Mật Khẩu
                      </Card.Link>
                    </div>
                  </Form.Group>
                  {!loading ? (
                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100"
                      onClick={(e) => handleSignIn(e)}
                    >
                      Đăng Nhập
                    </Button>
                  ) : (
                    <Button
                      className="w-100"
                      type="button"
                      disabled
                      variant="primary"
                    >
                      <span
                        className="spinner-grow spinner-grow-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>{" "}
                      Đang Đăng Nhập . . .
                    </Button>
                  )}
                </Form>
              </div>
            </Col>
          </Row>
          <ToastContainer />
        </Container>
      </section>
    </main>
  );
};
