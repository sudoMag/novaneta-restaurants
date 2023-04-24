import { useCallback, useContext, useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/configuration";
import XLSX from "sheetjs-style";

import { UserContext } from "../context/UserContext";
import Balance from "../utils/types/Balance";
import useResumeFormat from "./useResumeFormat";

const useResume = () => {
  const { user } = useContext(UserContext);
  const [monthsWithResume, setMonthWithResume] = useState<
    {
      monthName: string;
      monthNumber: number;
      year: number;
    }[]
    >([]);
    const {createResumeFormat} = useResumeFormat()

  const createResume = useCallback(
    (
      monthData: {
        monthName: string;
        monthNumber: number;
        year: number;
      },
      sales: Balance[]
    ) => {
      const ws = XLSX.utils.json_to_sheet(createResumeFormat(sales));
      console.log(ws);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Data");
      XLSX.writeFile(wb, `${monthData.monthName}-${monthData.year}.xlsx`);
    },
    [createResumeFormat]
  );

  const getDataFromMonth = (monthData: {
    monthName: string;
    monthNumber: number;
    year: number;
  }) => {
    const q = query(
      collection(
        db,
        `Users/${user?.uid}/Balcance/
        ${monthData.year}/${monthData.monthNumber}`
      ),
      orderBy("date", "asc")
    );

    getDocs(q)
      .then((docs) => {
        const salesOfMonth: Balance[] = [];
        docs.forEach((month) => {
          const { amount, date, debts } = month.data();
          salesOfMonth.push({ amount, date, debts });
        });
        console.log(salesOfMonth);
        createResume(monthData, salesOfMonth);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const now = new Date();
    const yearOfDate = now.getFullYear();
    const q = query(
      collection(
        db,
        `Users/${user?.uid}/Balcance/
        ${yearOfDate}/MonthsResume`
      )
    );

    getDocs(q)
      .then((docs) => {
        const monthsList: {
          monthName: string;
          monthNumber: number;
          year: number;
        }[] = [];
        docs.forEach((month) => {
          const { monthName, monthNumber, year } = month.data();
          monthsList.push({ monthName, monthNumber, year });
        });
        setMonthWithResume(monthsList);
        console.log(monthsList);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user?.uid]);
  return { monthsWithResume, getDataFromMonth };
};

export default useResume;
