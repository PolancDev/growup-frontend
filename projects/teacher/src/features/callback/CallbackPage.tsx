import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { keycloakAuth } from '../../core/services/keycloak-auth';

const CallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const user = await keycloakAuth.signinRedirectCallback();
        
        if (user) {
          console.log('GrowUp-Log: CallbackPage - Authentication successful');
          navigate('/panel-gestion');
        } else {
          console.error('GrowUp-Log: CallbackPage - Authentication failed');
          navigate('/');
        }
      } catch (error) {
        console.error('GrowUp-Log: CallbackPage - Error:', error);
        navigate('/');
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh' 
    }}>
      <div style={{
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #3498db',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        animation: 'spin 1s linear infinite'
      }} />
      <p style={{ marginTop: '20px', color: '#666' }}>
        Autenticando con Keycloak...
      </p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default CallbackPage;
