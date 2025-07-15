import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Start from './start/start'
import Design from './design/design'
import Picture from './picture/picture'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/design' element={<Design />} />
        <Route path='/picture' element={<Picture />} />
      </Routes>
    </Router>
  )
}

export default App
