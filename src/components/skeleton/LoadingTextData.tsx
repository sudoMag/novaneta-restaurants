import styled from "styled-components";

export const TemplateH2 = styled.div`
  width: 5em;
  margin-botton: 5px;
  height: 1.2em;
  background-color: #8b8b8b;
  border-radius: 50px;
`;

export const TemplateText = styled.div`
  width: 100%;
  height: 1em;
  margin: 5px 0;
  background-color: #8b8b8b;
  border-radius: 50px;
`;

export const TemplateTextArea = (linesNumber: number) => {
  const lines: number[] = Array.from({length: linesNumber}, (v, i) => i);

  return (
    <>
      {lines.map((index) => {
        return <TemplateText key={index} />;
      })}
    </>
  );
};
