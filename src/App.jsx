import { useContext, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Chat from './pages/Chat';
import ProfileUpdate from './pages/ProfileUpdate';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import { AppContext } from './context/AppContext';

function App() {
  const navigate = useNavigate();
  const { loadUserData } = useContext(AppContext)

  useEffect(() => {
    const updateTitleAndNavigate = (path) => {
      const pageTitles = {
        '/': 'Talk Flow | Login',
        '/chat': 'Talk Flow | Chat',
        '/profile': 'Talk Flow | Profile Update',
      };
      document.title = pageTitles[path] || 'Talk Flow';
      navigate(path);
    };

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // console.log(user);
        await loadUserData(user.uid)

      } else {
        updateTitleAndNavigate('/');
      }
    });
  }, [navigate]);

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" transition={Slide} />      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/profile' element={<ProfileUpdate />} />
      </Routes>
    </>
  )
}

export default App
