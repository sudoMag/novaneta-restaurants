import { useContext } from "react";
import { UserContext } from "../../../../context/UserContext";
import {
  DataUser,
  InvoiceContainer,
  InvoiceHeader,
  InvoiceTitle,
  InvoiceTotal,
  Item,
  ItemPrice,
  ItemsContainer,
  TotalsContainer,
} from "../Invoice/InvoiceStyles";
import { NumericFormat } from "react-number-format";
import LogoBlack from "../../../../icons/logoblack.svg";
import Order from "../../../../utils/types/Order";
import ProductInCart from "../../../../utils/types/ProductInCart";
import getDate from "../../../../utils/services/getDate";

const Invoice = ({
  setRef,
  orders,
  products,
  total,
  ivaTotal,
}: {
  setRef: (value: HTMLDivElement | null) => void;
  orders?: Order[];
  products?: ProductInCart[];
  total: number;
  ivaTotal?: number;
}) => {
  const { userData } = useContext(UserContext);

  return (
    <InvoiceContainer ref={(el) => setRef(el)}>
      <InvoiceHeader>
        <img src={LogoBlack} alt="logo novaneta" />
        <DataUser>
          <h4>Fecha: {getDate()}</h4>
          <h4>Local: {userData?.name}</h4>
          <h4>Rut: {userData?.rut}</h4>
          <h4>Dir: {userData?.direction}</h4>
        </DataUser>
      </InvoiceHeader>
      <hr />
      <InvoiceTitle>FACTURA</InvoiceTitle>
      <ItemsContainer>
        {orders &&
          orders.map((order) =>
            order.products.map((item) => {
              return (
                <Item key={item.product.id}>
                  x{item.quantity} {item.product.name}
                  <ItemPrice>{item.product.price}</ItemPrice>
                </Item>
              );
            })
          )}
        {products &&
          products.map((item) => {
            return (
              <Item key={item.product.id}>
                x{item.quantity} {item.product.name}
                <NumericFormat
                  allowLeadingZeros
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  value={item.product.price}
                  renderText={(value) => <ItemPrice>{value}</ItemPrice>}
                />
                <NumericFormat
                  allowLeadingZeros
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"
                  value={item.product.price * item.quantity}
                  renderText={(value) => <ItemPrice>{value}</ItemPrice>}
                />
              </Item>
            );
          })}
      </ItemsContainer>
      <hr />
      <TotalsContainer>
        <NumericFormat
          allowLeadingZeros
          thousandSeparator="."
          decimalSeparator=","
          displayType="text"
          value={total}
          renderText={(value) => <InvoiceTotal>TOTAL: ${value}</InvoiceTotal>}
        />
      </TotalsContainer>
    </InvoiceContainer>
  );
};

export default Invoice;
