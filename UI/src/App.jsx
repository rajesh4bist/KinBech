import './App.css'
import { Routes, Route } from 'react-router'
import HomePage from './Pages/Home/HomePage'
import Header from './Components/header'
import Orders from './Pages/OrdersPage/Orders'
import Cart from './Pages/Cart/Cart'
import SignUp from './Pages/SignUp/SignUp'

function App() {
  return (
    <>

      <Header />

      <main className="main-content">
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='orders' element={<Orders />}></Route>
          <Route path='cart' element={<Cart />}></Route>
          <Route path='sign-up' element={<SignUp />}></Route>
        </Routes>
      </main>
    </>
  )
}

export default App
