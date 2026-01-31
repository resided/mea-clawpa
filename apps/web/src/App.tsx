import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { ConfessionPage } from './pages/ConfessionPage'
import { About } from './pages/About'
import { Onboard } from './pages/Onboard'
import { Leaderboard } from './pages/Leaderboard'
import { Layout } from './components/Layout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="confession/:id" element={<ConfessionPage />} />
          <Route path="about" element={<About />} />
          <Route path="onboard" element={<Onboard />} />
          <Route path="rankings" element={<Leaderboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
