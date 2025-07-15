import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Start from './start/start'
import Design from './design/design'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/design' element={<Design />} />
      </Routes>
    </Router>
  )
}

export default App
