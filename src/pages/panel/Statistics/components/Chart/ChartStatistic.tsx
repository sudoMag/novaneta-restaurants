import Balance from "../../../../../utils/types/Balance";
import { AreaChart, Card, Title } from "@tremor/react";
import { useEffect, useState } from "react";
import { ChartData } from "./types";
import { Container } from "./ChartStyles";
import numberFormat from "../../../../../utils/numberFormat";

const ChartStatistic = ({ data }: { data: Balance[] }) => {
  const [dataChart, setDataChart] = useState<ChartData[]>([]);

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
          valueFormatter={numberFormat}
        />
      </Card>
    </Container>
  );
};

export default ChartStatistic;
