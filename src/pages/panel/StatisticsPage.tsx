import styled from "styled-components";
import useStatistics from "../../hooks/useStatistics";
import {
  Title,
  Metric,
  Flex,
  AccordionHeader,
  AccordionList,
  Accordion,
  AccordionBody,
  Text,
  List,
  ListItem,
  Badge,
} from "@tremor/react";
import { NumericFormat, numericFormatter } from "react-number-format";
import InfiniteScroll from "react-infinite-scroll-component";
import ChartStatistic from "../../components/ChartStatistic";
import { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";

const Container = styled.main`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 20px;
  grid-template-rows: repeat(2, 1fr);
`;

const SalesListContainer = styled.div`
  overflow-y: auto;
  background-color: var(--bg-color);
  padding: 20px;
  border-radius: 10px;
  grid-column: 3/ 3;
  grid-row: 1 / 1;

  &::-webkit-scrollbar {
    display: none;
  }

  &.infinite-scroll-component {
    &::-webkit-scrollbar {
      display: none;
    }
  }

  /* & li {
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    background-color: #2a2a2a;
    border-radius: 10px;
    margin: 5px 0;
  } */
`;

const SpaceLoading = styled.div`
  height: 10px;
`;

const SalesOfDayContainer = styled.section`
  background-color: var(--bg-color);
  padding: 20px;
  border-radius: 10px;
  grid-column: 4/ 4;
  grid-row: 1 / 1;
`;

const CardLayoutTextContainer = styled.div`
  color: white;
`;

const StatisticsPage = () => {
  const { balanceAmount, sales, bringMoreSales } = useStatistics();
  const [balanceOfDay, setBalanceOfDay] = useState(0);

  const fromStringDate = (date: Timestamp) => {
    console.log(`${new Date(date.toDate()).toLocaleDateString()} ${new Date(
      date.toDate()
    ).getHours()}:${new Date(date.toDate()).getMinutes()}`)
    return `${new Date(date.toDate()).toLocaleDateString()} ${new Date(
      date.toDate()
    ).getHours()}:${new Date(date.toDate()).getMinutes()}`;
  };

  useEffect(() => {
    let amount = 0;
    balanceAmount.forEach((item) => {
      amount += item.amount;
    });
    setBalanceOfDay(amount);
  }, [balanceAmount]);

  return (
    <Container>
      <ChartStatistic data={balanceAmount} />
      <SalesOfDayContainer>
        <Flex>
          <CardLayoutTextContainer>
            <Title color="neutral">Ingresos del Día</Title>
            <Metric color={"gray"} className="opacity-1 text-white">
              {`$ ${numericFormatter(balanceOfDay.toString(), {
                allowLeadingZeros: true,
                thousandSeparator: ".",
                decimalSeparator: ",",
                displayType: "text",
              })}
            `}
            </Metric>
          </CardLayoutTextContainer>
          <CardLayoutTextContainer>
            <Title color="neutral">ventas</Title>
            <Metric className="text-white">{balanceAmount.length}</Metric>
          </CardLayoutTextContainer>
        </Flex>
      </SalesOfDayContainer>
      <SalesListContainer id="infinite-scroll">
        <Title color="neutral">Ventas</Title>
        <InfiniteScroll
          dataLength={sales.length}
          next={() => bringMoreSales()}
          hasMore
          loader={<SpaceLoading />}
          scrollableTarget="infinite-scroll"
        >
          <AccordionList>
            {sales.map((sale, index) => (
              <Accordion
                key={index}
                className="bg-color-transparent border-opacity-0"
              >
                <AccordionHeader>
                  <Flex>
                    <Title className="opacity-1 text-white text-transform-capitalize">
                      {sale.name}{" "}
                    </Title>
                    <Text>
                      <NumericFormat
                        allowLeadingZeros
                        thousandSeparator="."
                        decimalSeparator=","
                        displayType="text"
                        value={sale.amount}
                        renderText={(value) => <span>$ {value}</span>}
                      />
                    </Text>
                  </Flex>
                </AccordionHeader>
                <AccordionBody>
                  <List>
                    {sale.products.map((product, index) => (
                      <ListItem key={index} className="max-w-xs">
                        <Text className="text-ellipsis text-white overflow-hidden">
                          {product.product.name}
                        </Text>
                        <Flex className="w-24 flex-content-right">
                          <span>x{product.quantity}</span>
                          <NumericFormat
                            allowLeadingZeros
                            thousandSeparator="."
                            decimalSeparator=","
                            displayType="text"
                            value={product.product.price}
                            renderText={(value) => <span>$ {value}</span>}
                          />
                        </Flex>
                      </ListItem>
                    ))}
                  </List>
                  <Flex>
                    <Badge size="xl">
                      {sale.payType === "cash"
                        ? "Efectivo"
                        : sale.payType === "debt"
                        ? "Débito"
                        : sale.payType === "credit"
                        ? "Crédito"
                        : null}
                    </Badge>
                    {sale.paidDate !== undefined ? (
                      <Text>{fromStringDate(sale.paidDate)}</Text>
                    ) : null}
                  </Flex>
                </AccordionBody>
              </Accordion>
            ))}
          </AccordionList>
        </InfiniteScroll>
      </SalesListContainer>
    </Container>
  );
};

export default StatisticsPage;
