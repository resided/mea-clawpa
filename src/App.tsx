import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { ConfessionPage } from './pages/ConfessionPage'
import { Layout } from './components/Layout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="confession/:id" element={<ConfessionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
