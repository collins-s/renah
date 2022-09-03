import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Categories from './Components/Categories';
import ProductDescription from './Components/ProductPreview';
import Cart from './Components/Cart';
import PrivacyPolicy from './Components/PrivacyPolicy';
import TermsAndConditions from "./Components/TermsAndConditions";
import Admin from "./Admin/Admin";


function App() {
  
  return (
    <Router>
      <div className="App">
        {/* <Navbar /> */}

        <div className="">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/categories/:categoryType">
              <Categories />
            </Route>
            <Route path="/products/:id">
              <ProductDescription />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
            <Route path="/privacy policy">
              <PrivacyPolicy />
            </Route>
            <Route path="/terms and conditions">
              <TermsAndConditions />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>

          </Switch>
        </div>
        {/* <Footer /> */}
      </div>
    </Router>
    
  );
}

export default App;
