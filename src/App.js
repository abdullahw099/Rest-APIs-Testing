import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import Admin from "./pages/Admin";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <>
      <div>
        <Router>
          <Switch>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/edit">
              <Edit />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
