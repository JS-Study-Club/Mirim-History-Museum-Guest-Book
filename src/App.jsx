import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Start from './start/start'
import SelectFrame from './selectFrame/selectFrame'
import Picture from './picture/picture'
import SelectPicture from './selectPicture/selectPicture';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/selectFrame' element={<SelectFrame />} />
        <Route path='/picture' element={<Picture />} />
        <Route path='/selectPicture' element={<SelectPicture />} />
      </Routes>
    </Router>
  )
}

export default App
