import { useEffect, useState } from "react";
import Balance from "../../../../utils/types/Balance";

const useDailyBalance = (AmountsList: Balance[]) => {
  const [balanceOfDay, setBalanceOfDay] = useState(0);

  useEffect(() => {
    let amount = 0;
    AmountsList.forEach((item) => {
      amount += item.amount;
    });
    setBalanceOfDay(amount);
  }, [AmountsList]);

  return { balanceOfDay };
};

export default useDailyBalance;
