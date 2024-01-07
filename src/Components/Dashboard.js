import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {} from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import upcomingIpodata from "./UpcomingIPO";
import CCR from "./CCR";

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const onLogout = () => {
    navigate("/login");
  };

  const [ipo, setIpo] = useState([]);
  const [ccr, setCcr] = useState([]);

  //fetch api data for upcoming ipo calender
  const fetchData = async () => {
    try {
      const url = "";
      // const url =
      //   "https://api.iex.cloud/v1/data/CORE/UPCOMING_IPOS/market?token=pk_1f4eb191f454414580d7d2e7b7d3649f";
      const response = await axios.get(url);
      const data = response.data;
      console.log(data);
      setIpo(data);
      console.log(ipo);

      //currency conversion rate

      const ccrUrl = "";
      // const ccrUrl =
      //   "https://api.iex.cloud/v1/fx/latest?symbols=USDCAD,GBPUSD,USDJPY&token=pk_1f4eb191f454414580d7d2e7b7d3649f";
      const ccrResponse = await axios.get(ccrUrl);
      const ccrData = ccrResponse.data;
      console.log(ccrData);
      setCcr(ccrData);
      console.log(ccr);
    } catch (error) {
      // Handle errors
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const ipoLocal = upcomingIpodata;
  const ccrLocal = CCR;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <p className="lead">
            Welcome, {location.state.data.email.split("@")[0]}
          </p>
        </div>
        <div className="col-md-6 d-flex justify-content-end">
          <button className="btn btn-danger" onClick={onLogout}>
            Logout
          </button>
        </div>

        <div className="header text-center my-3">
          <h2>UPCOMING IPO DATA</h2>
        </div>

        <div className="table-responsive">
          <Table striped bordered hover style={tableData} className="w-100">
            <thead>
              <tr className="text-center">
                <th>Filed Date</th>
                <th>Status</th>
                <th>Company Name</th>
                <th>Managers</th>
                <th>Offering Date</th>
                <th>Price Range High</th>
                <th>Price Range Low</th>
                <th>Shares</th>
                <th>Symbol</th>
                <th>Updated</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>
              {ipoLocal.map((item, i) => {
                return [
                  <tr key={i}>
                    <td>{item.filedDate}</td>
                    <td>{item.status}</td>
                    <td>{item.companyName}</td>
                    <td>{item.managers}</td>
                    <td>{item.offeringDate}</td>
                    <td>{item.priceRangeHigh}</td>
                    <td>{item.priceRangeLow}</td>
                    <td>{item.shares}</td>
                    <td>{item.symbol}</td>
                    <td>{item.updated}</td>
                    <td>{item.volume}</td>
                  </tr>,
                ];
              })}
            </tbody>
          </Table>
        </div>
        <div className="header text-center my-3">
          <h2>CURRENCY CONVERSION RATE</h2>
        </div>

        <div className="table-responsive">
          <Table striped bordered hover style={tableData} className="w-100">
            <thead>
              <tr className="text-center">
                <th>Symbol</th>
                <th>Rate</th>
                <th>Timestamp</th>
                <th>Is Derived</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {ccrLocal.map((item, i) => {
                return [
                  <tr key={i}>
                    <td>{item.symbol}</td>
                    <td>{item.rate}</td>
                    <td>{new Date(item.timestamp).toGMTString()}</td>
                    <td>{item.isDerived}</td>
                  </tr>,
                ];
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

const tableData = {
  fontSize: "14px",
};
