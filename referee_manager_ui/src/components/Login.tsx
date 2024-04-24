import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RefereeLoginRequest } from "../types/referees.types";
import { useAppDispatch } from "../hooks/redux-hooks";

const Login = () => {
  const dispatch = useAppDispatch();
  const [loginReferee, setLoginReferee] = useState<RefereeLoginRequest>();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      // verifica che il token sia ancora valido e se lo è continua altrimenti resta sulla pagina di login
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = e.target.value;
    setLoginReferee((prevState): RefereeLoginRequest => {
      return {
        ...prevState,
        [e.target.name]: value,
      };
    });
  };

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <h4>Benvenuto in Referee Manager</h4>
                <h6 className="font-weight-light">
                  Esegui il login per continuare
                </h6>
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
                      type="password"
                      className="form-control form-control-lg"
                      id="exampleInputPassword1"
                      placeholder="Password"
                    />
                  </div>
                  <div className="mt-3">
                    <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">
                      Login
                    </button>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Non hai un account?{" "}
                    <Link to="/signup" className="text-primary">
                      Registrati qui
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

export default Login;
