import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate replaces useHistory

const StartPage: React.FC = () => {
  const navigate = useNavigate(); // useNavigate instead of useHistory

  const navigateToApp = () => {
    navigate('/app'); // The same as history.push('/app')
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {/* Your content */}
      <button onClick={navigateToApp} style={{ padding: '10px 20px', fontSize: '20px', cursor: 'pointer', marginTop: '20px' }}>
        Checkout the Project
      </button>
    </div>
  );
};

export default StartPage;
