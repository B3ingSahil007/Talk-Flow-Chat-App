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
  const navigate = useNavigate(); // Hook for programmatic navigation
  const { loadUserData } = useContext(AppContext); // Function to load user data from context

  // Handle Firebase authentication state changes
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // console.log(user);
        await loadUserData(user.uid)  // Load user data if authenticated

      } else {
        navigate('/');  // Redirect to Login if not authenticated
      }
    });
  }, [navigate]);

  return (
    <>
    {/* ToastContainer for global notifications */}
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" transition={Slide} />
      {/* Application Routes */}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/profile' element={<ProfileUpdate />} />
      </Routes>
    </>
  )
}

export default App
