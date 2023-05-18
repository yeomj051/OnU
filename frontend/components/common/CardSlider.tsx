import Slider from 'react-slick';
import React, { useState, useEffect } from 'react';

const slides = [
  {
    image:
      'https://images.unsplash.com/photo-1612540943977-98ce54bea8a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    text: 'Sample text 1',
  },
  {
    image:
      'https://images.unsplash.com/photo-1596572934980-5a6a24b04f33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    text: 'Sample text 2',
  },
  {
    image:
      'https://images.unsplash.com/photo-1584174594005-60a49c828bbc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1136&q=80',
    text: 'Sample text 3',
  },
];

const useResponsiveDimension = () => {
  const [dimension, setDimension] = useState({
    width: '512px',
    height: '300px',
  });

  useEffect(() => {
    const updateDimension = () => {
      if (window.innerWidth < 640) {
        setDimension({ width: '360px', height: '250px' });
      } else {
        setDimension({ width: '512px', height: '300px' }); // 원하는 크기로 설정해주세요.
      }
    };

    updateDimension();
    window.addEventListener('resize', updateDimension);

    return () =>
      window.removeEventListener('resize', updateDimension);
  }, []);

  return dimension;
};

const CardSlider = () => {
  const { width, height } = useResponsiveDimension();
  const settings = {
    dots: false,
    arrows: false,
    autoplay: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="pt-20">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative w-full h-[200px] h-[250px]"
          >
            <img
              src={slide.image}
              width={width}
              height={height}
              alt={`Slide ${index}`}
            />
          </div>
        ))}
      </Slider>
      {/* Rest of your code */}
    </div>
  );
};

export default CardSlider;
