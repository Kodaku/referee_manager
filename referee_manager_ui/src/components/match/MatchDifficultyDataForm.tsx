const MatchDifficultyDataForm = () => {
  return (
    <>
      <div className="form-row">
        <div className="form-group col-md-2">
          <select id="inputState" className="form-control">
            <option selected disabled>
              Difficoltà gara OA
            </option>
            <option>...</option>
          </select>
        </div>
        <div className="form-group col-md-2">
          <select id="inputState" className="form-control">
            <option selected disabled>
              Difficoltà gara OT
            </option>
            <option>...</option>
          </select>
        </div>
        <div className="form-group col-md-2">
          <select id="inputState" className="form-control">
            <option selected disabled>
              Difficoltà gara per me
            </option>
            <option>...</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default MatchDifficultyDataForm;
