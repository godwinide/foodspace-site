import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { getCustomers } from "actions/customer";
import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "assets/css/custom.css";
import "assets/css/index.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "layouts/Admin.js";
import CustomerDetails from "views/CustomerDetails";
import { getOrders } from 'actions/orders';
import { getFoods } from 'actions/foods';
import { getCategories } from 'actions/categories';
import { getRestaurants } from 'actions/restaurants';
import { getRiders } from 'actions/riders';

import AddFood from 'views/AddFood';
import Login from 'views/Login';
import store from 'store';
import EditVendor from 'views/EditVendor';
import EditCategory from 'views/EditCategory';
import EditRider from 'views/EditRider';
import EditFood from 'views/EditFood';
import OrderDetails from 'views/OrderDetails';

const App = ({userToken, getCustomers, getFoods, getOrders, getCategories, getRestaurants, getRiders}) => {
    useEffect(()=> {
        getRiders(userToken);
        getCustomers(userToken);
        getOrders(userToken);
        getFoods(userToken);
        getCategories(userToken);
        getRestaurants(userToken);
    }, [userToken])
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
                <PrivateRoute exact path="/customer-details/:id" component={CustomerDetails} />
                <PrivateRoute exact path="/order-details/:id" component={OrderDetails} />
                <PrivateRoute exact path="/add-food/" component={AddFood} />
                <PrivateRoute exact path="/edit-vendor/:id" component={EditVendor} />
                <PrivateRoute exact path="/edit-food/:id" component={EditFood} />
                <PrivateRoute exact path="/edit-category/:id" component={EditCategory} />
                <PrivateRoute exact path="/edit-rider/:id" component={EditRider} />
                <ForwardAuthenticated exact path="/login/" component={Login} />
                <Redirect to="/admin/dashboard" />
            </Switch>
        </BrowserRouter>
    )
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => store.getState().auth.isAuthenticated
    ? <Component {...props} /> : <Redirect to="/login"/>}
    />
)

const ForwardAuthenticated = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => store.getState().auth.isAuthenticated
    ?<Redirect to="/admin/dashboard"/>:<Component {...props}/>}
    />
)

const mapStateToProps = state => ({
    userToken: state.auth.token
})

export default connect(mapStateToProps, {getCustomers, getRestaurants, getCategories, getOrders, getFoods, getRiders})(App)
