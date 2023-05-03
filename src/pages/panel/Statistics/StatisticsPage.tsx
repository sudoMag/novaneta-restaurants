import useStatistics from "../../../hooks/useStatistics";
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
import ChartStatistic from "./components/Chart/ChartStatistic";
import useResume from "../../../hooks/useResume";
import {
  CardLayoutTextContainer,
  Container,
  DownloadButton,
  ExcelDownloadContainer,
  SalesListContainer,
  SalesOfDayContainer,
  SpaceLoading,
} from "./StatisticsStyles";
import useDailyBalance from "./hooks/useDailyBalance";
import timestampToString from "../../../utils/TimeStampToString";

const StatisticsPage = () => {
  const { balanceAmount, sales, bringMoreSales } = useStatistics();
  const { monthsWithResume, getDataFromMonth } = useResume();
  const { balanceOfDay } = useDailyBalance(balanceAmount);

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
                      <Text>{timestampToString(sale.paidDate)}</Text>
                    ) : null}
                  </Flex>
                </AccordionBody>
              </Accordion>
            ))}
          </AccordionList>
        </InfiniteScroll>
      </SalesListContainer>
      <ExcelDownloadContainer>
        <Title color="neutral">Resumen</Title>
        <AccordionList>
          {monthsWithResume.map((month, index) => (
            <Accordion
              key={index}
              className="bg-color-transparent border-opacity-0"
            >
              <AccordionHeader>{month.monthName}</AccordionHeader>
              <AccordionBody>
                <DownloadButton onClick={() => getDataFromMonth(month)}>
                  Descargar (.xlsx)
                </DownloadButton>
              </AccordionBody>
            </Accordion>
          ))}
        </AccordionList>
      </ExcelDownloadContainer>
    </Container>
  );
};

export default StatisticsPage;
