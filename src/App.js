import { Switch, Route, Router,Redirect } from "wouter";
import { useLocationProperty, navigate } from "wouter/use-location";

// all pages
import NoInternetPage from "./pages/NoInternet";
import PropertyListPage from "./pages/PropertyListPage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import PageLoader from "./pages/PageLoader";
import OwnerListPage from "./pages/OwnerListPage";
import LandListPage from "./pages/LandListPage";
import TestPage from "./pages/TestPage";
import AddingPage from "./pages/AddingPage";
import AddingLandPage from "./pages/AddingLandPage";
import OwnerCreation from "./pages/OwnerCreation";
import OwnerEditingPage from "./pages/OwnerEditingPage";
import LocationEditingPage from "./pages/LocationEditingPage";
import PropertyEditingPage from "./pages/PropertyEditingPage";
import LandEditingPage from "./pages/LandEditingPage";
import LocationListPage from"./pages/LocationListPage";
import LocationCreationPage from "./pages/LocationCreationPage";
import FullNameUpdating from "./pages/FullNameUpdating";
import EmailUpdating from "./pages/EmailUpdating";
//all components
import Navbar from "./components/Navbar";

//redux
import { useSelector } from "react-redux";
import { useEffect } from "react";

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
                {!user && <Redirect to="/login" />}
                {user && <PropertyListPage />}
              </Route>
              <Route path="/land">
                {!user && <Redirect to="/login" />}
                {user && <LandListPage />}
              </Route>
              <Route path="/owner-list">
                {!user && <Redirect to="/login" />}
                {user && <OwnerListPage />}
              </Route>
              <Route path="/location-list">
                {!user && <Redirect to="/login" />}
                {user && <LocationListPage />}
              </Route>
              <Route path="/Adding">
                {!user && <Redirect to="/login" />}
                {user && <AddingPage />}
              </Route>
              <Route path="/AddingLandPage">
                {!user && <Redirect to="/login" />}
                {user && <AddingLandPage />}
              </Route>
              <Route path="/create-owner">
                {!user && <Redirect to="/login" />}
                {user && <OwnerCreation />}
              </Route>
              <Route path="/create-location">
                {!user && <Redirect to="/login" />}
                {user && <LocationCreationPage />}
              </Route>
              <Route  path="/edit-owner/:ownerId">
                {!user && <Redirect to="/login" />}
                {user && <OwnerEditingPage />}
              </Route>
              <Route  path="/edit-property/:propertyId">
                {!user && <Redirect to="/login" />}
                {user && <PropertyEditingPage />}
              </Route>
              <Route  path="/edit-land/:landId">
                {!user && <Redirect to="/login" />}
                {user && <LandEditingPage />}
              </Route>
              <Route  path="/edit-location/:ownerId">
                {!user && <Redirect to="/login" />}
                {user && <LocationEditingPage />}
              </Route>
              <Route  path="/update-fullName/:censusTakerId">
                {!user && <Redirect to="/login" />}
                {user && <FullNameUpdating/>}
              </Route>
              <Route  path="/update-email/:censusTakerId">
                {!user && <Redirect to="/login" />}
                {user && <EmailUpdating/>}
              </Route>
              <Route path="/nosignal">
                <div>
                  <NoInternetPage />
                </div>
              </Route>
              <Route path="/test">
                <div className="mt-5">
                  <TestPage />
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
