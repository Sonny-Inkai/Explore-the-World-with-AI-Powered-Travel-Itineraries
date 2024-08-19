import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaDollarSign, FaUsers, FaClipboardList } from 'react-icons/fa';
import './CreateTrip.css';

const budgetOptions = [
  { value: 'cheap', label: 'Cheap', description: 'Stay conscious of costs', icon: '💸' },
  { value: 'moderate', label: 'Moderate', description: 'Keep cost on the average side', icon: '💰' },
  { value: 'luxury', label: 'Luxury', description: 'Don\'t worry about cost', icon: '💵' },
];

const companionOptions = [
  { value: 'just_me', label: 'Just Me', description: 'A sole traveler in exploration', icon: '✈️' },
  { value: 'a_couple', label: 'A Couple', description: 'Two travelers in tandem', icon: '🥂' },
  { value: 'family', label: 'Family', description: 'A group of fun loving adventurers', icon: '🏡' },
  { value: 'friends', label: 'Friends', description: 'A bunch of thrill-seekers', icon: '⛵' },
];

function CreateTrip() {
  const [location, setLocation] = useState('');
  const [days, setDays] = useState('');
  const [budget, setBudget] = useState('');
  const [companions, setCompanions] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleDaysChange = (e) => {
    setDays(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location || !days || !budget || !companions || !description) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    const tripData = {
      location,
      days,
      budget,
      companions,
      description,
    };

    try {
      const response = await fetch('http://localhost:5000/api/hybrid-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tripData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result);
      navigate('/view-trip', { state: { results: result } });
    } catch (error) {
      console.error('Error fetching search results:', error);
      setError('Error fetching search results');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Plan Your Perfect Trip</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="form-group">
          <label className="form-label flex items-center">
            <FaMapMarkerAlt className="mr-2" />
            Where do you want to go?
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="form-input"
            placeholder="Enter location"
          />
        </div>
        <div className="form-group">
          <label className="form-label flex items-center">
            <FaClipboardList className="mr-2" />
            How many days are you planning your trip?
          </label>
          <input
            type="number"
            value={days}
            onChange={handleDaysChange}
            className="form-input"
            placeholder="Enter number of days"
          />
        </div>
        <div className="form-group">
          <label className="form-label flex items-center">
            <FaDollarSign className="mr-2" />
            What is Your Budget?
          </label>
          <div className="grid grid-cols-3 gap-4">
            {budgetOptions.map((option) => (
              <div
                key={option.value}
                className={`p-4 border rounded-lg cursor-pointer ${budget === option.value ? 'border-blue-500' : 'border-gray-300'}`}
                onClick={() => setBudget(option.value)}
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-2">{option.icon}</span>
                  <div>
                    <p className="font-bold">{option.label}</p>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label flex items-center">
            <FaUsers className="mr-2" />
            Who do you plan on traveling with on your next adventure?
          </label>
          <div className="grid grid-cols-2 gap-4">
            {companionOptions.map((option) => (
              <div
                key={option.value}
                className={`p-4 border rounded-lg cursor-pointer ${companions === option.value ? 'border-blue-500' : 'border-gray-300'}`}
                onClick={() => setCompanions(option.value)}
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-2">{option.icon}</span>
                  <div>
                    <p className="font-bold">{option.label}</p>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label flex items-center">
            <FaClipboardList className="mr-2" />
            Describe your trip expectations
          </label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            className="form-textarea"
            placeholder="Enter your trip expectations"
          />
        </div>
        <div className="form-group form-button-container">
          <button
            type="submit"
            className="form-button bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Generate Trip
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTrip;