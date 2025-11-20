import "./css/dashboard.css";

const DashboardPage = () => {
  const user = {
    name: "Breidy",
    email: "breidy@example.com",
    avatar: "https://cdn-icons-png.flaticon.com/512/4208/4208405.png",
  };

  return (
    <div className="dashboard-wrapper">

      {/* Fondo suave */}
      <div className="soft-background">
        <div className="floating-shapes">
          <div className="soft-blob blob-1"></div>
          <div className="soft-blob blob-2"></div>
          <div className="soft-blob blob-3"></div>
          <div className="soft-blob blob-4"></div>
        </div>
      </div>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="dashboard-container">

        {/* SIDEBAR */}
        <aside className="dashboard-sidebar">
          <div className="user-box">
            <img src={user.avatar} className="user-avatar" />
            <div className="user-info">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
          </div>

          <button className="sidebar-btn">⚙ Configuración</button>

          <nav className="sidebar-menu">
            <button>📘 Temas</button>
            <button>❓ Preguntas Frecuentes</button>
            <button>📊 Progreso</button>
            <button>📝 Quizzes</button>
          </nav>
        </aside>

        {/* CONTENIDO CENTRAL */}
        <main className="dashboard-content">

          <section className="section">
            <h1 className="section-title">Bienvenid@ a EduSex</h1>
            <p className="section-text">
              EduSex es un espacio educativo, seguro y confiable diseñado 
              para brindar orientación y conocimientos sobre sexualidad 
              de forma respetuosa, clara y actualizada.
            </p>
          </section>

          <section className="section">
            <h2 className="section-title">📌 Misión</h2>
            <img
              src="https://cdn-icons-png.flaticon.com/512/8651/8651631.png"
              className="section-image"
            />
            <p className="section-text">
              EduSex tiene como misión ofrecer educación sexual integral, 
              accesible y segura para mejorar el bienestar emocional, 
              físico y social de los usuarios.
            </p>
          </section>

          <section className="section">
            <h2 className="section-title">🌟 Visión</h2>
            <img
              src="https://cdn-icons-png.flaticon.com/512/4209/4209363.png"
              className="section-image"
            />
            <p className="section-text">
              Ser la plataforma líder en educación sexual digital, 
              promoviendo un entorno de confianza, respeto y crecimiento personal.
            </p>
          </section>

          <section className="section">
            <h2 className="section-title">📞 Contacto</h2>

            <div className="contact-box">
              <p>📧 edusex.support@example.com</p>
              <p>📱 +57 300 000 0000</p>
              <p>🌐 www.edusex.com</p>
            </div>

            <div className="social-icons">
              <a>📘</a>
              <a>📸</a>
              <a>🐦</a>
              <a>▶️</a>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
