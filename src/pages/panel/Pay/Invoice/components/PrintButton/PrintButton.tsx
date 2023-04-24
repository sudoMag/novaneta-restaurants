import ReactToPrint from "react-to-print";

import { Button } from "./PrintButtonStyles";
import InvoiceReference from "../../types/InvoiceReference";

const PrintButton = ({
  invoiceRef,
}: {
  invoiceRef: InvoiceReference;
}) => {
  return (
    <ReactToPrint
      trigger={() => <Button>IMPRIMIR</Button>}
      content={() => invoiceRef.current}
    />
  );
};

export default PrintButton;
