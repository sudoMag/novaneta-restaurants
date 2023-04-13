import Balance from "../interfaces/Balance";
import Resume, { CellObject } from "../interfaces/Resume";

const useResumeFormat = () => {
  const createResumeFormat = (sales: Balance[]) => {
    const cellFormat = <T>(
      value: T,
      props?: {
        type?: "s" | "n";
        bold?: boolean;
        currency?: boolean;
        textTheme?: "dark" | "light";
        bgColor?:
          | "bgGray"
          | "purple"
          | "magent"
          | "yellow"
          | "orange"
          | "skyblue";
        endOfList?: boolean;
      }
    ): CellObject<T> => {
      const colors = {
        bgGray: "FFD9D9D9",
        purple: "FF662E9B",
        magent: "FFEA3546",
        yellow: "fff9c80e",
        orange: "fff86624",
        skyblue: "ff43bccd",
      };

      const themeColors = {
        dark: "ff262626",
        light: "ffffffff",
      };

      return {
        v: value,
        t: props?.type ?? "s",
        s: {
          font: {
            color: props?.textTheme
              ? {
                  rgb:
                    props?.bgColor === "yellow"
                      ? themeColors["dark"]
                      : themeColors[props.textTheme],
                }
              : undefined,
            bold: props?.bold ?? false,
          },
          numFmt: props?.currency ? `$ #,###;-$ #,###;$ 0` : undefined,
          fill:
            props?.bgColor !== undefined
              ? {
                  fgColor: {
                    rgb: colors[props?.bgColor],
                  },
                }
              : {
                  fgColor: {
                    rgb: colors["bgGray"],
                  },
                },
          border: props?.endOfList
            ? {
                bottom: {
                  style: "medium",
                  color: { rgb: themeColors.dark },
                },
              }
            : undefined,
        },
      };
    };

    let resume: Resume[] = [];

    sales.forEach((sale, saleIndex) => {
      const saleDate = sale.date.toDate();
      const firstDebtInList = sale.debts[0];
      const fistProductInList = firstDebtInList.products[0];
      const pushFirstLine = (lineData: Resume) => {
        resume.push(lineData);
      };
      const productsQuantity = firstDebtInList.products.length;
      const border = 0 === productsQuantity - 1 ? true : false;

      pushFirstLine({
        Fecha: cellFormat(
          `${saleDate.getDate()}/${
            saleDate.getMonth() + 1
          }/${saleDate.getFullYear()}, ${saleDate.getHours()}:${saleDate.getMinutes()}`,
          {
            bold: true,
          }
        ),
        Total: cellFormat(sale.amount, {
          type: "n",
          bold: true,
          currency: true,
        }),
        Pedido: cellFormat(firstDebtInList.name, { bold: true }),
        Tipo_de_Pago: cellFormat(
          firstDebtInList.payType === "cash"
            ? "Efectivo"
            : firstDebtInList.payType === "debt"
            ? "Débito"
            : "Crédito",
          {
            bold: true,
            textTheme: "light",
            bgColor:
              firstDebtInList.payType === "cash"
                ? "purple"
                : firstDebtInList.payType === "debt"
                ? "magent"
                : "yellow",
          }
        ),
        Tipo_de_Pedido: cellFormat(
          firstDebtInList.type === "to go" ? "Para Llevar" : "Comer En Lugar",
          {
            bold: true,
            bgColor: firstDebtInList.type === "to go" ? "orange" : "skyblue",
          }
        ),
        Producto: cellFormat(fistProductInList.product.name, {
          endOfList: border,
        }),
        Cantidad: cellFormat(fistProductInList.quantity, { endOfList: border }),
        ID_de_Producto: cellFormat(fistProductInList.product.id, {
          endOfList: border,
        }),
        Precio: cellFormat(fistProductInList.product.price, {
          type: "n",
          endOfList: border,
          currency: true,
        }),
        Precio_Total: cellFormat(
          fistProductInList.product.price * fistProductInList.quantity,
          { type: "n", endOfList: border, currency: true }
        ),
      });

      const finalDebtInList = sale.debts.length - 1;
      const pushQuantityOfDebts = (lineData: Resume) => {
        resume.push(lineData);
      };

      sale.debts.forEach((item, debtIndex) => {
        const productsQuantity = item.products.length;
        const border = debtIndex === productsQuantity - 1 ? true : false;

        if (debtIndex > saleIndex) {
          const product = item.products[debtIndex];
          pushQuantityOfDebts({
            Fecha: "",
            Total: "",
            Pedido: cellFormat(item.name, { bold: true }),
            Tipo_de_Pago: cellFormat(
              item.payType === "cash"
                ? "Efectivo"
                : item.payType === "debt"
                ? "Débito"
                : "Crédito",
              {
                bold: true,
                bgColor:
                  firstDebtInList.payType === "cash"
                    ? "purple"
                    : firstDebtInList.payType === "debt"
                    ? "magent"
                    : "yellow",
              }
            ),
            Tipo_de_Pedido: cellFormat(
              item.type === "to go" ? "Para Llevar" : "Comer En Lugar",
              {
                bold: true,
                bgColor: item.type === "to go" ? "orange" : "skyblue",
              }
            ),
            Producto: cellFormat(product.product.name, { endOfList: border }),
            Cantidad: cellFormat(product.quantity, {
              currency: true,
              endOfList: border,
            }),
            ID_de_Producto: cellFormat(product.product.id, {
              endOfList: border,
            }),
            Precio: cellFormat(product.product.price, {
              type: "n",
              endOfList: border,
              currency: true,
            }),
            Precio_Total: cellFormat(product.product.price * product.quantity, {
              type: "n",
              endOfList: border,
              currency: true,
            }),
          });
        }

        if (debtIndex === finalDebtInList && productsQuantity > debtIndex) {
          item.products.forEach((product, productIndex) => {
            if (productIndex > debtIndex) {
              const pushOtherProducts = (lineData: Resume) => {
                resume.push(lineData);
              };
              const border =
                productIndex === productsQuantity - 1 ? true : false;

              pushOtherProducts({
                Fecha: "",
                Total: "",
                Pedido: "",
                Tipo_de_Pago: "",
                Tipo_de_Pedido: "",
                Producto: cellFormat(product.product.name, {
                  endOfList: border,
                }),
                Cantidad: cellFormat(product.quantity, { endOfList: border }),
                ID_de_Producto: cellFormat(product.product.id, {
                  endOfList: border,
                }),
                Precio: cellFormat(product.product.price, {
                  type: "n",
                  endOfList: border,
                  currency: true,
                }),
                Precio_Total: cellFormat(
                  product.product.price * product.quantity,
                  { type: "n", endOfList: border, currency: true }
                ),
              });
            }
          });
        }
      });
    });

    return resume;
  };

  return { createResumeFormat };
};

export default useResumeFormat;
