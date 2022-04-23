import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'

export const EmployeeSlider = () => {

    return (
        <Carousel autoPlay={true} infiniteLoop={true} showStatus={false} width={300} transitionTime={1000} stopOnHover={true} showThumbs={false}>
            <img src="./img/employee/employee1.jpg" className="employee_image" alt="employee 1" />
            <img src="./img/employee/employee2.jpg" className="employee_image" alt="employee 2" />
            <img src="./img/employee/employee3.jpg" className="employee_image" alt="employee 3" />
            <img src="./img/employee/employee4.jpg" className="employee_image" alt="employee 4" />
            <img src="./img/employee/employee5.jpg" className="employee_image" alt="employee 5" />
        </Carousel>
    )

}


