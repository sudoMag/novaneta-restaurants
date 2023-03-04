import { keyframes } from "styled-components";

const OpacityAndTranslate = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-200px);
  }

  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export default OpacityAndTranslate;
