import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOTP from "./pages/VerifyOTP";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";

// Protected pages
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";

// Admin
import AdminDashboard from "./admin/AdminDashboard";
import AdminRoute from "./routes/AdminRoute";
import AdminProducts from "./admin/Products";
import AdminUsers from "./admin/Users";
import AdminOrders from "./admin/Orders";
import CreateProduct from "./admin/CreateProduct";
import EditProduct from "./admin/EditProduct";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Route protection
import ProtectedRoute from "./routes/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* ==================== PUBLIC ROUTES ==================== */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/verify-otp" element={<VerifyOTP />} />

        <Route path="/products" element={<Products />} />

        <Route path="/products/:id" element={<ProductDetails />} />

        <Route path="/cart" element={<Cart />} />

        {/* ==================== PROTECTED ROUTES ==================== */}

        <Route element={<ProtectedRoute />}>
          <Route path="/checkout" element={<Checkout />} />

          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* ==================== ADMIN ROUTES ==================== */}

        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/products/create" element={<CreateProduct />} />
          <Route path="/admin/products/edit/:id" element={<EditProduct />} />
        </Route>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
