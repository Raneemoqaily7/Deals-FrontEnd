 import { NavLink as Link } from "react-router-dom";
export const PrimaryNav = styled.nav`
  z-index: 14;
  height: 90px;
  display: flex;
  background: rgba(51, 51, 51, 255);
  justify-content: space-between;
  padding: 10px;
  font-family: cursive;
  font-size: 18px;
`;
export const MenuLink = styled(Link)`
  color: white;
  display: flex;
  cursor: pointer;
  align-items: center;
  text-decoration: none;
  padding: 0 1.2rem;
  height: 100%;
  &.active {
    color: white;
  }
`;

export const Menu = styled.div`
  color: white;
  display: flex;
  align-items: center;
  margin-right: -25px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`