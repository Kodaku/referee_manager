const MatchSupportersDataForm = () => {
  return (
    <>
      <div className="form-row">
        <div className="form-group col-md-6">
          <textarea
            className="form-control"
            placeholder="Tifosi casa..."
            rows={4}
          />
        </div>
        <div className="form-group col-md-6">
          <textarea
            className="form-control"
            placeholder="Tifosi ospiti..."
            rows={4}
          />
        </div>
      </div>
    </>
  );
};

export default MatchSupportersDataForm;
