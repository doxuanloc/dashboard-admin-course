import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import ImageUploading from "react-images-uploading";
import { WithContext as ReactTags } from "react-tag-input";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Col,
  Row,
  Card,
  Form,
  Button,
  InputGroup,
} from "@themesberg/react-bootstrap";
import axios from "../api/axios";

export const GeneralInfoForm = () => {
  const [images, setImages] = useState([]);
  const [lessonsFormList, setLessonsFormList] = useState([
    { title: "", url: "", isTrial: false },
  ]);

  const [titleCourse, setTitleCourse] = useState("");
  const [level, setLevel] = useState("");
  const [highlights, setHightLights] = useState([]);
  const [overview, setOverview] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [tags, setTags] = useState([]);
  const [price, setPrice] = useState();
  const [durationInSeconds, setDurationInSeconds] = useState(0);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const nameAdmin = localStorage.getItem("nameAdmin");

  const URL_COURSER = "/courses";

  const maxNumber = 69;
  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  const handleDeleteTags = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDeleteHighlights = (i) => {
    setHightLights(highlights.filter((highlight, index) => index !== i));
  };

  const handleAdditionHighlights = (highlight) => {
    setHightLights([...highlights, highlight]);
  };

  const onChangeImg = (imageList) => {
    if (imageList) {
      setImages(imageList);
    }
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
          thumbnail:
            "https://img.freepik.com/free-vector/tiktok-banner-with-watercolor-splatter_69286-194.jpg?w=2000",
          level: level,
          highlights: highlights.map((item) => item.text),
          introduce: introduce,
          overview: overview,
          trainer: {
            avatarUrl:
              "https://haigiangnetwork.com/assets/storage/images/category_OZY2UL5JP0GB.png",
            name: nameAdmin,
            title: "Tiktok",
          },
          lessons: lessonsFormList,
          tags: tags.map((item) => item.text),
          price: parseInt(price),
          durationInSeconds: durationInSeconds,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.success(res?.data?.dada?.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((err) => {
        console.log(err);
        // const dataErr = err?.response?.data?.message;
        // dataErr?.map((item) => {
        //   toast.error(item, {
        //     position: toast.POSITION.TOP_CENTER,
        //   });
        // });
      });
    setLoading(false);
  }

  console.log(level);
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
    console.log(lessonsFormList);
  };

  const handleOnchangeTrialListLessons = (e, index) => {
    const list = [...lessonsFormList];
    list[index].isTrial = e;

    setLessonsFormList(list);
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-3">
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
            {/* <Col md={6} className="mb-3">
              <Form.Group id="image">
                <Form.Label>Ảnh Bìa Khóa Học</Form.Label>
                <ImageUploading
                  multiple
                  value={images}
                  onChange={onChangeImg}
                  maxNumber={maxNumber}
                  dataURLKey="url"
                >
                  {({
                    imageList,
                    onImageUpload,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                  }) => (
                    // write your building UI
                    <div className="upload__image-wrapper">
                      <button
                        style={isDragging ? { color: "red" } : undefined}
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                        Nhập Hoặc Thả Vào đây
                      </button>
                      &nbsp;
                      {imageList?.map((image, index) => (
                        <div key={index} className="image-item">
                          <img src={image.url} alt="" width="100" />
                          <div className="image-item__btn-wrapper">
                            <button onClick={() => onImageUpdate(index)}>
                              Cập Nhật
                            </button>
                            <button onClick={() => onImageRemove(index)}>
                              Xóa
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ImageUploading>
              </Form.Group>
            </Col> */}
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
                  <option value="BASIC">BASIC</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="ADVANCED">ADVANCED</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <div>
                <Form.Label>Tags Khóa Học</Form.Label>
                <ReactTags
                  tags={tags}
                  delimiters={delimiters}
                  handleDelete={handleDeleteTags}
                  handleAddition={handleAddition}
                  inputFieldPosition="bottom"
                  autocomplete
                />
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
            <Col sm={4} className="mb-3">
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
        <ToastContainer />
      </Card.Body>
    </Card>
  );
};
