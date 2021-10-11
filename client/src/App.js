import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import Lading from "./components/Layouts/Lading";
import Auth from "./views/Auth";
import DashBoard from "./views/DashBoard";
import ProtectedRoute from "./components/routing/ProtectedRoute";

function App() {
    return (
        <AuthProvider>
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
                        render={(prop) => (
                            <Auth {...prop} authRoute='register' />
                        )}
                    />
                    <ProtectedRoute
                        exact
                        path='/dashboard'
                        component={DashBoard}
                    />
                </Switch>
            </Router>
        </AuthProvider>
    );
}

export default App;
