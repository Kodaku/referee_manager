import React from "react";
import Sidebar from "../dashboard/Sidebar";
import Navbar from "../dashboard/Navbar";

interface BaseLayoutProps {
  children: React.ReactNode | React.ReactElement | JSX.Element;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="card-body">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;
