import './App.css'

import HomePage from './Pages/Home/HomePage'
import Header from './Components/header'

function App() {
  return (
    <div>

      <Header />
    
      <main className="main-content">
        <HomePage />
      </main>
    </div>
  )
}

export default App
