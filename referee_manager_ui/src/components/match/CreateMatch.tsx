import { Accordion } from "react-bootstrap";
import MatchTravelDataForm from "./MatchTravelDataForm";
import MatchGeneralDataForm from "./MatchGeneralDataForm";
import MatchEvaluationForm from "./MatchEvaluationForm";
import MatchPlayerDataForm from "./MatchPlayerDataForm";
import MatchBenchDataForm from "./MatchBenchDataForm";
import MatchSupportersDataForm from "./MatchSupportersDataForm";
import MatchDifficultyDataForm from "./MatchDifficultyDataForm";
import AccordionItemContainer from "../ui/AccordionItemContainer";
import BaseLayout from "../ui/BaseLayout";

const CreateMatch = () => {
  return (
    <BaseLayout>
      <h4 className="card-title">Crea Partita</h4>
      <form>
        <Accordion defaultActiveKey={["0"]} alwaysOpen>
          <AccordionItemContainer
            itemKey="0"
            header="Dati Generali*"
            children={<MatchGeneralDataForm />}
          />
          <AccordionItemContainer
            itemKey="1"
            header="Viaggio"
            children={<MatchTravelDataForm />}
          />
          <AccordionItemContainer
            itemKey="2"
            header="Valutazioni"
            children={<MatchEvaluationForm />}
          />
          <AccordionItemContainer
            itemKey="3"
            header="Giocatori"
            children={<MatchPlayerDataForm />}
          />
          <AccordionItemContainer
            itemKey="4"
            header="Panchine"
            children={<MatchBenchDataForm />}
          />
          <AccordionItemContainer
            itemKey="5"
            header="Tifosi"
            children={<MatchSupportersDataForm />}
          />
          <AccordionItemContainer
            itemKey="6"
            header="Difficoltà gara"
            children={<MatchDifficultyDataForm />}
          />
        </Accordion>
        <br />
        <div className="form-row">
          <div className="col-1">
            <input type="submit" className="btn btn-primary" value={"Crea"} />
          </div>
          <div className="col-1">
            <button className="btn btn-secondary">Annulla</button>
          </div>
        </div>
      </form>
    </BaseLayout>
  );
};

export default CreateMatch;
