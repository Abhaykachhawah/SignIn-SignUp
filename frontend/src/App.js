
import './App.css';
import {Navigate,Routes , Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import {useState} from 'react'
import RefereshHandler from './RefereshHandler';
function App() {
  const [isAutheticated ,setIsAutheticated] = useState(false);
    const PrivateRoute = ({element}) =>{
      return isAutheticated ? element : <Navigate to="/login"/>
    } 
  return (
    <div className="App">
      <RefereshHandler setIsAutheticated={setIsAutheticated}/>
      <Routes>
        <Route path='/' element={<Navigate to='/login'/>}/>
        <Route path='/home' element={<PrivateRoute element={<Home/>}/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </div>
  );
}

export default App;
