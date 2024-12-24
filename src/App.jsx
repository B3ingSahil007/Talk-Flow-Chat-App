import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Chat from './pages/Chat';
import ProfileUpdate from './pages/ProfileUpdate';

function App() {
  const location = useLocation();

  useEffect(() => {
    const pageTitles = {
      '/': 'Talk Flow | Login',
      '/chat': 'Talk Flow | Chat',
      '/profile': 'Talk Flow | Profile Update',
    };

    const title = pageTitles[location.pathname] || 'Talk Flow';
    document.title = title;
  }, [location]);

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/profile' element={<ProfileUpdate />} />
      </Routes>
    </>
  )
}

export default App
