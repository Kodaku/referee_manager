import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className="nav-item active">
          <Link className="nav-link" to={"/match-create"}>
            <i className="icon-grid menu-icon"></i>
            <span className="menu-title">Partite</span>
          </Link>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            data-toggle="collapse"
            href="#ui-basic"
            aria-expanded="false"
            aria-controls="ui-basic"
          >
            <i className="icon-layout menu-icon"></i>
            <span className="menu-title">Squadre</span>
            <i className="menu-arrow"></i>
          </a>
          <div className="collapse" id="ui-basic">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/ui-features/buttons.html">
                  Buttons
                </a>
              </li>
            </ul>
          </div>
        </li>
        {/* <li className="nav-item">
          <a
            className="nav-link"
            data-toggle="collapse"
            href="#form-elements"
            aria-expanded="false"
            aria-controls="form-elements"
          >
            <i className="icon-columns menu-icon"></i>
            <span className="menu-title">Collegamenti</span>
            <i className="menu-arrow"></i>
          </a>
        </li> */}
        <li className="nav-item">
          <a
            className="nav-link"
            data-toggle="collapse"
            href="#charts"
            aria-expanded="false"
            aria-controls="charts"
          >
            <i className="icon-bar-graph menu-icon"></i>
            <span className="menu-title">Profilo</span>
            <i className="menu-arrow"></i>
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            data-toggle="collapse"
            href="#tables"
            aria-expanded="false"
            aria-controls="tables"
          >
            <i className="icon-grid-2 menu-icon"></i>
            <span className="menu-title">Didattica</span>
            <i className="menu-arrow"></i>
          </a>
          <div className="collapse" id="tables">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/tables/basic-table.html">
                  Quiz
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/tables/basic-table.html">
                  Video Quiz
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            data-toggle="collapse"
            href="#icons"
            aria-expanded="false"
            aria-controls="icons"
          >
            <i className="icon-contract menu-icon"></i>
            <span className="menu-title">Statistiche</span>
            <i className="menu-arrow"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
