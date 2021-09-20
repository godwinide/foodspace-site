import Dashboard from "views/Dashboard.js";
import Restaurants from "views/Restaurants.js";
import Orders from "views/Orders";
import Foods from "views/Foods";
import Categories from "views/Categories";
import Customers from "views/Customers";
import Riders from "views/Riders";
import SendNotification from "views/SendNotification";
import ChangePassword from "views/ChangePassword";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/vendors",
    name: "Vendors",
    icon: "fas fa-utensils-alt",
    component: Restaurants,
    layout: "/admin",
  },
  {
    path: "/riders",
    name: "Riders",
    icon: "fas fa-car",
    component: Riders,
    layout: "/admin",
  },
  {
    path: "/orders",
    name: "Orders",
    icon: "fas fa-shopping-cart",
    component: Orders,
    layout: "/admin",
  },
  {
    path: "/foods",
    name: "Foods",
    icon: "fas fa-hamburger",
    component: Foods,
    layout: "/admin",
  },
  {
    path: "/categories",
    name: "Categories",
    icon: "fas fa-list",
    component: Categories,
    layout: "/admin",
  },
  {
    path: "/customers",
    name: "Customers",
    icon: "fas fa-users",
    component: Customers,
    layout: "/admin",
  },
  {
    path: "/send-notification",
    name: "Send Notification",
    icon: "fas fa-bell",
    component: SendNotification,
    layout: "/admin",
  },
  {
    path: "/change-password",
    name: "Change Password",
    icon: "fas fa-lock",
    component: ChangePassword,
    layout: "/admin",
  }

];
export default routes;
