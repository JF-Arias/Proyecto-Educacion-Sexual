import { useState } from "react";
import "./css/LoginPage.css";

const LoginPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Validaciones
    let newErrors: any = {};
    if (!validateEmail(form.email)) newErrors.email = "Email no válido";
    if (form.password.length < 6)
      newErrors.password = "Contraseña mínima de 6 caracteres";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({ ...errors, password: "Credenciales inválidas" });
        setLoading(false);
        return;
      }

      setSuccess(true);

      setTimeout(() => {
        // redirección futura
        console.log("Login exitoso", data);
      }, 3000);

    } catch (err) {
      setErrors({ ...errors, password: "Error de conexión" });
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="soft-background">
        <div className="floating-shapes">
          <div className="soft-blob blob-1"></div>
          <div className="soft-blob blob-2"></div>
          <div className="soft-blob blob-3"></div>
          <div className="soft-blob blob-4"></div>
        </div>
      </div>

      <div className="login-container">
        <div className="soft-card">

          {!success && (
            <>
              <div className="comfort-header">
                <div className="gentle-logo">
                  <div className="logo-circle">
                    <div className="comfort-icon">
                      👁
                    </div>
                    <div className="gentle-glow"></div>
                  </div>
                </div>
                <h1 className="comfort-title">Welcome back</h1>
                <p className="gentle-subtitle">
                  Sign in to your peaceful space
                </p>
              </div>

              <form className="comfort-form" onSubmit={handleSubmit}>
                <div className={`soft-field ${errors.email ? "error" : ""}`}>
                  <div className="field-container">
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder=" "
                    />
                    <label>Email address</label>
                    <div className="field-accent"></div>
                  </div>
                  {errors.email && (
                    <span className="gentle-error show">{errors.email}</span>
                  )}
                </div>

                <div className={`soft-field ${errors.password ? "error" : ""}`}>
                  <div className="field-container">
                    <input
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder=" "
                    />
                    <label>Password</label>
                    <div className="field-accent"></div>
                  </div>
                  {errors.password && (
                    <span className="gentle-error show">
                      {errors.password}
                    </span>
                  )}
                </div>

                <div className="comfort-options">
                  <label className="gentle-checkbox">
                    <input
                      type="checkbox"
                      name="remember"
                      checked={form.remember}
                      onChange={handleChange}
                    />
                    <span className="checkbox-soft">
                      <div className="check-circle"></div>
                      <svg
                        className="check-mark"
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                      >
                        <path
                          d="M1 5l3 3 7-7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="checkbox-text">Remember me</span>
                  </label>

                  <a href="#" className="comfort-link">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className={`comfort-button ${loading ? "loading" : ""}`}
                >
                  <div className="button-background"></div>
                  <span className="button-text">Sign in</span>
                  <div className="button-loader">
                    <div className="gentle-spinner">
                      <div className="spinner-circle"></div>
                    </div>
                  </div>
                  <div className="button-glow"></div>
                </button>
              </form>
            </>
          )}

          {success && (
            <div className="gentle-success show">
              <div className="success-bloom">
                <div className="bloom-rings">
                  <div className="bloom-ring ring-1"></div>
                  <div className="bloom-ring ring-2"></div>
                  <div className="bloom-ring ring-3"></div>
                </div>
                <div className="success-icon">✔</div>
              </div>
              <h3 className="success-title">Welcome!</h3>
              <p className="success-desc">
                Taking you to your dashboard...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
