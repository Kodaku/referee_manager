import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <h6 className="font-weight-light">Registrati</h6>
                <form className="pt-3">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="mechanographic_code"
                      placeholder="Codice meccanografico"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="name"
                      placeholder="Nome"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="surname"
                      placeholder="Cognome"
                    />
                  </div>
                  <div className="form-group">
                    <select
                      className="form-control form-control-lg"
                      id="qualification"
                    >
                      <option>AE</option>
                      <option>AA</option>
                      <option>OA</option>
                      <option>OT</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <select
                      className="form-control form-control-lg"
                      id="gender"
                    >
                      <option>M</option>
                      <option>F</option>
                      <option>Altro</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="password"
                      placeholder="Password"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="check_password"
                      placeholder="Conferma Password"
                    />
                  </div>
                  <div className="mt-3">
                    <a
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      href="../../index.html"
                    >
                      Registrati
                    </a>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Hai già un account?{" "}
                    <Link to="/" className="text-primary">
                      Login
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
