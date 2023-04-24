const getDate = (date?: Date) => {
  const now = date ?? Date.now();
  return `${new Date(now).toLocaleDateString()} ${new Date(
    now
  ).getHours()}:${new Date(now).getMinutes()}`;
};

export default getDate;
