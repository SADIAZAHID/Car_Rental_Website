import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { isRequired, isValidEmail } from '../../utils/validation';
import './Login.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
    setFormError('');
  }

  function validate() {
    const next = {};
    if (!isRequired(form.email)) next.email = 'Please enter your email.';
    else if (!isValidEmail(form.email)) next.email = 'Enter a valid email address.';
    if (!isRequired(form.password)) next.password = 'Please enter your password.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    const result = login(form);
    if (!result.ok) {
      setFormError(result.message);
      return;
    }
    const redirectTo = location.state?.from || '/';
    navigate(redirectTo);
  }

  return (
    <div className="section auth-page">
      <div className="container auth-page__inner">
        <div className="auth-card">
          <span className="eyebrow">Welcome back</span>
          <h2>Log in to your account</h2>
          <p className="auth-card__sub">Track your bookings and rebook your favourite cars faster.</p>

          <form onSubmit={handleSubmit} noValidate>
            <div className={`field ${errors.email ? 'has-error' : ''}`}>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="you@example.com" value={form.email}
                onChange={(e) => update('email', e.target.value)} />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className={`field ${errors.password ? 'has-error' : ''}`}>
              <label htmlFor="password">Password</label>
              <input id="password" type="password" placeholder="••••••••" value={form.password}
                onChange={(e) => update('password', e.target.value)} />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            {formError && <p className="auth-card__form-error">{formError}</p>}

            <button type="submit" className="btn btn-primary btn-block">
              Log In
            </button>
          </form>

          <p className="auth-card__hint">
            Demo admin — email <code>admin@drivenow.com</code>, password <code>admin123</code>
          </p>

          <p className="auth-card__switch">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}