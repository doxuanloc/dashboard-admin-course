import React, { useEffect, useState } from "react";

import { Breadcrumb } from "@themesberg/react-bootstrap";

import { DataCourseTable } from "../components/Tables";
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
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
          ></Breadcrumb>
          <h4>Tất Cả Khóa Học</h4>
          <p className="mb-0">Thông Tin Từng Khóa Học</p>
        </div>
      </div>

      <DataCourseTable />
    </>
  );
};
