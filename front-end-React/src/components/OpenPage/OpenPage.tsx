import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../images/2.jpg';

const OpenPage: React.FC = () => {
  const navigate = useNavigate();
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredButton(index);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  return (
    <div 
      style={{ 
        backgroundImage: `url(${backgroundImage})`, 
        backgroundSize: 'cover', 
        height: '100vh', 
        color: 'white', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <nav style={{ 
        padding: '20px', 
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        width: '100%'
      }}>
        <ul style={{ 
          display: 'flex', 
          listStyleType: 'none', 
          justifyContent: 'space-around', 
          margin: 0, 
          padding: 0 
        }}>
          <li>
            <button 
              style={getButtonStyle(0)}
              onMouseEnter={() => handleMouseEnter(0)}
              onMouseLeave={handleMouseLeave}
              onClick={()=>navigate('/PersonalArea')}
            >
              לאיזור האישי
            </button>
          </li>
          <li>
            <button 
              style={getButtonStyle(1)}
              onMouseEnter={() => handleMouseEnter(1)}
              onMouseLeave={handleMouseLeave}
              onClick={() => navigate('/TreatPage')}
            >
              לקביעת טיפול
            </button>
          </li>
          <li>
            <button 
              style={getButtonStyle(2)}
              onMouseEnter={() => handleMouseEnter(2)}
              onMouseLeave={handleMouseLeave}
              onClick={() => navigate('/ListOfClients')}
            >
              הצגת רשימת המטופלים
            </button>
          </li>
          <li>
            <button 
              style={getButtonStyle(3)}
              onMouseEnter={() => handleMouseEnter(3)}
              onMouseLeave={handleMouseLeave}
            >
              ריק
            </button>
          </li>
        </ul>
      </nav>
      <h1 style={{ textAlign: 'center', paddingTop: '20%', margin: 0 }}>ברוכים הבאים</h1>
      <footer style={{
        padding: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        textAlign: 'center'
      }}>
        <p>© 2024 Simcha Avitan</p>
      </footer>
    </div>
  );

  function getButtonStyle(index: number): React.CSSProperties {
    return {
      padding: '10px 20px',
      backgroundColor: hoveredButton === index ? 'brown' : 'green',
      border: 'none',
      borderRadius: '5px',
      color: 'white',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background-color 0.3s ease',
      outline: 'none'
    };
  }
};

export default OpenPage;
