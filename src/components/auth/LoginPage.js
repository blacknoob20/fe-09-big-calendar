import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginPage = () => {

    console.log('LoginPage');

    const loginForm = {
        loginEmail: 'blacknoob20@gmail.com',
        loginPassword: '123456'
    };
    const registerForm = {
        registerName: 'Chris',
        registerEmail: 'blacknoob20@gmail.com',
        registerPassword1: '123456',
        registerPassword2: '123456'
    };

    const disptach = useDispatch();
    const [formLoginValues, handleLoginInputChange] = useForm(loginForm);
    const [formRegisterValues, handleRegisterInputChange] = useForm(registerForm);
    const { loginEmail, loginPassword } = formLoginValues;
    const { registerName, registerEmail, registerPassword1, registerPassword2 } = formRegisterValues;

    const handleSubmitLogin = (e) => {
        e.preventDefault();

        disptach(startLogin(loginEmail, loginPassword));
    }

    const handleSubmitRegister = (e) => {
        e.preventDefault();

        if (registerPassword1 !== registerPassword2) return Swal.fire('Aviso', 'La clave no coinciden.','warning');

        disptach(startRegister(registerName, registerEmail, registerPassword1));
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleSubmitLogin}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='loginEmail'
                                onChange={handleLoginInputChange}
                                value={loginEmail}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='loginPassword'
                                onChange={handleLoginInputChange}
                                value={loginPassword}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleSubmitRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='registerName'
                                onChange={handleRegisterInputChange}
                                value={registerName}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='registerEmail'
                                onChange={handleRegisterInputChange}
                                value={registerEmail}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='registerPassword1'
                                onChange={handleRegisterInputChange}
                                value={registerPassword1}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name='registerPassword2'
                                onChange={handleRegisterInputChange}
                                value={registerPassword2}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}