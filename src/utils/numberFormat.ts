import { numericFormatter } from "react-number-format";

const numberFormat = (number: number) => {
  return `$ ${numericFormatter(number.toString(), {
    allowLeadingZeros: true,
    thousandSeparator: ".",
    decimalSeparator: ",",
    displayType: "text",
  })}`;
};

export default numberFormat;
