import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { getReferee } from "../../store/actions/referees.actions";
import {
  getCurrentSportSeason,
  getSeasons,
} from "../../store/actions/sport-season.action";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const referee = useAppSelector((state) => state.referees.currentReferee);
  const currentSeason = useAppSelector(
    (state) => state.sportSeasons.currentSportSeason
  );
  const sportSeasons = useAppSelector(
    (state) => state.sportSeasons.sportSeasons
  );

  console.log(currentSeason);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) dispatch(getReferee(token));
    if (currentSeason.end_date === null)
      dispatch(getCurrentSportSeason({ today: new Date() }));
    if (sportSeasons.length === 0) dispatch(getSeasons());
  }, []);

  return (
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="row">
              <div className="col-md-12 grid-margin">
                <div className="row">
                  <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                    <h3 className="font-weight-bold">Welcome {referee.name}</h3>
                  </div>
                  <div className="col-12 col-xl-4">
                    <div className="justify-content-end d-flex">
                      <div className="dropdown flex-md-grow-1 flex-xl-grow-0">
                        <button
                          className="btn btn-sm btn-light bg-white dropdown-toggle"
                          type="button"
                          id="dropdownMenuDate2"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="true"
                        >
                          <i className="mdi mdi-calendar"></i>{" "}
                          {currentSeason.season_name}
                        </button>
                        <div
                          className="dropdown-menu dropdown-menu-right"
                          aria-labelledby="dropdownMenuDate2"
                        >
                          {sportSeasons.map((season) => {
                            return (
                              <a className="dropdown-item" href="#">
                                {season.season_name}
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <div className="chartjs-size-monitor">
                      <div className="chartjs-size-monitor-expand">
                        <div className=""></div>
                      </div>
                      <div className="chartjs-size-monitor-shrink">
                        <div className=""></div>
                      </div>
                    </div>
                    <p className="card-title">Order Details</p>
                    <p className="font-weight-500">
                      The total number of sessions within the date range. It is
                      the period time a user is actively engaged with your
                      website, page or app, etc
                    </p>
                    <div className="d-flex flex-wrap mb-5">
                      <div className="mr-5 mt-3">
                        <p className="text-muted">Order value</p>
                        <h3 className="text-primary fs-30 font-weight-medium">
                          12.3k
                        </h3>
                      </div>
                      <div className="mr-5 mt-3">
                        <p className="text-muted">Orders</p>
                        <h3 className="text-primary fs-30 font-weight-medium">
                          14k
                        </h3>
                      </div>
                      <div className="mr-5 mt-3">
                        <p className="text-muted">Users</p>
                        <h3 className="text-primary fs-30 font-weight-medium">
                          71.56%
                        </h3>
                      </div>
                      <div className="mt-3">
                        <p className="text-muted">Downloads</p>
                        <h3 className="text-primary fs-30 font-weight-medium">
                          34040
                        </h3>
                      </div>
                    </div>
                    <canvas
                      id="order-chart"
                      width="741"
                      height="370"
                      style={{
                        display: "block;",
                        width: "741px;",
                        height: "370px;",
                      }}
                      className="chartjs-render-monitor"
                    ></canvas>
                  </div>
                </div>
              </div>
              <div className="col-md-6 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <div className="chartjs-size-monitor">
                      <div className="chartjs-size-monitor-expand">
                        <div className=""></div>
                      </div>
                      <div className="chartjs-size-monitor-shrink">
                        <div className=""></div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="card-title">Sales Report</p>
                      <a href="#" className="text-info">
                        View all
                      </a>
                    </div>
                    <p className="font-weight-500">
                      The total number of sessions within the date range. It is
                      the period time a user is actively engaged with your
                      website, page or app, etc
                    </p>
                    <div id="sales-legend" className="chartjs-legend mt-4 mb-2">
                      <ul className="1-legend">
                        <li>
                          <span
                            style={{ backgroundColor: "rgb(152, 189, 255);" }}
                          ></span>
                          Offline Sales
                        </li>
                        <li>
                          <span
                            style={{ backgroundColor: "rgb(75, 73, 172);" }}
                          ></span>
                          Online Sales
                        </li>
                      </ul>
                    </div>
                    <canvas
                      id="sales-chart"
                      width="741"
                      height="370"
                      style={{
                        display: "block;",
                        width: "741px;",
                        height: "370px;",
                      }}
                      className="chartjs-render-monitor"
                    ></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="footer">
            <div className="d-sm-flex justify-content-center justify-content-sm-between">
              <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">
                Copyright © 2021. Premium{" "}
                <a href="https://www.bootstrapdash.com/" target="_blank">
                  Bootstrap admin template
                </a>{" "}
                from BootstrapDash. All rights reserved.
              </span>
              <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
                Hand-crafted &amp; made with{" "}
                <i className="ti-heart text-danger ml-1"></i>
              </span>
            </div>
            <div className="d-sm-flex justify-content-center justify-content-sm-between">
              <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">
                Distributed by{" "}
                <a href="https://www.themewagon.com/" target="_blank">
                  Themewagon
                </a>
              </span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
