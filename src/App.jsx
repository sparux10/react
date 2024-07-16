import { Routes, Route } from 'react-router-dom'
import Home from "./pages/web/Home";
import Dashbord from './pages/Dashbord/Dashbord';
import Register from './pages/web/reg-log/Register';
import Login from './pages/web/reg-log/Login';
import RequireAuth from './Auth/RequireAuth'
import Users from './pages/Dashbord/read/User';
import Update from './pages/Dashbord/update/UpdateUser';
import Adduser from './pages/Dashbord/create/AddUser';
import Requirelog from './Auth/RequireLog';
import Profile from './pages/web/Profile/Profile';
import Products from './pages/Dashbord/read/Products';
import Categories from './pages/Dashbord/read/Categories';
import AddCategory from './pages/Dashbord/create/AddCategory';
import AddProduct from './pages/Dashbord/create/AddProduct';
import UserDetails from './pages/Dashbord/details/UserDetails';

export default function App() {
  return (
    <div>
      <Routes>
        {/*public routes*/}
        <Route element={<Home />} path='/' />
        <Route element={<Register />} path='/register' />
        <Route element={<Login />} path='/login' />

        <Route element={<Requirelog />}>
          <Route element={<Profile />} path='/profile' />
        </Route>

      {/*protected routes*/}
      
      <Route element={<Dashbord />} path='/dashbord' >
        <Route element={<Users />} path='users' />
        <Route element={<Adduser />} path='users/add' />
        <Route element={<Update />} path='users/:id' />
        <Route element={<UserDetails />} path='users/details/:id' />

        <Route element={<Products />} path='products' />
        <Route element={<AddProduct />} path='product/add' />

        <Route element={<Categories />} path='categories' />
        <Route element={<AddCategory />} path='categories/add' />

        <Route element={<RequireAuth allowedRole={["full admin", "sub admin"]} />}>
        </Route>
      </Route>
    </Routes>

    </div >
  )
}
