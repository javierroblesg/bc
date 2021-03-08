import Home from './components/Home/Home';
import Users from './components/Users/UsersRouter';
import Agenda from './components/Agenda/Agenda';

const routes = [
  {
    path: "/home",
    name: "Inicio",
    icon: "fa fa-fw fa-home",
    color: "#cc0cc6",
    component: Home,
    layout: "/admin",
    module: 0
  },
  {
    path: "/users",
    name: "Usuarios",
    icon: "fa fa-fw fa-users",
    color: "#4f9e1b",
    component: Users,
    layout: "/admin",
    module: 1
  },
  {
    path: "/agenda",
    name: "Agenda",
    icon: "fa fa-fw fa-calendar",
    color: "#143aa3",
    component: Agenda,
    layout: "/admin",
    module: 2
  }
];

export default routes;