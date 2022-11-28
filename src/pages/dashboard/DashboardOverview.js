import React, { useEffect, useState } from "react";

import { faCashRegister, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "@themesberg/react-bootstrap";

import {
  CounterWidget,
  CircleChartWidget,
  BarChartWidget,
  TeamMembersWidget,
  ProgressTrackWidget,
  SalesValueWidget,
  SalesValueWidgetPhone,
} from "../../components/Widgets";
import { PageVisitsTable } from "../../components/Tables";
import { trafficShares, totalOrders } from "../../data/charts";
import { useHistory } from "react-router-dom";
import axios from "../../api/axios";

export default () => {
  let history = useHistory();
  const [qualityUsers, setQualityUsers] = useState(0);
  const [qualityOder, setQualityOder] = useState(0);
  const [allOrder, setAllOrder] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("tokenAdmin");
    if (!token) {
      history.push("/sign-in");
    }
  });

  const getAllOrders = async () => {
    const token = localStorage.getItem("tokenAdmin");
    await axios
      .get("/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setQualityOder(res.data.data.length);
        setAllOrder(res.data.data);
      })
      .catch((err) => {
        if (err?.response?.data?.message === "Unauthorized") {
          history.push("/sign-in");
        }
      });
  };

  useEffect(() => {
    CalRevenue();
  }, [allOrder]);

  function CalRevenue() {
    var revenue = 0;
    revenue = allOrder?.map((item) => {
      if (item.status === "COMPLETED") {
        setRevenue((revenue += item.totalPrice));
        return revenue;
      }
      return revenue;
    });
  }

  const getAllUser = async () => {
    const token = localStorage.getItem("tokenAdmin");
    await axios
      .get(
        "https://courses-booking.vercel.app/users?page=0&pageSize=25&sortType=desc&sortField=updatedAt&isPurchased=false",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setQualityUsers(res.data.data.length);
        console.log("check", res);
        setListUsers(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllUser();
    getAllOrders();
  }, []);
  return (
    <>
      <Row className="justify-content-md-center">
        <Col xs={12} className="mb-4 d-none d-sm-block">
          <SalesValueWidget
            title="Doanh Thu"
            value={`${revenue} đ`}
            percentage={0}
          />
        </Col>
        <Col xs={12} className="mb-4 d-sm-none">
          <SalesValueWidgetPhone
            title="Doanh Thu"
            value={`${revenue} đ`}
            percentage={0}
          />
        </Col>
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Học Viên Đã Tham Gia"
            title={qualityUsers}
            period="Feb 1 - Apr 1"
            percentage={18.2}
            icon={faChartLine}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Khoá Học Đã Được Mua"
            title={qualityOder}
            period="Feb 1 - Apr 1"
            percentage={28.4}
            icon={faCashRegister}
            iconColor="shape-tertiary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CircleChartWidget
            title="Lượng Truy Cập Theo Thiết Bị"
            data={trafficShares}
          />
        </Col>
      </Row>

      <Row>
        <Col xs={12} xl={12} className="mb-4">
          <Row>
            <Col xs={12} xl={8} className="mb-4">
              <Row>
                <Col xs={12} className="mb-4">
                  <PageVisitsTable listUsers={listUsers} />
                </Col>

                <Col xs={12} lg={6} className="mb-4">
                  <TeamMembersWidget />
                </Col>

                <Col xs={12} lg={6} className="mb-4">
                  <ProgressTrackWidget ordersList={allOrder} />
                </Col>
              </Row>
            </Col>

            <Col xs={12} xl={4}>
              <Row>
                <Col xs={12} className="mb-4">
                  <BarChartWidget
                    title="Tổng Khóa Học Đã Được Mua"
                    value={452}
                    percentage={18.2}
                    data={totalOrders}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
