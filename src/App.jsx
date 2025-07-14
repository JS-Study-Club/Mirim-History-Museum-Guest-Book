import './App.css'
import Start from './start/start'

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
