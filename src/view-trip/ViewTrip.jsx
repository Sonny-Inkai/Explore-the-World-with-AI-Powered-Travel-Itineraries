import React from 'react';
import { useLocation } from 'react-router-dom';

function ViewTrip() {
  const location = useLocation();
  const { results } = location.state;

  const truncateDescription = (description, maxLength = 200) => {
    if (description.length <= maxLength) {
      return description;
    }
    return description.substring(0, maxLength) + '...';
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg mt-6">
      <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">Your Trip Plan</h2>

      <section className="mb-12">
        <h3 className="text-3xl font-bold mb-6 text-gray-700">Recommended Hotels</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {results.hotels.map((hotel, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <img src={hotel.image} alt={hotel.name} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h4 className="text-2xl font-bold mb-2 text-gray-800">{hotel.name}</h4>
              <p className="text-gray-600 mb-2">{truncateDescription(hotel.description)}</p>
              <p className="text-gray-600 mb-4">{hotel.price}</p>
              <div className="flex items-center">
                <span className="text-yellow-500 text-lg">{'★'.repeat(hotel.rating)}</span>
                <span className="ml-2 text-gray-600">{hotel.rating} stars</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-3xl font-bold mb-6 text-gray-700">Places to Visit</h3>
        {Array.from({ length: results.restaurants.length }).map((_, dayIndex) => (
          <div key={dayIndex} className="mb-12">
            <h4 className="text-2xl font-bold mb-4 text-gray-700">Day {dayIndex + 1}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h5 className="text-xl font-bold mb-2 text-gray-800">Restaurant</h5>
                <img src={results.restaurants[dayIndex].image} alt={results.restaurants[dayIndex].name} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h4 className="text-2xl font-bold mb-2 text-gray-800">{results.restaurants[dayIndex].name}</h4>
                <p className="text-gray-600 mb-2">{truncateDescription(results.restaurants[dayIndex].description)}</p>
                <div className="flex items-center">
                  <span className="text-yellow-500 text-lg">{'★'.repeat(results.restaurants[dayIndex].rating)}</span>
                  <span className="ml-2 text-gray-600">{results.restaurants[dayIndex].rating} stars</span>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h5 className="text-xl font-bold mb-2 text-gray-800">Attraction</h5>
                <img src={results.attractions[dayIndex].image} alt={results.attractions[dayIndex].name} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h4 className="text-2xl font-bold mb-2 text-gray-800">{results.attractions[dayIndex].name}</h4>
                <p className="text-gray-600 mb-2">{truncateDescription(results.attractions[dayIndex].description)}</p>
                <div className="flex items-center">
                  <span className="text-yellow-500 text-lg">{'★'.repeat(results.attractions[dayIndex].rating)}</span>
                  <span className="ml-2 text-gray-600">{results.attractions[dayIndex].rating} stars</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default ViewTrip;