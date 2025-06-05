import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home'
import Demo from './pages/Demo'
import SolariTime from './pages/SolariTime'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/solari-time" element={<SolariTime />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
