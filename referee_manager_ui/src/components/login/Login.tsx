import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RefereeLoginRequest } from "../../types/referees.types";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { loginReferee } from "../../store/actions/referees.actions";
import axios from "axios";
import { URL } from "../../utils/http_constants";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loggedInRefereee, setLoggedInReferee] =
    useState<RefereeLoginRequest>();
  const referee = useAppSelector((state) => state.referees.currentReferee);

  useEffect(() => {
    const verifyToken = async () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        // verifica che il token sia ancora valido e se lo è continua altrimenti resta sulla pagina di login
        const response = await axios.post(`${URL}/check-token`, {
          token: token,
        });
        const data = await response.data;
        if (data.valid) {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      }
    };
    verifyToken();
  }, [referee]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = e.target.value;
    setLoggedInReferee((prevState): RefereeLoginRequest => {
      return {
        ...prevState,
        [e.target.name]: value,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(loggedInRefereee);
    if (loggedInRefereee) {
      dispatch(loginReferee(loggedInRefereee));
    }
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
                <form className="pt-3" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="mechanographic_code"
                      name="mechanographic_code"
                      placeholder="Codice meccanografico"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="password"
                      name="password"
                      placeholder="Password"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="mt-3">
                    <button
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      // onClick={() => handleSubmit()}
                      type="submit"
                    >
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
