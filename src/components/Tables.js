import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-bootstrap/Modal";
import {
  faAngleDown,
  faAngleUp,
  faCheckCircle,
  faEllipsisH,
  faEye,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Nav,
  Card,
  Image,
  Button,
  Table,
  Dropdown,
  ProgressBar,
  ButtonGroup,
} from "@themesberg/react-bootstrap";

import { pageTraffic, pageRanking } from "../data/tables";
import axios from "../api/axios";
import { useState } from "react";
import Modals from "../pages/components/Modals";
import { useHistory } from "react-router-dom";
import Pagination from "./Pagination/Pagination";

import { ToastContainer, toast } from "react-toastify";
import ModalDetailOrders from "../pages/components/ModalDetailOrder";
const DATA_COURSE_URL = "/courses";

const ValueChange = ({ value, suffix }) => {
  const valueIcon = value < 0 ? faAngleDown : faAngleUp;
  const valueTxtColor = value < 0 ? "text-danger" : "text-success";

  return value ? (
    <span className={valueTxtColor}>
      <FontAwesomeIcon icon={valueIcon} />
      <span className="fw-bold ms-1">
        {Math.abs(value)}
        {suffix}
      </span>
    </span>
  ) : (
    "--"
  );
};

export const PageVisitsTable = ({ listUsers }) => {
  // Get current posts
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = listUsers.slice(indexOfFirstPost, indexOfLastPost);
  const TableRow = (props) => {
    const { email, isPurchased, phoneNumber } = props;

    const textColor = isPurchased ? "text-success" : "text-info";

    return (
      <>
        <tr>
          <th scope="row">{email}</th>
          <td className={`${textColor} me-3`}>
            {isPurchased ? "Học Viên" : "Khách"}
          </td>
          <td>{phoneNumber}</td>
        </tr>
      </>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <h5>User Đã Đăng Kí Tài Khoản Gần Đây </h5>
          </Col>
          <Col className="text-end">
            <Button variant="secondary" size="sm">
              Xem Tất Cả
            </Button>
          </Col>
        </Row>
      </Card.Header>
      <Table responsive className="align-items-center table-flush">
        <thead className="thead-light">
          <tr>
            <th scope="col">Email</th>
            <th scope="col">Thành Viên</th>
            <th scope="col">Số Điện Thoại</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts?.map((pv) => (
            <TableRow key={pv._id} {...pv} />
          ))}
        </tbody>
        <Pagination
          currentPage={currentPage}
          postsPerPage={postsPerPage}
          totalPosts={listUsers.length}
          paginate={paginate}
        />
      </Table>
    </Card>
  );
};

