import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Placeholder from './pages/Placeholder'
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import NoticeBoard from './pages/NoticeBoard';
import NoticePage from './pages/NoticePage';
import NewNotice from './pages/NewNotice';
import MainNavigation from './components/ui/MainNavigation'

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (token && user) {
      const payload = {
        nickname: user.nickname,
        index: user.index,
        email: user.email,
        password: user.password,
        account_type: user.account_type,
        isLoggedIn: true,
        token: token
      }
      dispatch({ type: "user/login", payload: payload });
    }
  }, [])
  

  return (
  <div className="h-screen bg-light_page dark:text-white dark:bg-dark_page grid grid-row-2 gap-4 place-content-center">
    <Router>
      <MainNavigation />
      <Routes>
        <Route path='/' exact element={<Placeholder title="Strona główna" />} />
        <Route path='/szybkapomoc' element={<Placeholder title="Szybka pomoc" />} />
        <Route path='/ogloszenia' element={<NoticeBoard />}/>
        <Route path='/ogloszenia/:noticeId' element={<NoticePage />}/>
        <Route path='/ogloszenia/nowe' element={<NewNotice />}/>
        <Route path='/mapa' element={<Placeholder title="Mapa" />} />
        <Route path='/kontakt' element={<Placeholder title="Kontakt" />} />
        <Route path='/dokumenty' element={<Placeholder title="Dokumenty" />} />
        <Route path='/kolanaukowe' element={<Placeholder title="Koła naukowe" />} />
        <Route path='/logowanie' element={<Login />} />
        <Route path='/rejestracja' element={<Register />} />
        <Route path='/profil' element={<Placeholder title="Profil" />} />
        <Route path='/wyloguj' element={<Logout />} />
      </Routes>
    </Router>
  </div>
  );
}

export default App;
