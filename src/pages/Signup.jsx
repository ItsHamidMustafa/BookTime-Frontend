import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

function Signup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visibility, setVisibility] = useState('visibility_off');
    const [type, setType] = useState('password');
    const { signup, error, isLoading } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(firstName, lastName, email, password);

        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            console.log('USER ID:' + user._id);
        }

        console.log(firstName, lastName, email, password);
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
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>
            <div className="user-first-last-name-container">
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <div className="input-box">
                        <input
                            className="user-first-last-name-input"
                            id="firstName"
                            type="text"
                            onChange={(e) => { setFirstName(e.target.value) }}
                            value={firstName}
                            required
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <div className="input-box">
                        <input
                            className="user-first-last-name-input"
                            id="lastName"
                            type="text"
                            onChange={(e) => { setLastName(e.target.value) }}
                            value={lastName}
                            required
                        />
                    </div>
                </div>
            </div>
            <label htmlFor="signup-email">Email:
                <div className="input-box">
                    <input
                        id="signup-email"
                        type="email"
                        onChange={(e) => { setEmail(e.target.value) }}
                        value={email}
                        required
                        autoComplete="email"
                    />
                </div>
            </label>
            <label htmlFor="signup-password">Password:</label>
            <div className="input-box">
                <input
                    id="signup-password"
                    type={type}
                    onChange={(e) => { setPassword(e.target.value) }}
                    value={password}
                    required
                    className="input-90-width"
                    autoComplete="new-password"
                />
                <span className="material-symbols-outlined" onClick={handleVisibility}>
                    {visibility}
                </span>
            </div>
            <button disabled={isLoading} className="primary-styled-button">Sign up  &nbsp;&rarr;</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Signup;