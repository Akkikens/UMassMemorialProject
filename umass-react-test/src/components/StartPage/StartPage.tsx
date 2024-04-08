import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Segment } from 'semantic-ui-react';
import useTypingEffect from '../useTypingEffect'; // Adjust the path as needed

const StartPage: React.FC = () => {
  const navigate = useNavigate();
  const typingSpeed = 50; // Speed of typing in milliseconds

  // Texts to animate
  const welcomeText = useTypingEffect("  Welcome to the UMass React Test Project!");
  const descriptionText = useTypingEffect("Dooctor. Moore, Jonathan, and NishiGandha, As requested, I've developed a simple React application that enables users to input their personal information, such as first name, last name, email, birthday, and blood group. The application also features functionality for users to search and sort entries by various criteria, including first name, last name, email, birthday, and blood group. This project was built using React, TypeScript, and Semantic UI React, ensuring a responsive design that adapts well across mobile devices. ", typingSpeed);

  const navigateToApp = () => {
    navigate('/app');
  };

  return (
    <div className="gradient-background">
      <Container text style={{ marginTop: '50px', color: 'black' }}> {/* Changed text color to black */}
        <Segment piled>
          <h1>{welcomeText}</h1>
          <p>{descriptionText}</p>
          <Button onClick={navigateToApp} primary size='large' style={{ marginTop: '20px' }}>
            Checkout the Project
          </Button>
        </Segment>
      </Container>
    </div>
  );
};

export default StartPage;