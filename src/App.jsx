import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Start from './start/start'
import SelectFrame from './selectFrame/selectFrame'
import Picture from './picture/picture'
import SelectPicture from './selectPicture/selectPicture';
import Draw from './draw/draw';
import Finish from './finish/finish';
import Gallery from './gallery/gallery';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/selectFrame' element={<SelectFrame />} />
        <Route path='/picture' element={<Picture />} />
        <Route path='/selectPicture' element={<SelectPicture />} />
        <Route path='/draw' element={<Draw />} />
        <Route path='/finish' element={<Finish />} />
        <Route path='/gallery' element={<Gallery />} />

      </Routes>
    </Router>
  )
}

export default App
