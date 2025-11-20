
import { useState } from "react";
import "./css/LoginPage.css"; // usamos el mismo estilo

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    birthdate: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    birthdate: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password: string) =>
    /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

  const isAdult = (birthdate: string) => {
    const today = new Date();
    const birth = new Date(birthdate);
    const age = today.getFullYear() - birth.getFullYear();
    const month = today.getMonth() - birth.getMonth();
    return age > 17 || (age === 17 && month >= 0);
  };

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let validationErrors: any = {};

    if (!form.name.trim()) validationErrors.name = "El nombre es obligatorio.";
    if (!validateEmail(form.email))
      validationErrors.email = "Correo inválido.";
    if (!validatePassword(form.password))
      validationErrors.password =
        "Mínimo 8 caracteres, 1 mayúscula y 1 número.";
    if (!isAdult(form.birthdate))
      validationErrors.birthdate = "Debes ser mayor de edad.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({ ...errors, email: data.message });
        setLoading(false);
        return;
      }

      setSuccess(true);
    } catch (err) {
      setErrors({ ...errors, email: "Error conectando con el servidor." });
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
                    <div className="comfort-icon">🌸</div>
                    <div className="gentle-glow"></div>
                  </div>
                </div>

                <h1 className="comfort-title">Create your account</h1>
                <p className="gentle-subtitle">
                  Join your peaceful EduSex space
                </p>
              </div>

              <form className="comfort-form" onSubmit={handleSubmit}>
                {/* Nombre */}
                <div className={`soft-field ${errors.name ? "error" : ""}`}>
                  <div className="field-container">
                    <input
                      type="text"
                      name="name"
                      placeholder=" "
                      value={form.name}
                      onChange={handleChange}
                    />
                    <label>Nombre completo</label>
                    <div className="field-accent"></div>
                  </div>
                  {errors.name && (
                    <span className="gentle-error show">{errors.name}</span>
                  )}
                </div>

                {/* Correo */}
                <div className={`soft-field ${errors.email ? "error" : ""}`}>
                  <div className="field-container">
                    <input
                      type="email"
                      name="email"
                      placeholder=" "
                      value={form.email}
                      onChange={handleChange}
                    />
                    <label>Correo electrónico</label>
                    <div className="field-accent"></div>
                  </div>
                  {errors.email && (
                    <span className="gentle-error show">{errors.email}</span>
                  )}
                </div>

                {/* Contraseña */}
                <div
                  className={`soft-field ${errors.password ? "error" : ""}`}
                >
                  <div className="field-container">
                    <input
                      type="password"
                      name="password"
                      placeholder=" "
                      value={form.password}
                      onChange={handleChange}
                    />
                    <label>Contraseña</label>
                    <div className="field-accent"></div>
                  </div>
                  {errors.password && (
                    <span className="gentle-error show">
                      {errors.password}
                    </span>
                  )}
                </div>

                {/* Fecha nacimiento */}
                <div
                  className={`soft-field ${errors.birthdate ? "error" : ""}`}
                >
                  <div className="field-container">
                    <input
                      type="date"
                      name="birthdate"
                      placeholder=" "
                      value={form.birthdate}
                      onChange={handleChange}
                    />
                    <label>Fecha de nacimiento</label>
                    <div className="field-accent"></div>
                  </div>
                  {errors.birthdate && (
                    <span className="gentle-error show">
                      {errors.birthdate}
                    </span>
                  )}
                </div>

                {/* Botón */}
                <button
                  type="submit"
                  className={`comfort-button ${loading ? "loading" : ""}`}
                >
                  <div className="button-background"></div>
                  <span className="button-text">Registrarme</span>
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

              <h3 className="success-title">Registro completado</h3>
              <p className="success-desc">Te estamos redirigiendo...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
