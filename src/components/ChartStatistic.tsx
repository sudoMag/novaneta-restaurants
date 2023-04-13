import styled from "styled-components";
import Balance from "../interfaces/Balance";
import { AreaChart, Card, Title } from "@tremor/react";
import { numericFormatter } from "react-number-format";
import { useEffect, useState } from "react";

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

type ChartData = {
  date: string;
  Hoy: number;
};

const ChartStatistic = ({ data }: { data: Balance[] }) => {
  const [dataChart, setDataChart] = useState<ChartData[]>([]);

  const dataFormatter = (number: number) => {
    return `$ ${numericFormatter(number.toString(), {
      allowLeadingZeros: true,
      thousandSeparator: ".",
      decimalSeparator: ",",
      displayType: "text",
    })}`;
  };

  useEffect(() => {
    let newList: ChartData[] = [];

    data.forEach((balance) => {
      const date = balance.date.toDate();
      const ItemIndex = newList.findIndex(
        (item) => item.date === `${date.getHours()}hrs`
      );

      if (ItemIndex !== -1) {
        newList[ItemIndex].Hoy = newList[ItemIndex].Hoy + balance.amount;
      } else {
        newList.push({
          date: `${date.getHours()}hrs`,
          Hoy: balance.amount,
        });
      }
    });
    setDataChart(newList);
  }, [data]);

  return (
    <Container>
      <Card>
        <Title color="neutral">Ingresos del día</Title>
        <AreaChart
          className="h-72 mt-4"
          data={dataChart}
          index="date"
          categories={["Hoy"]}
          colors={["indigo", "cyan"]}
          valueFormatter={dataFormatter}
        />
      </Card>
    </Container>
  );
};

export default ChartStatistic;
