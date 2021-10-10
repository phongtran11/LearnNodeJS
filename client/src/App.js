import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Lading from "./components/Layouts/Lading";
import Auth from "./views/Auth";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Lading} />
                <Route
                    exact
                    path='/login'
                    render={(prop) => <Auth {...prop} authRoute='login' />}
                />
                <Route
                    exact
                    path='/register'
                    render={(prop) => <Auth {...prop} authRoute='register' />}
                />
            </Switch>
        </Router>
    );
}

export default App;
