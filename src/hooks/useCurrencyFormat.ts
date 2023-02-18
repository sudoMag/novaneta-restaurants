const useCurrencyFormat = () => {
  const formatCurrency = (format: string, value: number) => {
    switch (format) {
      case "USD":
        return new Intl.NumberFormat("en-US").format(value);
      case "CLP":
        return new Intl.NumberFormat("es-ES").format(value);
      default:
        return new Intl.NumberFormat("en-US").format(value);
    }
  };

  return { formatCurrency };
};

export default useCurrencyFormat;
