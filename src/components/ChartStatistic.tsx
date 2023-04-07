import styled from "styled-components";
import Balance from "../interfaces/Balance";
import { AreaChart, Card, Title } from "@tremor/react";
import { numericFormatter } from "react-number-format";

const Container = styled.section`
  overflow-y: auto;
  background-color: var(--bg-color);
  /* padding: 20px; */
  border-radius: 10px;
  grid-column: 1 / 3;
  grid-row: 1 / 1;

  & .tremor-Card-root {
    background-color: transparent;
    --tw-ring-opacity: 0;
    box-shadow: none;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ChartStatistic = ({ data }: { data: Balance[] }) => {
  /* const chartdata = [
    {
      date: "Jan 22",
      SemiAnalysis: 2890,
      "The Pragmatic Engineer": 2338,
    },
    {
      date: "Feb 22",
      SemiAnalysis: 2756,
      "The Pragmatic Engineer": 2103,
    },
    {
      date: "Mar 22",
      SemiAnalysis: 3322,
      "The Pragmatic Engineer": 2194,
    },
    {
      date: "Apr 22",
      SemiAnalysis: 3470,
      "The Pragmatic Engineer": 2108,
    },
    {
      date: "May 22",
      SemiAnalysis: 3475,
      "The Pragmatic Engineer": 1812,
    },
    {
      date: "Jun 22",
      SemiAnalysis: 3129,
      "The Pragmatic Engineer": 1726,
    },
  ]; */

  const dataFormatter = (number: number) => {
    return `$ ${numericFormatter(number.toString(), {
      allowLeadingZeros: true,
      thousandSeparator: ".",
      decimalSeparator: ",",
      displayType: "text",
    })}`;
  };

  return (
    <Container>
      <Card>
        <Title color="neutral">Ingresos del día</Title>
        <AreaChart
          className="h-72 mt-4"
          data={data}
          index="date"
          categories={["amount"]}
          colors={["indigo", "cyan"]}
          valueFormatter={dataFormatter}
        />
        {/* <AreaChart
          className="h-72 mt-4"
          data={chartdata}
          index="date"
          categories={["SemiAnalysis", "The Pragmatic Engineer"]}
          colors={["indigo", "cyan"]}
          valueFormatter={dataFormatter}
        /> */}
      </Card>
    </Container>
  );
};

export default ChartStatistic;
