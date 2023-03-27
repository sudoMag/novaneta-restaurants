import styled from "styled-components";
import OpacityAndTranslate from "./animations/OpacityAndTranslate";
import { LeftContent, RightContent } from "./SplittedPanel";

const Container = styled.section`
  width: 400px;
  height: 260px;
  border: solid gray 1px;
  border-radius: 20px;
  box-shadow: -1px -20px 200px 17px var(--bg-main-color);
  display: flex;
  overflow: hidden;
  opacity: 0;
  animation: ${OpacityAndTranslate} ease-in-out 200ms 3ms forwards;
  background: linear-gradient(
    190deg,
    var(--bg-gradient-color) -30%,
    rgba(29, 30, 32, 1) 100%
  );
`;

const MiniNavBar = styled.div`
  width: 25px;
  height: 100%;
  background-color: var(--bg-main-color);
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 10px 0;
`;

const Text = styled.div`
  width: 30px;
  height: 5px;
  background-color: white;
  border-radius: 4px;
  margin: 3px 2px;
`;

const DarkText = styled(Text)`
  background-color: #1d1e20;
  width: 15px;
  margin: 0;
`;

const MiniIcon = styled.div`
  width: 12px;
  height: 12px;
  background-color: #1d1e20;
  border-radius: 4px;
  margin: 3px 0;
`;

const Card = styled.div`
  background-color: #1d1e20;
  border: solid 1px #383838;
`;

const MiniLeftContent = styled(LeftContent)`
  width: 50%;
  padding: 8px 10px;
  margin: 0px;
  justify-content: start;
  align-items: start;
`;
const MiniRightContent = styled(RightContent)`
  width: 50%;
  padding: 8px 10px;
  margin: 0px;
  justify-content: start;
  align-items: center;
`;

const MiniLogo = styled(Text)`
  width: 52px;
  height: 9px;
  margin: 3px 0;
`;

const CashMiniCotainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 5px 0;
`;

const MiniBar = styled.div`
  height: 25px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
`;

const MiniPill = styled.div`
  width: 15px;
  height: 5px;
  background-color: var(--bg-main-color);
  border-radius: 4px;
  margin: 3px 2px;
  padding: 3px 5px;
`;

const MiniItemInCash = styled(Card)`
  width: 100%;
  height: 20px;
  margin: 5px 0;
  border-radius: 5px;
`;

const MiniSelectionBox = styled(CashMiniCotainer)`
  flex-direction: row;
  align-content: flex-start;
  flex-wrap: wrap;
`;

const ItemMiniCard = styled(Card)`
  width: 30px;
  height: 35px;
  margin: 3px 3px;
  border-radius: 5px;
`;

const MiniLayout = () => {
  return (
    <Container>
      <MiniNavBar>
        <MiniIcon />
        <MiniIcon />
        <MiniIcon />
        <MiniIcon />
      </MiniNavBar>
      <MiniLeftContent>
        <MiniLogo />
        <CashMiniCotainer>
          <MiniItemInCash></MiniItemInCash>
          <MiniItemInCash></MiniItemInCash>
          <MiniItemInCash></MiniItemInCash>
        </CashMiniCotainer>
        <MiniBar>
          <Text />
          <Text />
          <MiniPill>
            <DarkText />
          </MiniPill>
        </MiniBar>
      </MiniLeftContent>
      <MiniRightContent>
        <MiniBar>
          <Text />
        </MiniBar>
        <Text />
        <MiniSelectionBox>
          <ItemMiniCard />
          <ItemMiniCard />
          <ItemMiniCard />
          <ItemMiniCard />
          <ItemMiniCard />
          <ItemMiniCard />
        </MiniSelectionBox>
      </MiniRightContent>
    </Container>
  );
};

export default MiniLayout;
