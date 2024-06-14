import { useState } from "react";
import { Button } from "react-bootstrap";

const MatchPlayerDataForm = () => {
  const [numGiocatori, setNumGiocatori] = useState<number>(0);
  const [numPlayersJSX, setNumPlayersJSX] = useState<
    { idx: number; element: React.JSX.Element }[]
  >([]);

  const addJSXPlayer = (idx: number) => {
    const newPlayerForm = (
      <div key={"div-" + idx}>
        <div style={{ float: "right", paddingRight: 15, paddingTop: 5 }}>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={() => removePlayerJSX(idx)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div
          style={{
            borderStyle: "solid",
            borderColor: "rgba(0, 0, 0, 0.1)",
            borderWidth: "0.15em",
            padding: 10,
            paddingTop: 25,
            borderRadius: "10px",
          }}
        >
          <div className="form-row">
            <div className="form-group col-md-5">
              <textarea
                className="form-control"
                placeholder="Problemi con un giocatore locale..."
                rows={4}
              />
            </div>
            <div className="form-group col-md-5">
              <textarea
                className="form-control"
                placeholder="Problemi con un giocatore ospite..."
                rows={4}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-5">
              <select id="inputState" className="form-control">
                <option selected disabled>
                  Quanto ti ha infastidito
                </option>
                <option>...</option>
              </select>
            </div>
            <div className="form-group col-md-5">
              <select id="inputState" className="form-control">
                <option selected disabled>
                  Quanto ti ha infastidito
                </option>
                <option>...</option>
              </select>
            </div>
          </div>
        </div>
        <br />
      </div>
    );
    setNumPlayersJSX((prevState) => [
      ...prevState,
      { idx: idx, element: newPlayerForm },
    ]);
  };

  const removePlayerJSX = (idx: number) => {
    setNumPlayersJSX((prevState) => {
      return prevState.filter((el) => idx !== el.idx);
    });
  };
  return (
    <>
      <Button
        variant="primary"
        onClick={() => {
          addJSXPlayer(numGiocatori);
          setNumGiocatori((prevState) => prevState + 1);
        }}
      >
        + Aggiungi giocatore
      </Button>
      <br />
      <br />
      {numPlayersJSX.map((el) => el.element)}
    </>
  );
};

export default MatchPlayerDataForm;
