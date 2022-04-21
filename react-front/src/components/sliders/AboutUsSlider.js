import React from 'react'
import 'react-multi-carousel/lib/styles.css'
import Carousel from 'react-multi-carousel'
import { EmployeeItem } from './styles/AboutUsStyles'

export const AboutUsSlider = () => {

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
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
            <EmployeeItem>
                <img src="./img/employee/employee1.jpg" className="employee_image" alt="employee 1" />
                <div>
                    <div className="min-ttl">Back-End</div>
                    <div className="pd-tb subtitle">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</div>
                </div>
            </EmployeeItem>
            <EmployeeItem>
                <img src="./img/employee/employee2.jpg" className="employee_image" alt="employee 2" />
                <div>
                    <div className="min-ttl">Back-End</div>
                    <div className="pd-tb subtitle">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</div>
                </div>
            </EmployeeItem>
            <EmployeeItem>
                <img src="./img/employee/employee3.jpg" className="employee_image" alt="employee 3" />
                <div>
                    <div className="min-ttl">Front-End</div>
                    <div className="pd-tb subtitle">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</div>
                </div>
            </EmployeeItem>
            <EmployeeItem>
                <img src="./img/employee/employee4.jpg" className="employee_image" alt="employee 4" />
                <div>
                    <div className="min-ttl">Back-End</div>
                    <div className="pd-tb subtitle">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</div>
                </div>
            </EmployeeItem>
            <EmployeeItem>
                <img src="./img/employee/employee1.jpg" className="employee_image" alt="employee 1" />
                <div>
                    <div className="min-ttl">Back-End</div>
                    <div className="pd-tb subtitle">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</div>
                </div>
            </EmployeeItem>
        </Carousel>
    )
}


