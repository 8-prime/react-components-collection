import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home'
import Demo from './pages/Demo'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
