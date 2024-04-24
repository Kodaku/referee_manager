import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { useEffect, useState } from "react";
import { Referee } from "../types/referees.types";
import { registerReferee } from "../store/actions/referees.actions";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const registrationOk = useAppSelector(
    (state) => state.referees.registrationOk
  );
  const [referee, setReferee] = useState<Referee>();
  const [checkPassword, setCheckPassword] = useState<string>("");

  useEffect(() => {
    if (registrationOk) {
      navigate("/");
    }
  }, [registrationOk]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;
    if (value) {
      setReferee((prevState): Referee => {
        return {
          ...prevState,
          [e.target.name]: value,
        };
      });
    }
  };

  const handleSubmit = () => {
    if (checkPassword === referee?.password) {
      if (referee) {
        dispatch(registerReferee(referee));
      }
    }
  };

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
                      name="mechanographic_code"
                      placeholder="Codice meccanografico"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="name"
                      name="name"
                      onChange={(e) => handleChange(e)}
                      placeholder="Nome e Cognome"
                    />
                  </div>
                  <div className="form-group">
                    <select
                      className="form-control form-control-lg"
                      id="qualification"
                      onChange={(e) => handleChange(e)}
                      name="qualification"
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
                      name="gender"
                      onChange={(e) => handleChange(e)}
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
                      name="password"
                      onChange={(e) => handleChange(e)}
                      placeholder="Password"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="check_password"
                      onChange={(e) => setCheckPassword(e.target.value)}
                      placeholder="Conferma Password"
                    />
                  </div>
                  <div className="mt-3">
                    <button
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      type="submit"
                      onClick={() => handleSubmit()}
                    >
                      Registrati
                    </button>
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
