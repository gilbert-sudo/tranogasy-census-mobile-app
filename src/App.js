import { Switch, Route, Router, Redirect } from "wouter";
import { useLocationProperty, navigate } from "wouter/use-location";

// all pages
import NoInternetPage from "./pages/NoInternet";
import PropertyListPage from "./pages/PropertyListPage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import PageLoader from "./pages/PageLoader";
import OwnerListPage from "./pages/OwnerListPage";

//all components
import Navbar from "./components/Navbar";

//redux
import { useSelector } from "react-redux";

// returns the current hash location in a normalized form
// (excluding the leading '#' symbol)
const hashLocation = () => window.location.hash.replace(/^#/, "") || "/";

const hashNavigate = (to) => navigate("#" + to);

const useHashLocation = () => {
  const location = useLocationProperty(hashLocation);
  return [location, hashNavigate];
};

function App() {
  const loader = useSelector((state) => state.loader);
  const user = useSelector((state) => state.user);

  // Render the main content

  return (
    <div className="App">
      <Router hook={useHashLocation}>
        <div className="App">
          {user && loader && <Navbar />}
          <main>
            <Switch>
              {/* <Route path="/info">
                <Redirect to="/about" />
              </Route> */}
              <Route path="/">
                {/* <PropertyListPage /> */}
                {loader && <Redirect to="/login" />}
                {!loader && <PageLoader />}
              </Route>
              <Route path="/user">
                <UserPage />
              </Route>
              <Route path="/login">
                {/* <PropertyListPage /> */}
                {user && <Redirect to="/user" />}
                {!user && <LoginPage />}
              </Route>
              <Route path="/loader">
                {/* <PropertyListPage /> */}
                <PageLoader />
              </Route>
              <Route path="/property">
                <PropertyListPage />
              </Route>
              <Route path="/owner-list">
                <OwnerListPage />
              </Route>
              <Route path="/nosignal">
                <div>
                  <NoInternetPage />
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
