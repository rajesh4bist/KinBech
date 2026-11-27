import './App.css'
import { Routes, Route } from 'react-router'
import HomePage from './Pages/Home/HomePage'
import Header from './Components/header'
import Orders from './Pages/OrdersPage/Orders'
import Cart from './Pages/Cart/Cart'
import SignUp from './Pages/SignUp/SignUp'
import Login from './Pages/SignUp/Login'
import { useState, useEffect } from 'react'
import AccountPage from './Pages/Account/Account'

function App() {

  const [userResponse, setUserResponse] = useState(() => {
    const email = localStorage.getItem('userEmail')
    const name = localStorage.getItem('userName')
    return email ? { email, name } : null
  });

  useEffect(() => {
    if (userResponse) {
      localStorage.setItem('userEmail', userResponse.email)
      localStorage.setItem('userName', userResponse.name)
    } else {
      localStorage.removeItem('userEmail')
      localStorage.removeItem('userName')
    }
  }, [userResponse])

  return (
    <>
      <Header userResponse={userResponse} />

      <main className="main-content">
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='orders' element={<Orders />}></Route>
          <Route path='cart' element={<Cart />}></Route>
          <Route path='signup' element={<SignUp />}></Route>
          <Route path='login' element={<Login setUserResponse={setUserResponse} />}></Route>
          <Route path='account' element={<AccountPage userResponse={userResponse} />}></Route>
        </Routes>
      </main>
    </>
  )
}

export default App
