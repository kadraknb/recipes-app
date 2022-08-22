import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../../context/AppContext';

const REGEX_EMAIL = /\S+@\S+\.\S+/;
const MIN_PASSWORD_LENGTH = 6;
function Login() {
  const { user, setUser, toggleBtnLogin, setToggleBtnLogin } = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    const { email, password } = user;
    const isValidEmail = REGEX_EMAIL.test(email);
    const isValidPassword = password.length > MIN_PASSWORD_LENGTH;
    if (isValidEmail && isValidPassword) {
      setToggleBtnLogin(false);
    } else {
      setToggleBtnLogin(true);
    }
  }, [user, setToggleBtnLogin]);

  function handleChange({ target: { name, value } }) {
    setUser({ ...user, [name]: value });
  }

  function handleClick() {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: user.email }));
    history.push('/foods');
  }
  return (
    <div
      className="d-flex flex-column mb-3 align-items-center
    "
    >
      <h1 className="h1">Login</h1>
      <form action="" className="d-flex flex-column mb-3 align-items-center">
        <input
          className="form-control"
          type="email"
          placeholder="Email"
          data-testid="email-input"
          name="email"
          onChange={ handleChange }
          id=""
        />
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          data-testid="password-input"
          onChange={ handleChange }
          name="password"
          id=""
        />
        <button
          type="button"
          className="btn btn-light"
          disabled={ toggleBtnLogin }
          onClick={ handleClick }
          data-testid="login-submit-btn"
        >
          Enter

        </button>
      </form>
    </div>
  );
}

export default Login;
