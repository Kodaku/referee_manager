const MatchTravelDataForm = () => {
  return (
    <>
      <div className="form-row">
        <div className="form-group col-md-3">
          <input type="text" className="form-control" placeholder="Indirizzo" />
        </div>
        <div className="form-group col-md-2">
          <input
            type="text"
            className="form-control"
            placeholder="Distanza (km)"
          />
        </div>

        <div className="form-group col-md-2">
          <input
            type="text"
            className="form-control"
            placeholder="Rimborso (euro)"
          />
        </div>
      </div>
      <h1>MAPPA PER INDIRIZZO</h1>
    </>
  );
};

export default MatchTravelDataForm;
