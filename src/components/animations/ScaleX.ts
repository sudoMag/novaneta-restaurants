import { keyframes } from "styled-components";

const ScaleX = keyframes`
  0% {
    transform: translate(-50%) scaleX(0);
  }
  100% {
    transform: translate(0%) scaleX(1);
  }
`;

export default ScaleX;
