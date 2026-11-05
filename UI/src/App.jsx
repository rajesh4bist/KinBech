import './App.css'
import { Routes, Route } from 'react-router'
import HomePage from './Pages/Home/HomePage'
import Header from './Components/header'
import Orders from './Pages/OrdersPage/Orders'
import Cart from './Pages/Cart/Cart'
import SignUp from './Pages/SignUp/SignUp'
import Login from './Pages/SignUp/Login'
import { useState } from 'react'

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [userResponse, setUserResponse] = useState(null);

  return (
    <>
      <Header loggedIn={loggedIn} userResponse={userResponse} />

      <main className="main-content">
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='orders' element={<Orders />}></Route>
          <Route path='cart' element={<Cart />}></Route>
          <Route path='signup' element={<SignUp />}></Route>
          <Route path='login' element={<Login setLoggedIn={setLoggedIn} setUserResponse={setUserResponse} />}></Route>
        </Routes>
      </main>
    </>
  )
}

export default App
