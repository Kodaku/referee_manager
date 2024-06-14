const MatchEvaluationForm = () => {
  return (
    <>
      <div className="form-row">
        <div className="form-group col-md-12">
          <textarea
            className="form-control"
            placeholder="Mie considerazioni sulla partita..."
            rows={4}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <textarea
            className="form-control"
            placeholder="Rilievi OA Atletico/Tattico..."
            rows={4}
          />
        </div>
        <div className="form-group col-md-6">
          <textarea
            className="form-control"
            placeholder="Rilievi OA Comportamentale..."
            rows={4}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <textarea
            className="form-control"
            placeholder="Rilievi OA Tecnico/Disciplinare..."
            rows={4}
          />
        </div>
        <div className="form-group col-md-6">
          <textarea
            className="form-control"
            placeholder="Rilievi OA Collaborazione..."
            rows={4}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-2">
          <select id="inputState" className="form-control">
            <option selected disabled>
              Voto OA
            </option>
            <option>...</option>
          </select>
        </div>
        <div className="form-group col-md-2">
          <select id="inputState" className="form-control">
            <option selected disabled>
              Voto OT
            </option>
            <option>...</option>
          </select>
        </div>
        <div className="form-group col-md-2">
          <select id="inputState" className="form-control">
            <option selected disabled>
              Voto Personale
            </option>
            <option>...</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default MatchEvaluationForm;
