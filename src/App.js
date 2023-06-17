import { Switch, Route, Router } from "wouter";
import { useLocationProperty, navigate } from "wouter/use-location";

// all pages
import PropertyListPage from "./pages/PropertyListPage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";

//all components
import Navbar from "./components/Navbar";

// returns the current hash location in a normalized form
// (excluding the leading '#' symbol)
const hashLocation = () => window.location.hash.replace(/^#/, "") || "/";

const hashNavigate = (to) => navigate("#" + to);

const useHashLocation = () => {
  const location = useLocationProperty(hashLocation);
  return [location, hashNavigate];
};

function App() {
  return (
    <div className="App">
      <Router hook={useHashLocation}>
        <div className="App">
          <Navbar />
          <main>
            <Switch>
              {/* <Route path="/info">
                <Redirect to="/about" />
              </Route> */}
              <Route path="/">
                {/* <PropertyListPage /> */}
                <center className="mt-5">
                  <b>404:</b> PropertyListPage!
                </center>
              </Route>
              <Route path="/user">
                <UserPage />
              </Route>
              <Route path="/login">
                {/* <PropertyListPage /> */}
                <LoginPage />
              </Route>
              <Route path="/property">
                <div className="mt-5">
                  <PropertyListPage />
                </div>
              </Route>

              <Route path="/:anything*">
                <center className="mt-5">
                  <b>404:</b> Sorry, this page isn't ready yet!
                </center>
              </Route>
            </Switch>
          </main>
        </div>
      </Router>
    </div>
  );
}

export default App;
