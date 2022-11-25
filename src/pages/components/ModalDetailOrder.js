import { Form, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";

function ModalDetailOrders({
  showModalDetail,
  setShowModalDetail,
  dataDetailOrder,
}) {
  return (
    <div>
      <Modal
        size="lg"
        show={showModalDetail}
        onHide={() => setShowModalDetail(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <div>
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Chi Tiết Đơn Hàng Của {dataDetailOrder?.customer?.fullName} !
            </Modal.Title>
          </Modal.Header>
        </div>
        <Modal.Body>
          <Form.Label>Ngày Được Tạo</Form.Label>
          <Modal.Title id="example-modal-sizes-title-md">
            -- {dataDetailOrder?.createdAt} --
          </Modal.Title>
          <Form.Label>Tên Khóa Học</Form.Label>
          <>
            {dataDetailOrder?.items?.map((item) => (
              <Modal.Title id="example-modal-sizes-title-lg" key={item.index}>
                {item.course.title}
              </Modal.Title>
            ))}
          </>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ModalDetailOrders;
