import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);
const USERS_KEY = 'drivenow_users';
const SESSION_KEY = 'drivenow_session';

// Demo-only admin account so the Admin Dashboard bonus feature is reachable
// without building a full role-management backend. Not for production use.
export const ADMIN_EMAIL = 'admin@drivenow.com';
export const ADMIN_PASSWORD = 'admin123';

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readJSON(SESSION_KEY, null));

  useEffect(() => {
    if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    else localStorage.removeItem(SESSION_KEY);
  }, [user]);

  function signup({ name, email, password }) {
    const users = readJSON(USERS_KEY, []);
    const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { ok: false, message: 'An account with this email already exists.' };
    }
    const newUser = { name, email, password };
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
    setUser({ name, email, role: 'customer' });
    return { ok: true };
  }

  function login({ email, password }) {
    if (email.toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setUser({ name: 'Admin', email: ADMIN_EMAIL, role: 'admin' });
      return { ok: true };
    }

    const users = readJSON(USERS_KEY, []);
    const match = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!match) {
      return { ok: false, message: 'Incorrect email or password.' };
    }
    setUser({ name: match.name, email: match.email, role: 'customer' });
    return { ok: true };
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}