
import {Routes,Route} from "react-router-dom"
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateList from "./pages/CreateList";
import Listings from "./pages/Listings";
import DetailsPage from "./pages/DetailsPage";
import HostedPlaces from "./pages/HostedPlaces";
import EditPlace from "./pages/EditPlace";
import CategorySelect from "./components/CategorySelect";
import CategoryWise from "./pages/CategoryWise";
import SearchResults from "./pages/SearchResults";
import WishList from "./pages/WishList";
import BookedPlaces from "./pages/BookedPlaces";
import PrivateRoute from "./pages/PrivateRoute";
function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<HomePage/>}>
          
          <Route path="" element={<CategorySelect/>}>
            <Route path="" element={<Listings/>}/>
            <Route path="category/:q" element={<CategoryWise/>} />
            <Route path="search/:q" element={<SearchResults/>}/>
          </Route>
          
          <Route path="login" element={<LoginPage/>}/>
          <Route path="register" element={<RegisterPage/>}/>
          <Route path="host-a-place" element={<PrivateRoute><CreateList/></PrivateRoute>}/>
          <Route path="place/:id" element={<DetailsPage/>}/>
          <Route path="wish-list"  element={<PrivateRoute><WishList/></PrivateRoute>}/>
          <Route path="hosted-places" element={<PrivateRoute><HostedPlaces/></PrivateRoute>}/>
          <Route path="edit-a-place/:id" element={<PrivateRoute><EditPlace/></PrivateRoute>}/>
          <Route path="booked-places" element={<PrivateRoute><BookedPlaces/></PrivateRoute>}/>
        </Route>
        
        
      </Routes>
    </div>
  );
}

export default App;
