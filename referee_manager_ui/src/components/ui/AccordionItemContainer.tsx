import { Accordion } from "react-bootstrap";

interface AccordionItemContainerProps {
  itemKey: string;
  header: string;
  children: JSX.Element;
}

const AccordionItemContainer = ({
  itemKey,
  header,
  children,
}: AccordionItemContainerProps) => {
  return (
    <Accordion.Item eventKey={itemKey}>
      <Accordion.Header>{header}</Accordion.Header>
      <Accordion.Body>{children}</Accordion.Body>
    </Accordion.Item>
  );
};

export default AccordionItemContainer;
