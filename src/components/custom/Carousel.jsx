import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.css';

const images = [
  {
    src: '../../../public/1 (2).jpg',
  },
  {
    src: '../../../public/4.jpg'
  },
  {
    src: '../../../public/5.jpg',
  },
];

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className='carousel'>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className='carousel-slide'>
            <img src={image.src}  className='carousel-image' />
            <div className='main-content'>
              <h1 className='text-[14px]'>Explore the World with AI-Powered Travel Itineraries</h1>
              <p>Plan your perfect trip with personalized recommendations</p>
              <button onClick={() => window.location.href = '/create-trip'}>Let's Create Your Trip!</button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Carousel;