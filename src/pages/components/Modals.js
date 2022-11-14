import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useHistory } from "react-router-dom";
import axios from "../../api/axios";

function Modals({ showModals, setShowModals, dataDetail, updateCourse }) {
  const [editTitle, setEditTitle] = useState();
  const [editPrice, setEditPrice] = useState();
  const [editLevel, setEditLevel] = useState();
  const [editLessonsFormList, setEditLessonsFormList] = useState([
    { title: "", url: "", isTrial: false },
  ]);

  let history = useHistory();

  const handleClose = () => setShowModals(false);

  const closeButton = () => setShowModals(false);

  useEffect(() => {
    setEditTitle(dataDetail?.title);
    setEditPrice(dataDetail?.price);
    setEditLevel(dataDetail?.level);
    setEditLessonsFormList(dataDetail?.lessons);
  }, [dataDetail]);

  const handleServiceAdd = () => {
    setEditLessonsFormList([
      ...editLessonsFormList,
      { title: "", url: "", isTrial: false },
    ]);
  };

  const handleServiceRemove = (index) => {
    const list = [...editLessonsFormList];
    list.splice(index, 1);
    setEditLessonsFormList(list);
  };

  // const updateCourse = async () {
  //   axios.
  // }

  return (
    <>
      <Modal
        onHide={handleClose}
        show={showModals}
        setShow={setShowModals}
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Chi Tiết Khóa Học</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tên Khóa Học</Form.Label>
              <Form.Control
                type="name"
                value={editTitle}
                autoFocus
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Giá Khóa Học</Form.Label>
              <Form.Control
                type="number"
                value={editPrice}
                autoFocus
                onChange={(e) => setEditPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group id="level">
              <Form.Label>Level</Form.Label>
              <Form.Select
                type="checkbox"
                required
                onChange={(e) => setEditLevel(e.target.value)}
              >
                <option disabled>{editLevel}</option>
                <option value="basic">BASIC</option>
                <option value="medium">MEDIUM</option>
                <option value="advanced">ADVANCED</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Danh Sách Bài Học</Form.Label>
              {editLessonsFormList?.map((singleList, index) => (
                <Col sm={10} className="mb-3" key={index}>
                  <Form.Group className="mb-2">
                    <h4>{index + 1}</h4>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                      <span>
                        <Form.Check
                          label="Học Thử"
                          value={singleList.isTrial}
                          // onChange={(e) =>
                          //   handleOnchangeTrialListLessons(
                          //     e.target.checked,
                          //     index
                          //   )
                          // }
                        />
                      </span>
                    </div>
                    <span>
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-1">
                        {editLessonsFormList?.length !== 0 && (
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
                        // onChange={(e) =>
                        //   handleOnchangeTitleListLessons(e, index)
                        // }
                      />
                      <div className="pb-1"></div>
                    </span>
                    <Form.Control
                      required
                      type="text"
                      id="url"
                      placeholder="Link Bài Học"
                      value={singleList.url}
                      // onChange={(e) => handleOnchangeURLListLessons(e, index)}
                    />
                  </Form.Group>
                </Col>
              ))}

              <div className="mt-3 mb-10">
                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleServiceAdd}
                >
                  Thêm Bài Học
                </Button>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={updateCourse}>
            Lưu Thay Đổi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Modals;
