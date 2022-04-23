import React from 'react'
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from 'react-responsive-carousel'
import 'react-multi-carousel/lib/styles.css'
import Carousel from 'react-multi-carousel'

export const ProjectSlider = () => {

    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 1
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
      }
    };

    return (
        <Carousel responsive={responsive} pauseOnHover={true} infinite={true}>
          <div width={500}>
            <img src="./img/project/slide1.png" className="employee_image" alt="employee 1" />
          </div>
          <div>
            <img src="./img/project/slide2.png" className="employee_image" alt="employee 2" />
          </div>
          <div>
            <img src="./img/project/slide3.png" className="employee_image" alt="employee 3" />
          </div>
        </Carousel>
    )

}


