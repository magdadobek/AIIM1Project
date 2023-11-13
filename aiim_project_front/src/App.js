import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Placeholder from './pages/Placeholder'
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import NoticeBoard from './pages/notice/NoticeBoard';
import NoticePage from './pages/notice/NoticePage';
import ChatBoard from './pages/chats/ChatBoard';
import ChatPage from './pages/chats/ChatPage';
import NewNotice from './pages/notice/NewNotice';
import MainNavigation from './components/ui/MainNavigation'
import Content from './components/ui/Content';
import { HomePage } from './pages/HomePage';
import QuestionBoard from './pages/questions/QuestionBoard';
import QuestionPage from './pages/questions/QuestionPage';
import NewQuestion from './pages/questions/NewQuestion';
import { UpdateNotice } from './pages/notice/UpdateNotice';
import { UpdateQuestion } from './pages/questions/UpdateQuestion';



const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (token && user) {
      const payload = {
        nickname: user.nickname,
        id: user.id,
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

  useEffect(() => {
    let theme = localStorage.getItem("preferedTheme");
    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      localStorage.setItem("preferedTheme", theme);
    }
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
  <div className="flex flex-col min-h-screen bg-light_page dark:text-white dark:bg-dark_page ">
    <Router>
      <MainNavigation />
      <div className="flex items-center justify-center flex-grow">
        <Content>
          <Routes>
            <Route path='/' exact element={<HomePage />} />
            <Route path='/chats' element={<ChatBoard />} />
            <Route path='/chats/:chatId' element={<ChatPage />}/>
            <Route path='/notices' element={<NoticeBoard />}/>
            <Route path='/notices/:noticeId' element={<NoticePage />}/>
            <Route path='/notices/new' element={<NewNotice />}/>
            <Route path='/notices/update/:noticeId' element={<UpdateNotice />}/>
            <Route path='/questions' element={<QuestionBoard />}/>
            <Route path='/questions/:questionId' element={<QuestionPage />}/>
            <Route path='/questions/new' element={<NewQuestion />}/>
            <Route path='/questions/update/:questionId' element={<UpdateQuestion />}/>
            <Route path='/map' element={<Placeholder title="Mapa" />} />
            <Route path='/contact' element={<Placeholder title="Kontakt" />} />
            <Route path='/documents' element={<Placeholder title="Dokumenty" />} />
            <Route path='/circles' element={<Placeholder title="Koła naukowe" />} />
            <Route path='/login' element={<Login />} />
            <Route path='/registration' element={<Register />} />
            <Route path='/profil' element={<Placeholder title="Profil" />} />
            <Route path='/logout' element={<Logout />} />
          </Routes>
        </Content>
      </div>
    </Router>
  </div>
  );
}

export default App;
