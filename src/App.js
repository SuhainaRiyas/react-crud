import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import UserList from './UserList';
import UserCreate from './UserCreate';
import UserEdit from './UserEdit';

function App() {
  return (
    <div className="App">
      <h3>React JS CRUD application</h3>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<UserList />} />
          <Route path='/user/create' element={<UserCreate/>} />
          <Route path='/user/:userid' element={<UserEdit/>} />
          <Route path='/*' element={<Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;
