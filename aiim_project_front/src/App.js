import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Placeholder from './pages/Placeholder'
import Register from './pages/Register';
import Login from './pages/Login';
import MainNavigation from './components/ui/MainNavigation'

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <Routes>
        <Route path='/' exact element={<Placeholder title="Strona główna" />} />
        <Route path='/szybkapomoc' element={<Placeholder title="Szybka pomoc" />} />
        <Route path='/ogloszenia' element={<Placeholder title="Ogłoszenia" />} />
        <Route path='/mapa' element={<Placeholder title="Mapa" />} />
        <Route path='/kontakt' element={<Placeholder title="Kontakt" />} />
        <Route path='/dokumenty' element={<Placeholder title="Dokumenty" />} />
        <Route path='/kolanaukowe' element={<Placeholder title="Koła naukowe" />} />
        <Route path='/logowanie' element={<Login/>} />
        <Route path='/rejestracja' element={<Register/>} />
      </Routes>
    </Router>
  );
}

export default App;
