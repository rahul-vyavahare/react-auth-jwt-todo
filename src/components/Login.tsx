import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { login } from "../services/AuthService";
const Login:React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setToken } = useAuth();
  const handleLogin = () => {
    const token = login(userName, password);
    if (token) {
      setToken(token);
      navigate('/dashboard',{replace:true});
    } else {
      setError("Invalid username or password try admin");
    }
  };
  return (
    <main className='login-bg' style={{display:'flex',height:'100vh',justifyContent:'center',alignItems:'center'}}>
       <section style={{display:'grid',placeContent:'space-evenly',placeItems:'center'}}>
      <h1>LogIn</h1>
      <form style={{placeItems:'center',gap:'1rem'}} onSubmit={handleLogin}>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="UserName"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type='submit'><span className="circle1"></span>
    <span className="circle2"></span>
    <span className="circle3"></span>
    <span className="circle4"></span>
    <span className="circle5"></span>
    <span className="text">LogIn</span></button></form>
      {error && <p>{error}</p>}
    </section>
    </main>
  );
};
export default Login;
