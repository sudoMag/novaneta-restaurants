import CashBox from "../../components/CashBox";
import PayBar from "../../components/PayBar";
import ProductsSelectionBox from "../../components/ProductsSelectionBox";
import { LeftContent, RightContent } from "../../components/SplittedPanel";
import Logo from "../../icons/logowhite.svg"

const Cash = () => {
  return (
    <>
      <LeftContent>
        <img src={Logo} alt="logo novaneta" />
        <h3>Caja</h3>
        <CashBox />
        <PayBar />
      </LeftContent>
      <RightContent>
        <h3>Productos</h3>
        <ProductsSelectionBox />
      </RightContent>
    </>
  );
};

export default Cash;
