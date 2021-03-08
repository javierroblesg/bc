import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './Sidebar.css';

const Sidebar = props => {
  let history = useHistory();
  const location = useLocation();
  return (
    <SideNav style={{backgroundColor: '#f3f2f1'}} onSelect={(selected) => {
      history.push(selected)
    }}>
      <Toggle/>
      <Nav defaultSelected={location.pathname}>
        {props.routes.map(route => {
          if (props.auth.modules[route.module] !== 0) {
            return (
              <NavItem eventKey={route.path} key={route.path}>
                <NavIcon>
                  <i className={route.icon} style={{ fontSize: '1.75em', color: route.color }} />
                </NavIcon>
                <NavText style={{ fontSize: 15, fontWeight: 400, color: '#666' }}>
                  {route.name}
                </NavText>
              </NavItem>
            )
          } else {
            return null;
          }
        })}
      </Nav>
    </SideNav>
  )
};

export default Sidebar;