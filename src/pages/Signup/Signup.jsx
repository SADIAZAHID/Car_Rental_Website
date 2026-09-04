import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { isRequired, isValidEmail, minLength } from '../../utils/validation';
import '../Login/Login.css';

export default function Signup() {
    const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
    const [errors, setErrors] = useState({});
    const [formError, setFormError] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    function update(field, value) {
        setForm((f) => ({ ...f, [field]: value }));
        setErrors((e) => ({ ...e, [field]: undefined }));
        setFormError('');
    }

    function validate() {
        const next = {};
        if (!isRequired(form.name)) next.name = 'Please enter your name.';
        if (!isRequired(form.email)) next.email = 'Please enter your email.';
        else if (!isValidEmail(form.email)) next.email = 'Enter a valid email address.';
        if (!isRequired(form.password)) next.password = 'Please create a password.';
        else if (!minLength(form.password, 6)) next.password = 'Use at least 6 characters.';
        if (form.confirm !== form.password) next.confirm = 'Passwords do not match.';
        setErrors(next);
        return Object.keys(next).length === 0;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!validate()) return;

        const result = signup(form);
        if (!result.ok) {
            setFormError(result.message);
            return;
        }
        navigate('/');
    }

    return (
        <div className="section auth-page">
            <div className="container auth-page__inner">
                <div className="auth-card">
                    <span className="eyebrow">Join DriveNow</span>
                    <h2>Create your account</h2>
                    <p className="auth-card__sub">Save your details for faster checkout next time.</p>

                    <form onSubmit={handleSubmit} noValidate>
                        <div className={`field ${errors.name ? 'has-error' : ''}`}>
                            <label htmlFor="name">Full name</label>
                            <input id="name" type="text" placeholder="e.g. Sadia Zahid" value={form.name}
                                onChange={(e) => update('name', e.target.value)} />
                            {errors.name && <span className="error-text">{errors.name}</span>}
                        </div>

                        <div className={`field ${errors.email ? 'has-error' : ''}`}>
                            <label htmlFor="email">Email</label>
                            <input id="email" type="email" placeholder="you@example.com" value={form.email}
                                onChange={(e) => update('email', e.target.value)} />
                            {errors.email && <span className="error-text">{errors.email}</span>}
                        </div>

                        <div className={`field ${errors.password ? 'has-error' : ''}`}>
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" placeholder="At least 6 characters" value={form.password}
                                onChange={(e) => update('password', e.target.value)} />
                            {errors.password && <span className="error-text">{errors.password}</span>}
                        </div>

                        <div className={`field ${errors.confirm ? 'has-error' : ''}`}>
                            <label htmlFor="confirm">Confirm password</label>
                            <input id="confirm" type="password" placeholder="Re-enter your password" value={form.confirm}
                                onChange={(e) => update('confirm', e.target.value)} />
                            {errors.confirm && <span className="error-text">{errors.confirm}</span>}
                        </div>

                        {formError && <p className="auth-card__form-error">{formError}</p>}

                        <button type="submit" className="btn btn-primary btn-block">
                            Create Account
                        </button>
                    </form>

                    <p className="auth-card__switch">
                        Already have an account? <Link to="/login">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}