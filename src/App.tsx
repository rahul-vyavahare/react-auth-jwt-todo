import './App.css';
import {  Route, Routes } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundry';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import Home from './components/Home';
import Missing from './components/Missing';
import GlobalProvider from './context/TodoListProvider';

function App() {
  return (
    
      <ErrorBoundary>
        <Routes>
        <Route path="/" element={<Home />} />
        {/* public routes */}
        <Route path="/login" element={<Login />} />

        {/* private routes */}
        <Route  element={<ProtectedRoute />} >
          
        <Route path="/dashboard" element={<GlobalProvider><Dashboard /></GlobalProvider>} />
        
</Route>
        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Routes>
        
         </ErrorBoundary>
    
  );
}

export default App;
