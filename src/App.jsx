import { Route, Routes } from 'react-router-dom'
import './App.css'
import DashboardPage from './pages/DashboardPage'
import DetailPage from './pages/DetailPage'
import Header from './components/Header'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<DashboardPage />} />
        <Route path='/detail/:id' element={<DetailPage />} />
      </Routes>
    </>
  )
}

export default App
