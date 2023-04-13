export interface CellObject<V> {
  v: V;
  t?: "n" | "s";
  s?: {
    font?: {
      bold?: boolean;
      color?: {rgb: string};
    };
    numFmt?: string;
    fill?: {
      fgColor?: {rgb: string};
    }
    border?: {
      bottom: {
        style: string,
        color: {rgb: string}
      }
    }
  };
}



export default interface Resume {
  Fecha: CellObject<string> | "";
  Total: CellObject<number> | "";
  Pedido: CellObject<string> | "";
  Tipo_de_Pago: CellObject<"Efectivo" | "Débito" | "Crédito"> | "";
  Tipo_de_Pedido: CellObject<"Para Llevar" | "Comer En Lugar"> | "";
  Producto: CellObject<string> | "";
  Cantidad: CellObject<number> | "";
  ID_de_Producto: CellObject<string> | "";
  Precio: CellObject<number> | "";
  Precio_Total: CellObject<number> | "";
}
