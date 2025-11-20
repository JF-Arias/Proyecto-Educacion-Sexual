import "./css/LandingPage.css";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-wrapper">

      {/* Fondo suave */}
      <div className="soft-background">
        <div className="floating-shapes">
          <div className="soft-blob blob-1"></div>
          <div className="soft-blob blob-2"></div>
          <div className="soft-blob blob-3"></div>
          <div className="soft-blob blob-4"></div>
        </div>
      </div>

      {/* Contenido */}
      <div className="landing-card">
        <div className="landing-info">
          <h1 className="landing-title">Bienvenid@ a <span>EduSex</span></h1>

          <p className="landing-desc">
            Un espacio seguro, educativo y amigable donde podrás 
            aprender sobre sexualidad de forma clara, respetuosa 
            y confiable. ✨
          </p>

          <div className="landing-buttons">
            <button className="soft-btn" onClick={() => navigate("/login")}>
              Iniciar Sesión
            </button>

            <button className="soft-btn outlined" onClick={() => navigate("/register")}>
              Registrarme
            </button>
          </div>
        </div>

        <div className="landing-image">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/4208/4208391.png" 
            alt="Imagen EduSex" 
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
