import React from 'react';

function Title() {
  return (
    <div className='main-content'>
      <h1>Explore the World with AI-Powered Travel Itineraries</h1>
      <p>Plan your perfect trip with personalized recommendations</p>
      <button onClick={() => window.location.href = '/create-trip'}>Let's Create Your Trip!</button>
    </div>
  );
}

export default Title;