import './App.css';
import Home from './Pages/Home';
import ProductList from './Pages/ProductList';
import Product from './Pages/Product';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Cart from './Pages/Cart';
import { 
  BrowserRouter as Router,
  Route,
  Routes,
  // Redirect
} from 'react-router-dom';
import Success from './Pages/Success';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector((state) => state.user.currentUser)
  return (
    <Router>
      <Routes>
        <Route exact path = "/" element = {<Home/>}/>
        <Route exact path = "/products" element = {<ProductList/>}/>
        <Route path = "/products/:category" element = {<ProductList/>}/>
        <Route path = "/product/:id" element = {<Product/>}/>
        <Route path = "/cart" element = {<Cart/>}/>
        <Route path = "/success" element = {<Success/>}/>
        <Route path = "/login" element = {user?<Home/>:<Login/>}/>
        <Route path = "/register" element = {<Register/>}/>
      </Routes>
    </Router>
  );
}

export default App;
