import { useState } from 'react';
import { useSignup } from '../hooks/useSignup'
import { Link } from 'react-router-dom';
import '../Styles/signup.css'

const Signup = () => {
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(firstName, lastName, email, password)
  };
  return (
    <div className="Signup-Container">
      <div className="login-card">
        <div className="signup">Signup</div>
        <div className='signup-box'>
        <div className="inputBox">
            <input type="text" required="required" 
            onChange={(e) => setFirstname(e.target.value)}
            value={firstName}/>
            <span>Firstname</span>
          </div>

        <div className="inputBox">
            <input type="text" required="required" 
            onChange={(e) => setLastname(e.target.value)}
            value={lastName}/>
            <span>Lastname</span>
          </div>

          <div className="inputBox">
            <input type="text" required="required" 
            onChange={(e) => setEmail(e.target.value)}
            value={email}/>
            <span>Email</span>
          </div>

          <div className="inputBox">
            <input type="password" required="required" 
            onChange={(e) => setPassword(e.target.value)}
            value={password}/>
            <span>Password</span>
          </div>
        </div>
        {error && <div classNameName="error">{error}!!</div>}

        <button className="enter"
          onClick={handleSubmit}
          disabled={isLoading}>Signup
        </button>
        <Link to='/login' className="inner-logcard-text" style={{textDecoration: 'none'}}>
          have an account? <span>login</span>
        </Link>
      </div>
      {/* <img src='../../../Assets/login-bg.jpg' width={400} className='login-bg' alt=''/> */}
    </div>
    // <form className="signup" onSubmit={handleSubmit}>
    //   <h3>Sign up</h3>
    //   <label>Email: </label>
    //   <input
    //     type="email"
    //     onChange={(e) => setEmail(e.target.value)}
    //     value={email}
    //   />
    //   <label>Password: </label>
    //   <input
    //     type="password"
    //     onChange={(e) => setPassword(e.target.value)}
    //     value={password}
    //   />

    //   <button disabled={isLoading}>Sign up</button>
    //   {
    //     error && <div className='error'>{error}</div>
    //   }
    // </form>
  );
};

export default Signup;
