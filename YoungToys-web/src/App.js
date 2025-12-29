import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList.js';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx'; // import Register component
import { FaHome, FaShoppingCart, FaSignInAlt, FaBook, FaDev, FaAddressCard } from 'react-icons/fa';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home.jsx';
import AboutUs from './components/AboutUs.js';
import ShowProduct from './components/ShowProduct.js'; // Import ShowProduct component
import { UserAuthContextProvider, useUserAuth } from './context/UserAuthContext.jsx'; // Import UserAuthContext
import ProtectedRoute from './auth/ProtectedRoute.jsx';
import ReactDOM from 'react-dom';
import { Button, Spinner } from 'react-bootstrap'; // Import Button from react-bootstrap

// Component to render products
const Products = ({ products, addToCart }) => (
  <div className="content">
    <h2 id="product_style" class="display-3 mb-3">News</h2>
    <h5 id="product_style2">เป็นสินค้าใหม่และกำลังจะเข้าร้านค้าในเร็วๆนี้</h5>
    <ProductList products={products} addToCart={addToCart} />
  </div>
);

// Component for each tab item in navbar
const TabBarItem = ({ to, children, icon }) => (
  <Link to={to} className="tab-item">
    {icon && React.createElement(icon)}
    {children}
  </Link>
);

// Preloader component
const Preloader = () => (
  <div className="preloader-container">
    <img className="preloader-logo" src="./images/logo-removebg-preview.png" alt="Loading..." />
    <div className="dot-loader">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  </div>
);

