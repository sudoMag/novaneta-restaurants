import { NavLink } from "react-router-dom";
import styled from "styled-components";

const RouteLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.9, -0.01, 0.25, 1.08);
`;

const CustomNavLink = ({ children, to }: { children: string; to: string }) => {
  return (
    <li>
      <RouteLink to={to}>{children}</RouteLink>
    </li>
  );
};

export default CustomNavLink;
