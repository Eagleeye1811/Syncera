import './App.css';
import {Routes, Route, BrowserRouter as Router} from "react-router-dom";
import Landing from './pages/Landing.jsx';
import Authentication from './pages/Authentication.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';

function App() {
  return (
    <>
    <Router>
      <AuthProvider>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/auth' element={<Authentication/>}/>
      </Routes>
      </AuthProvider>
    </Router>
    </>
  );
}

export default App;
