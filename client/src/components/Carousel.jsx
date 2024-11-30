import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import styled from 'styled-components';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import photo1 from '../assets/photo1.jpg';
import photo2 from '../assets/photo2.jpg';
import photo3 from '../assets/photo3.jpg';


const images = [
  photo1,
  photo2,
  photo3,
];

const ImageCarousel = () => {
  return (
    <CarouselWrapper>
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        interval={3000}
        dynamicHeight={false}
      >
        {images.map((img, index) => (
          <div key={index}>
            <img src={img} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Carousel>
    </CarouselWrapper>
  );
};

const CarouselWrapper = styled.div`
  max-width: 80%;
  margin: 2rem auto;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);

  img {
    max-height: 500px;
    object-fit: cover;
  }
`;

export default ImageCarousel;
