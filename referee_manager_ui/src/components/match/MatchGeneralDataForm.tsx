const MatchGeneralDataForm = () => {
  return (
    <>
      <div className="form-row">
        <div className="form-group col-md-3">
          <input type="text" className="form-control" placeholder="Casa" />
        </div>
        <div className="form-group col-md-1">
          <input type="text" className="form-control" placeholder="Reti" />
        </div>
        <div className="form-group col-md-3">
          <input type="text" className="form-control" placeholder="Ospiti" />
        </div>
        <div className="form-group col-md-1">
          <input type="text" className="form-control" placeholder="Reti" />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-3">
          <select id="inputState" className="form-control">
            <option selected disabled>
              Categoria
            </option>
            <option>...</option>
          </select>
        </div>
        <div className="form-group col-md-1">
          <input type="text" className="form-control" placeholder="Girone" />
        </div>
        <div className="form-group col-md-3">
          <input type="date" className="form-control" />
        </div>
        <div className="form-group col-md-1">
          <input type="time" className="form-control" placeholder="Girone" />
        </div>
      </div>
    </>
  );
};

export default MatchGeneralDataForm;
