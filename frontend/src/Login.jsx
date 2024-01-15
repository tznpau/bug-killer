/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const Login = ({ name, email, role, onNameChange, onEmailChange, onRoleChange, onLogin, onLogout }) => {
  return (
    <div>
      <h2>Formular de autentificare</h2>
      <label>
        Nume:
        <input type="text" value={name} onChange={onNameChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" value={email} onChange={onEmailChange} />
      </label>
      <br />
      <label>
        Rol:
        <select value={role} onChange={onRoleChange}>
          <option value="MP">MP</option>
          <option value="TST">TST</option>
        </select>
      </label>
      <br />
      <button onClick={onLogin}>Conectare</button>
      <button onClick={onLogout}>Deconectare</button>
    </div>
  );
};

export default Login;