const App = () => {
  fetch('http://localhost:3001/products')
    .then(response => response.json())
    .then(data => {
      console.log(data); // ใช้ข้อมูลที่ได้รับเพื่อแสดงในแอป React
    })
    .catch(error => console.error('Error fetching products: ', error));


  const { user, logOut } = useUserAuth(); // Use useUserAuth hook to access user data and logOut function
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Labubu Sesame Bean',
      description: 'THE MONSTERS - Tasty Macarons Vinyl Face Blind Box',
      price: 14.99,
      image: './images/labubu_grey.jpg',
    },
    {
      id: 2,
      name: 'Labubu Sea Salt Coconut',
      description: 'THE MONSTERS - Tasty Macarons Vinyl Face Blind Box',
      price: 14.99,
      image: './images/labubu_blue.jpg',
    },
    {
      id: 3,
      name: 'Labubu Green Grape',
      description: 'THE MONSTERS - Tasty Macarons Vinyl Face Blind Box',
      price: 14.99,
      image: './images/labubu_green.jpg',
    },
    {
      id: 4,
      name: 'Labubu Lychee Berry',
      description: 'THE MONSTERS - Tasty Macarons Vinyl Face Blind Box',
      price: 14.99,
      image: './images/labubu_pink.jpg',
    },
    {
      id: 5,
      name: 'Labubu Soymilk',
      description: 'THE MONSTERS - Tasty Macarons Vinyl Face Blind Box',
      price: 14.99,
      image: './images/labubu_soymilk.jpg',
    },
    {
      id: 6,
      name: 'Labubu Toffee',
      description: 'THE MONSTERS - Tasty Macarons Vinyl Face Blind Box',
      price: 14.99,
      image: './images/labubu_toffee.jpg',
    },
    {
      id: 7,
      name: 'Professor Utoniun',
      description: 'Crybaby X Powerpuff Girls Series Figures',
      price: 18.99,
      image: './images/Professor_Utoniun.jpg',
    },
    {
      id: 8,
      name: 'Bunny Buttercup',
      description: 'Crybaby X Powerpuff Girls Series Figures',
      price: 11.99,
      image: './images/Bunny_Buttercup.jpg',
    },
    {
      id: 9,
      name: 'Bedtime Bubbles',
      description: 'Crybaby X Powerpuff Girls Series Figures',
      price: 16.99,
      image: './images/Bedtime_Bubbles.jpg',
    },
    {
      id: 10,
      name: 'Blossom',
      description: 'Crybaby X Powerpuff Girls Series Figures',
      price: 12.99,
      image: './images/Blossom.jpg',
    },
    {
      id: 11,
      name: 'Mojo Jojo',
      description: 'Crybaby X Powerpuff Girls Series Figures',
      price: 10.99,
      image: './images/Mojo_Jojo.jpg',
    },
    {
      id: 12,
      name: 'Mayor',
      description: 'Crybaby X Powerpuff Girls Series Figures',
      price: 15.99,
      image: './images/Mayor.jpg',
    },
    // Add more products as needed
  ]);
  const [cart, setCart] = useState([]); // Initialize cart state
  const [loading, setLoading] = useState(true); // State for loading indicator

  useEffect(() => {
    // Simulate data loading with setTimeout
    const loadData = () => {
      setTimeout(() => {
        setLoading(false);
      }, 1000); // Simulate 2 seconds loading time
    };

    loadData(); // Call the function to start loading
  }, []);

  // Function to add a product to the cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await logOut();
    } catch (err) {
      console.log(err.message);
    }
  }

  // Render preloader if loading, otherwise render app content
  return (
    <div className="app-container">
      {loading ? (
        <Preloader />
      ) : (
        <>
          {/* Navbar */}
          <video autoPlay loop muted className="video-bg">
            <source src="./images/MEGASPACEMOLLY.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <nav className="tab-bar">
            <img
              className="navbar-brand"
              src="./images/logo-removebg-preview.png"
              style={{ width: '50px', height: '50px' }}
              alt="logo"
            />
            <p>᲼᲼᲼</p>
            <ul className="left-buttons">
              <TabBarItem to="/" icon={FaHome}>
                ᲼Home
              </TabBarItem>
              <TabBarItem to="/products" icon={FaBook}>
                ᲼News
              </TabBarItem>
                <a href="http://localhost/youngtoys_project/show_product.php" className="tab-item">
                  <FaShoppingCart />᲼All Products
                </a>
                <TabBarItem to="/aboutus" icon={FaAddressCard}>
                  ᲼About Us
              </TabBarItem>
            </ul>
            <ul className="right-buttons">
              {/* Check if user is logged in, if yes, display user info and logout button */}
              {user ? (
                <div className="user-info">
                  <p className="user-email">Hi, {user.email}</p>
                  <Button onClick={handleLogout} variant='danger'>Logout</Button>
                </div>
              ) : (
                // If not logged in, display login button
                <TabBarItem to="/login" icon={FaSignInAlt}>
                  ᲼Login
                </TabBarItem>
              )}
            </ul>
          </nav>

          {/* Routes */}
          <Routes>
            <Route path="/products" element={<Products products={products} addToCart={addToCart} />} />
            <Route path="/aboutus" element={<AboutUs cart={cart} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> {/* Route for Register component */}
            <Route path="/show_product" element={<ShowProduct />} /> {/* Route for ShowProduct component */}
            <Route path="/" element={<Home products={products} addToCart={addToCart} />} />
          </Routes>
        </>
      )}
      {/* Footer section */}
      <div className="container">
        <footer id="footer">
          <div className="row">
            <div className="col-xl-6 col-12">
              <div className="row">
                <div className="col-xl-2 col-3">
                  <img src="./images/logo-removebg-preview.png" alt="Logo" width="80" className="ml-4" />
                </div>
                <div className="mt-xl-3 col-xl-4 col-6">
                  <div className="text-display pl-2">
                    <h5>YoungToys</h5>
                    <span>Best Store</span>
                  </div>
                </div>
              </div>
              <p className="mt-xl-2 mt-4">เว็บไซต์ของเราเป็นเว็บเกี่ยวกับการขายของเล่น ซึ่งมีหลากหลายประเภทให้เลือกซื้อ สามารถเข้าไปชมสินค้าของเราได้เลย หรือถ้ามีปัญหาอยากติดต่อสอบถามสามารถทักมาทางช่องทางที่เราได้แนบไว้ได้เลย พวกเราผมให้บริการเสมอค่ะ</p>
            </div>
            <div className="col-xl-3 col-6">
              <h5>หมวดหมู่</h5>
              <ul>
                <li><a href="/products" className="nuxt-link-exact-active nuxt-link-active" aria-current="page">Toys</a></li>
                <li><a href="/products" className="nuxt-link-exact-active nuxt-link-active" aria-current="page">Doll</a></li>
                <li><a href="/products" className="nuxt-link-exact-active nuxt-link-active" aria-current="page">Gun</a></li>
                <li><a href="/products" className="nuxt-link-exact-active nuxt-link-active" aria-current="page">Kid</a></li>
              </ul>
            </div>
            <div className="col-xl-3 col-6">
              <h5>ช่องทางต่างๆ</h5>
              <ul>
                <li><a href="https://www.tiktok.com">Tiktok</a></li>
                <li><a href="https://facebook.com">Facebook</a></li>
                <li><a href="https://youtube.com">Youtube</a></li>
                <li><a href="https://discord.gg">Discord</a></li>
              </ul>
            </div>
          </div>
          <hr className="divide-hr" />
          <div className="row">
            <div className="col-xl-6 col-12">
              <p>Copyright © 2024 YoungToys</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
