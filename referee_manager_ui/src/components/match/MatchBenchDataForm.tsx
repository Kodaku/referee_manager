const MatchBenchDataForm = () => {
  return (
    <>
      <div className="form-row">
        <div className="form-group col-md-6">
          <textarea
            className="form-control"
            placeholder="Panchine casa..."
            rows={4}
          />
        </div>
        <div className="form-group col-md-6">
          <textarea
            className="form-control"
            placeholder="Panchine ospiti..."
            rows={4}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <select id="inputState" className="form-control">
            <option selected disabled>
              Quanto ti hanno infastidito
            </option>
            <option>...</option>
          </select>
        </div>
        <div className="form-group col-md-6">
          <select id="inputState" className="form-control">
            <option selected disabled>
              Quanto ti hanno infastidito
            </option>
            <option>...</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default MatchBenchDataForm;
