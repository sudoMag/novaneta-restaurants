import { useContext } from "react";
import styled from "styled-components";
import CashBox from "../../components/CashBox";
import PayBar from "../../components/PayBar";
import ProductsSelectionBox from "../../components/ProductsSelectionBox";
import { LeftContent, RightContent } from "../../components/SplittedPanel";
import { UserContext } from "../../context/UserContext";
import Logo from "../../icons/logowhite.svg"

const HeadBarLeft = styled.div`
  width: 100%;
  & #logo {
    margin: 10px 20px;
  }
`;

const HeadBarRight = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: end;

  & h3 {
    margin: 10px 20px;
  }
`;

const Cash = () => {
  const {userData} = useContext(UserContext);

  return (
    <>
      <LeftContent>
        <HeadBarLeft><img id="logo" src={Logo} alt="logo novaneta" /></HeadBarLeft>
        <CashBox />
        <PayBar />
      </LeftContent>
      <RightContent>
        <HeadBarRight><h3>{userData?.name}</h3></HeadBarRight>
        <h3>Productos</h3>
        <ProductsSelectionBox />
      </RightContent>
    </>
  );
};

export default Cash;
