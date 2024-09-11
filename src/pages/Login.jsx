import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visibility, setVisibility] = useState('visibility_off');
    const [type, setType] = useState('password');
    const { login, error, isLoading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmail('');
        setPassword('');

        await login(email, password)
    }

    const handleVisibility = (e) => {
        if (e.target.innerText === 'visibility') {
            setVisibility('visibility_off')
            setType('password');
        } else {
            setVisibility("visibility");
            setType('text');
        }
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Log in</h3>
            <label htmlFor="login-email">Email:
                <div className="input-box">
                    <input
                        autoComplete="email"
                        id="login-email"
                        type="email"
                        onChange={(e) => { setEmail(e.target.value) }}
                        value={email}
                        required
                    />
                </div>
            </label>
            <label htmlFor="login-password">Password:
                <div className="input-box">
                    <input
                        id="login-password"
                        type={type}
                        onChange={(e) => { setPassword(e.target.value) }}
                        value={password}
                        required
                        className="input-90-width"
                        autoComplete="current-password"
                    />
                    <span className="material-symbols-outlined" onClick={handleVisibility}>
                        {visibility}
                    </span>
                </div>
            </label>
            <button disabled={isLoading} className="primary-styled-button">Log in &nbsp; &rarr;</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Login;