import { useState } from "react";

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    birthdate: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Validaciones
  const isEmailValid = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isPasswordValid = (password: string) =>
    /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

  const isAdult = (birthdate: string) => {
    const today = new Date();
    const birth = new Date(birthdate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    return age > 17 || (age === 17 && monthDiff >= 0);
  };

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Validaciones
    if (!form.name.trim()) {
      setError("El nombre es obligatorio.");
      return;
    }

    if (!isEmailValid(form.email)) {
      setError("El correo no es válido.");
      return;
    }

    if (!isPasswordValid(form.password)) {
      setError(
        "La contraseña debe tener mínimo 8 caracteres, 1 mayúscula y 1 número."
      );
      return;
    }

    if (!isAdult(form.birthdate)) {
      setError("Debes ser mayor de edad.");
      return;
    }

    console.log("DATA QUE SE ENVÍA:", form);

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Error en el registro.");
        return;
      }

      setSuccessMessage("Registro exitoso.");
    } catch (err) {
      setError("Error conectando con el servidor.");
    }
  };

  return (
    <div className="register-container">
      <h1>Registro</h1>

      <form className="register-form" onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        {successMessage && (
          <p className="success-message">{successMessage}</p>
        )}

        <label>Nombre completo:</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label>Correo electrónico:</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <small>Debe tener al menos 8 caracteres, 1 mayúscula y 1 número.</small>

        <label>Fecha de nacimiento:</label>
        <input
          type="date"
          name="birthdate"
          value={form.birthdate}
          onChange={handleChange}
          required
        />

        <button type="submit">Registrarme</button>
      </form>
    </div>
  );
};

export default RegisterPage;
