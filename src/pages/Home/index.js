import Header from "./Header";

export const Home = ({ ...args }) => {
  console.log(
    `%c Make width ♥ by %cManuel Casanova `,
    "background-color: red; font-size: 1.2em",
    "background-color: red; font-size: 1.3em; font-weight: bold;"
  );
  return (
    <>
      <Header/>
    </>
  );
};
