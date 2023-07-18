import { BrowserRouter as Router , Route,Routes } from "react-router-dom";
import SignUpPage from './pages/SignUpPage'
import Profile from "./pages/Profile";
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "./slices/userSlice";
import PrivateRoutes from "./components/common/PrivateRoutes";
import CreateAPodcastPage from "./pages/CreateAPodcast";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscibeAuth= onAuthStateChanged(auth,(user)=>{

      if(user){
        
        const unsubscibeSnapshot = onSnapshot(
          doc(db,"users",user.uid),
          (userDoc)=>{
            if(userDoc.exists()){
              const userData = userDoc.data();
              dispatch(
                setUser({
                  name:userData.name,
                  email:userData.email,
                  uid:user.uid,
                })
              );
            }
          },
          (error)=>{
            console.log('Error fetching user data: ',error)
          }
        );
        return ()=>{
          unsubscibeSnapshot()
        }
      }
    })
   
    return ()=>{
      unsubscibeAuth()
    };

  }, [])
  
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<SignUpPage />}/>
          <Route element={<PrivateRoutes/>}>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/create-a-podcast" element={<CreateAPodcastPage />}/>
          </Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
