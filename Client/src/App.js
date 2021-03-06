import React, {useContext, useEffect} from 'react';

import Home from "./pages/Home";
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AddMusic from './pages/AddMusic';
import AddArtist from './pages/AddArtist';
import ListTransactions from './pages/ListTransactions';
import Pay from './pages/Pay';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import PrivateRoute from './componentRoutes/PrivateRoutes';
import { UserContext } from './context/UserContext';
import {API} from "./config/api"


function App() {
    let history = useHistory();
    console.log(history)
    const [state, dispatch] = useContext(UserContext)

    useEffect(() => {
        if (state.isLogin === false) {
            // history.push("/")
            <Link to ="/" />
        } else {
            if (state.user.status === "admin") {
                history.push("/listtransactions")
            } else if (state.user.status === "user") {
                history.push("/")
            }
        }
    }, [state, history])

    const checkUser = async () => {
        try {
            const response = await API.get('/check-auth')

            if (response.status === 404) {
                return dispatch({
                    type: "AUTH_ERROR"
                })
            }

            let payload = response.data.data.user
            payload.token = localStorage.token

            dispatch({
                type: "USER_SUCCESS",
                payload
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        checkUser();
    })

    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <PrivateRoute exact path="/addmusic" component={AddMusic} />
                <PrivateRoute exact path="/addartis" component={AddArtist} />
                <PrivateRoute exact path="/listtransactions" component={ListTransactions} />
                <PrivateRoute exact path="/pay" component={Pay} />
            </Switch>
        </Router>
  );
}

export default App;
