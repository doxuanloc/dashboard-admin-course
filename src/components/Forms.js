import React, { useEffect, useState } from "react";

import ImageUploading from "react-images-uploading";
import { WithContext as ReactTags } from "react-tag-input";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FormData from "form-data";

import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";
import axios from "../api/axios";
import { useHistory } from "react-router-dom";

export const GeneralInfoForm = () => {
  const [images, setImages] = useState();
  const [lessonsFormList, setLessonsFormList] = useState([
    { title: "", url: "", isTrial: false },
  ]);

  const [titleCourse, setTitleCourse] = useState("");
  const [level, setLevel] = useState("");
  const [highlights, setHightLights] = useState([]);
  const [overview, setOverview] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [catalog, setCatalog] = useState("");
  const [price, setPrice] = useState();
  const [durationInSeconds, setDurationInSeconds] = useState(0);
  const [loading, setLoading] = useState(false);
  const [document, setDocument] = useState();
  const token = localStorage.getItem("tokenAdmin");

  const history = useHistory();
  const nameAdmin = localStorage.getItem("nameAdmin");

  const URL_COURSER = "/courses";
  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  const handleDeleteHighlights = (i) => {
    setHightLights(highlights.filter((highlight, index) => index !== i));
  };

  const handleAdditionHighlights = (highlight) => {
    setHightLights([...highlights, highlight]);
  };

  const onChangeImg = async (e) => {
    console.log(e.target.files[0]);
    var data = new FormData();
    data.append(
      "file",

      e.target.files[0]
    );
    data.append("name", "ahihi");

    var config = {
      method: "post",
      url: "https://courses-booking.vercel.app/files/upload",
      headers: {
        ...data,
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        setImages(
          `https://drive.google.com/thumbnail?id=${response?.data.data.id}`
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleServiceAdd = () => {
    setLessonsFormList([
      ...lessonsFormList,
      { title: "", url: "", isTrial: false },
    ]);
  };

  const handleServiceRemove = (index) => {
    const list = [...lessonsFormList];
    list.splice(index, 1);
    setLessonsFormList(list);
  };

  async function saveCourse() {
    setLoading(true);
    await axios
      .post(
        URL_COURSER,
        {
          title: titleCourse,
          thumbnail: images,
          level: level,
          highlights: highlights.map((item) => item.text),
          introduce: introduce,
          overview: overview,
          lessons: lessonsFormList,
          catalog: catalog,
          price: parseInt(price),
          durationInSeconds: durationInSeconds,
          document: document,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        history.push("course");
        console.log(res);
        toast.success(res?.dada?.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((err) => {
        console.log(err);

        toast.error(err.response.data.message);
      });
    setLoading(false);
  }

  const handleOnchangeTitleListLessons = (e, index) => {
    const { value } = e.target;

    const list = [...lessonsFormList];
    list[index].title = value;

    setLessonsFormList(list);
  };

  const handleOnchangeURLListLessons = (e, index) => {
    const { value } = e.target;

    const list = [...lessonsFormList];
    list[index].url = value;

    setLessonsFormList(list);
  };

  const handleOnchangeTrialListLessons = (e, index) => {
    const list = [...lessonsFormList];
    list[index].isTrial = e;

    setLessonsFormList(list);
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-3">
      <ToastContainer />
      <Card.Body>
        <h5 className="mb-4">Tạo Khóa Học Mới</h5>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="title-course">
                <Form.Label>Tiêu Đề Khóa Học</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Nhập Tiêu Đề Khóa Học"
                  onChange={(e) => setTitleCourse(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="image">
                <Form.Label>Ảnh Bìa Khóa Học</Form.Label>
                <input type="file" name="file" onChange={onChangeImg} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={3} className="mb-3">
              <Form.Group id="level">
                <Form.Label>Level</Form.Label>
                <Form.Select
                  type="checkbox"
                  required
                  onChange={(e) => setLevel(e.target.value)}
                >
                  <option value=""></option>
                  <option value="BASIC">Cơ Bản</option>
                  <option value="ADVANCE">Nâng Cao</option>
                  <option value="PRO">Chuyên Nghiệp</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <div>
                <Form.Label>Danh Mục</Form.Label>
                <Form.Select
                  type="checkbox"
                  required
                  onChange={(e) => setCatalog(e.target.value)}
                >
                  <option value=""></option>
                  <option value="Trà Sữa">Trà Sữa</option>
                  <option value="Cà Phê">Cà Phê</option>
                </Form.Select>
              </div>
            </Col>
            <Col md={10} className="mb-3">
              <div>
                <Form.Label>Điểm Nổi Bật Khóa Học</Form.Label>
                <ReactTags
                  tags={highlights}
                  delimiters={delimiters}
                  handleDelete={handleDeleteHighlights}
                  handleAddition={handleAdditionHighlights}
                  inputFieldPosition="bottom"
                  autocomplete
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={5} className="mb-3">
              <Form.Group id="price">
                <Form.Label>Giá Khóa Học</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Nhập Giá Khóa Học"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={4} className="mb-3">
              <Form.Group id="price">
                <Form.Label>Thời Lượng Trung Bình</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="(phút)"
                  onChange={(e) => setDurationInSeconds(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <h5 className="my-4">Giới Thiệu Tổng Quan Khóa Học</h5>
          <Row>
            <Col sm={15} className="mb-3">
              <Form.Group id="overview">
                <Form.Label>Tổng Quan</Form.Label>
                <Form.Control
                  size="lg"
                  required
                  type="text"
                  onChange={(e) => setOverview(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col sm={15} className="mb-3">
              <Form.Group id="introduce">
                <Form.Label>Giới Thiệu Khóa Học</Form.Label>
                <Form.Control
                  size="lg"
                  required
                  type="text"
                  onChange={(e) => setIntroduce(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <h5 className="my-4">Danh Sách Các Bài Học</h5>
          {lessonsFormList.map((singleList, index) => (
            <Col sm={10} className="mb-3" key={index}>
              <Form.Group className="mb-2">
                <h4>{index + 1}</h4>
                <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                  <span>
                    <Form.Check
                      label="Học Thử"
                      value={singleList.isTrial}
                      onChange={(e) =>
                        handleOnchangeTrialListLessons(e.target.checked, index)
                      }
                    />
                  </span>
                </div>
                <span>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-1">
                    {lessonsFormList.length !== 0 && (
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={(index) => handleServiceRemove(index)}
                      >
                        Xóa
                      </button>
                    )}
                  </div>
                </span>
                <span>
                  <Form.Control
                    required
                    id="title"
                    type="text"
                    placeholder="Tiêu Đề Bài Học"
                    value={singleList.title}
                    onChange={(e) => handleOnchangeTitleListLessons(e, index)}
                  />
                  <div className="pb-1"></div>
                </span>
                <Form.Control
                  required
                  type="text"
                  id="url"
                  placeholder="Link Bài Học"
                  value={singleList.url}
                  onChange={(e) => handleOnchangeURLListLessons(e, index)}
                />
              </Form.Group>
            </Col>
          ))}
          <div className="mt-3 mb-10">
            <Button variant="primary" type="submit" onClick={handleServiceAdd}>
              Thêm Bài Học
            </Button>
          </div>

          <div>
            <Form.Control
              type="text"
              id="url"
              placeholder="Link Tài Liệu"
              value={document}
              onChange={(e) => setDocument(e.target.value)}
            />
          </div>
          <div className="mt-3">
            {!loading ? (
              <button
                type="button"
                className="btn btn-info w-50"
                onClick={saveCourse}
              >
                Lưu Khóa Học Mới!
              </button>
            ) : (
              <button className="btn btn-primary w-50" type="button" disabled>
                <span
                  className="spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Đang Lưu ...
              </button>
            )}
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