export const PageTrafficTable = () => {
  const TableRow = (props) => {
    const {
      id,
      source,
      sourceIcon,
      sourceIconColor,
      sourceType,
      category,
      rank,
      trafficShare,
      change,
    } = props;

    return (
      <tr>
        <td>
          <Card.Link href="#" className="text-primary fw-bold">
            {id}
          </Card.Link>
        </td>
        <td className="fw-bold">
          <FontAwesomeIcon
            icon={sourceIcon}
            className={`icon icon-xs text-${sourceIconColor} w-30`}
          />
          {source}
        </td>
        <td>{sourceType}</td>
        <td>{category ? category : "--"}</td>
        <td>{rank ? rank : "--"}</td>
        <td>
          <Row className="d-flex align-items-center">
            <Col xs={12} xl={2} className="px-0">
              <small className="fw-bold">{trafficShare}%</small>
            </Col>
            <Col xs={12} xl={10} className="px-0 px-xl-1">
              <ProgressBar
                variant="primary"
                className="progress-lg mb-0"
                now={trafficShare}
                min={0}
                max={100}
              />
            </Col>
          </Row>
        </td>
        <td>
          <ValueChange value={change} suffix="%" />
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm mb-4">
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">#</th>
              <th className="border-0">Traffic Source</th>
              <th className="border-0">Source Type</th>
              <th className="border-0">Category</th>
              <th className="border-0">Global Rank</th>
              <th className="border-0">Traffic Share</th>
              <th className="border-0">Change</th>
            </tr>
          </thead>
          <tbody>
            {pageTraffic.map((pt) => (
              <TableRow key={`page-traffic-${pt.id}`} {...pt} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const RankingTable = () => {
  const TableRow = (props) => {
    const {
      country,
      countryImage,
      overallRank,
      overallRankChange,
      travelRank,
      travelRankChange,
      widgetsRank,
      widgetsRankChange,
    } = props;

    return (
      <tr>
        <td className="border-0">
          <Card.Link href="#" className="d-flex align-items-center">
            <Image
              src={countryImage}
              className="image-small rounded-circle me-2"
            />
            <div>
              <span className="h6">{country}</span>
            </div>
          </Card.Link>
        </td>
        <td className="fw-bold border-0">{overallRank ? overallRank : "-"}</td>
        <td className="border-0">
          <ValueChange value={overallRankChange} />
        </td>
        <td className="fw-bold border-0">{travelRank ? travelRank : "-"}</td>
        <td className="border-0">
          <ValueChange value={travelRankChange} />
        </td>
        <td className="fw-bold border-0">{widgetsRank ? widgetsRank : "-"}</td>
        <td className="border-0">
          <ValueChange value={widgetsRankChange} />
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">Country</th>
              <th className="border-0">All</th>
              <th className="border-0">All Change</th>
              <th className="border-0">Travel & Local</th>
              <th className="border-0">Travel & Local Change</th>
              <th className="border-0">Widgets</th>
              <th className="border-0">Widgets Change</th>
            </tr>
          </thead>
          <tbody>
            {pageRanking.map((r) => (
              <TableRow key={`ranking-${r.id}`} {...r} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const TransactionsTable = () => {
  const DATA_ORDER_URL = "/orders";

  const [dataOrder, setDataOrder] = useState([]);

  const [totalTransactions, setTotalTransactions] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [dataDetailOrder, setDataDetailOrder] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const history = useHistory();

  const token = localStorage.getItem("tokenAdmin");

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = dataOrder.slice(indexOfFirstPost, indexOfLastPost);

  const getDataAllOrder = async () => {
    setLoading(true);
    await axios
      .get(DATA_ORDER_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDataOrder(res?.data?.data);
        setTotalTransactions(res?.data?.data.length);
      })
      .catch((err) => {
        if (err.response.data.message === "Unauthorized") {
          history.push("/sign-in");
        }
      });
    setLoading(false);
  };

  useEffect(() => {
    getDataAllOrder();
  }, []);

  const getDetailOrder = async (id) => {
    setLoading(true);
    await axios
      .get(`${DATA_ORDER_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setShowModalDetail(true);
        setDataDetailOrder(res?.data?.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

  const handleOrderCompleted = async (id) => {
    // await axios
    //   .post(`orders/${id}/complete`, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then((res) => {
    //     toast.success(res?.data?.data?.message);
    //   })
    //   .catch((err) => {
    //     toast.error(err?.response?.data?.message);
    //   });

    var config = {
      method: "post",
      url: `orders/${id}/complete`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        toast.success(response?.data?.data?.message);
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });
  };

  return (
    <div>
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body className="pt-0">
          <Table hover className="user-table align-items-center">
            <thead>
              <tr>
                <th className="border-bottom">#</th>
                <th className="border-bottom">Tên Học Viên</th>
                <th className="border-bottom">Ngày Tạo</th>
                <th className="border-bottom">Ngày Thay Đổi Trạng Thái</th>
                <th className="border-bottom">Tổng Đơn Hàng</th>
                <th className="border-bottom">Trạng Thái Đơn Hàng</th>
                <th className="border-bottom">Chỉnh Sửa</th>
              </tr>
            </thead>
            {loading && (
              <>
                <div className="spinner-grow text-info" role="status"></div>
                <div className="spinner-grow text-info" role="status"></div>
                <div className="spinner-grow text-info" role="status"></div>
              </>
            )}
            <tbody>
              {currentPosts?.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>
                    <span className="fw-normal">
                      {item.customerInfo.fullName}
                    </span>
                  </td>
                  <td>
                    <span className="fw-normal">{item.createdAt}</span>
                  </td>
                  <td>
                    <span className="fw-normal">{item.updatedAt}</span>
                  </td>
                  <td>
                    <span className="fw-normal">{item.totalPrice}</span>
                  </td>
                  <td>
                    <span
                      className={`fw-normal text-${
                        item.status === "COMPLETED"
                          ? "success"
                          : item.status === "PENDING"
                          ? "warning"
                          : item.status === "CANCELED"
                          ? "danger"
                          : "primary"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <Dropdown as={ButtonGroup}>
                      <Dropdown.Toggle
                        as={Button}
                        split
                        variant="link"
                        className="text-dark m-0 p-0"
                      >
                        <span className="icon icon-sm">
                          <FontAwesomeIcon
                            icon={faEllipsisH}
                            className="icon-dark"
                          />
                        </span>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>
                          <button
                            type="button"
                            className="btn btn-info"
                            onClick={() => getDetailOrder(item._id)}
                          >
                            <FontAwesomeIcon icon={faEye} className="me-2" />{" "}
                            Chi Tiết Đơn Hàng
                          </button>
                        </Dropdown.Item>
                        {item.status !== "COMPLETED" ? (
                          <Dropdown.Item className="text-danger">
                            <button
                              type="button"
                              className="btn btn-outline-warning w-100"
                              onClick={() => handleOrderCompleted(item._id)}
                            >
                              <FontAwesomeIcon
                                icon={faCheckCircle}
                                className="me-2"
                              />{" "}
                              Đã Thanh Toán
                            </button>
                          </Dropdown.Item>
                        ) : (
                          ""
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
            <Pagination
              currentPage={currentPage}
              postsPerPage={postsPerPage}
              totalPosts={dataOrder.length}
              paginate={paginate}
            />
            <small className="fw-bold mt-3">
              <b>{totalTransactions}</b> <b>Đơn Hàng</b>
            </small>
          </Card.Footer>
          <ModalDetailOrders
            setShowModalDetail={setShowModalDetail}
            showModalDetail={showModalDetail}
            dataDetailOrder={dataDetailOrder}
          />
          <ToastContainer />
        </Card.Body>
      </Card>
    </div>
  );
};

export const DataCourseTable = () => {
  const [dataCourses, setDataCourses] = useState([]);
  const [numPage, setNumPage] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);
  const token = localStorage.getItem("tokenAdmin");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [showModals, setShowModals] = useState(false);
  const [dataDetail, setDataDetail] = useState();
  const [idCourseDel, setIdCourseDel] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const history = useHistory();

  const handleClose = () => setConfirmDelete(false);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = dataCourses.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getDataAllCourses = async () => {
    setLoading(true);
    await axios
      .get(DATA_COURSE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDataCourses(res.data.data);
        setTotalCourses(res.data.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

  useEffect(() => {
    getDataAllCourses();
  }, []);

  const showConfirmDel = (id) => {
    setConfirmDelete(true);
    setIdCourseDel(id);
  };

  const deleteCourse = async () => {
    await axios
      .delete(`${DATA_COURSE_URL}/${idCourseDel}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        toast.success(res?.data?.message);
        history.push("/course");
      })
      .catch((err) => {
        if (err.response.data.message === "Unauthorized") {
          history.push("/sign-in");
        }
        toast.error(err?.response?.data?.message);
      });
    setDataCourses(dataCourses);
    setConfirmDelete(false);
  };

  const showDetailCourse = async (id) => {
    setLoading(true);
    await axios
      .get(`${DATA_COURSE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDataDetail(res.data.data);
      })
      .catch((err) => {
        if (err.response.data.message === "Unauthorized") {
          history.push("/sign-in");
        }
      });
    setLoading(false);
    setShowModals(true);
  };

  return (
    <div>
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <ToastContainer />
        <Card.Body className="pt-0">
          <Table hover className="user-table align-items-center">
            <thead>
              <tr>
                <th className="border-bottom fs-6">#</th>
                <th className="border-bottom fs-6">Tên Khóa Học</th>
                <th className="border-bottom fs-6">Ngày Tạo</th>
                <th className="border-bottom fs-6">Bài Học</th>
                <th className="border-bottom fs-6">Level</th>
                <th className="border-bottom fs-6">Giá Khóa Học</th>
                <th className="border-bottom fs-6">Tác Vụ</th>
              </tr>
            </thead>
            {loading && (
              <div className="d-flex justify-content-center text-warning">
                <div className="spinner-grow text-info" role="status"></div>
                <div className="spinner-grow text-info" role="status"></div>
                <div className="spinner-grow text-info" role="status"></div>
              </div>
            )}
            <tbody>
              {currentPosts?.map((item, index) => (
                <tr key={item._id}>
                  <td>
                    <button
                      type="button"
                      className="btn btn-outline-info"
                      onClick={() => showDetailCourse(item._id)}
                    >
                      {index + 1}
                    </button>
                  </td>
                  <td>
                    <span className="fs-5">{item.title}</span>
                  </td>
                  <td>
                    <span className="fs-5">{item.createdAt}</span>
                  </td>
                  <td>
                    <span className="fs-5">{item.numberOfLessons}</span>
                  </td>
                  <td>
                    <span
                      className={`fs-5 text-${
                        item.level === "BASIC"
                          ? "info"
                          : item.level === "ADVANCE"
                          ? "success"
                          : item.level === "PRO"
                          ? "danger"
                          : "warning"
                      }`}
                    >
                      {item.level}
                    </span>
                  </td>
                  <td>
                    <span className="fs-5">{item.price} đ</span>
                  </td>
                  <td>
                    <div>
                      <Modals
                        showModals={showModals}
                        setShowModals={setShowModals}
                        dataDetail={dataDetail}
                      />
                    </div>

                    <div>
                      <Modal
                        show={confirmDelete}
                        onHide={handleClose}
                        animation={false}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Chú Ý!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          Bạn Có Chắc Là Muốn Xóa Khóa Học Này!
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="warning" onClick={handleClose}>
                            Đóng
                          </Button>
                          <Button variant="secondary" onClick={deleteCourse}>
                            Xác Nhận
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </div>

                    <Dropdown as={ButtonGroup}>
                      <button
                        type="button"
                        className="btn btn-danger w-100"
                        onClick={() => showConfirmDel(item._id)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} className="me-2" />{" "}
                        Xóa
                      </button>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
            <Nav>
              <Pagination
                currentPage={currentPage}
                postsPerPage={postsPerPage}
                totalPosts={dataCourses.length}
                paginate={paginate}
              />
            </Nav>
            <small className="fw-bold mt-3">
              <b>{totalCourses}</b> <b>Khóa Học</b>
            </small>
          </Card.Footer>
        </Card.Body>
      </Card>
    </div>
  );
};
