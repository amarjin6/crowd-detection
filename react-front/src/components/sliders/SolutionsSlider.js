import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

export const SolutionsSlider = () => {

    return (
        <Carousel autoPlay={true} centerMode={true} centerSlidePercentage={90} showIndicators={false} infiniteLoop={true} showStatus={false} transitionTime={1000} stopOnHover={true} showThumbs={false}>
            <div className="df jcc">
                <div className="card bl-bg">
                    <span>Python</span>
                </div>
                <div className="card bl-bg">
                    <span>PHP</span>
                </div>
                <div className="card bl-bg">
                    <span>JavaScript</span>
                </div>
                <div className="card bl-bg">
                    <span>Java</span>
                </div>
                <div className="card bl-bg">
                    <span>Kotlin</span>
                </div>
                <div className="card bl-bg">
                    <span>C++</span>
                </div>
                <div className="card bl-bg">
                    <span>Python</span>
                </div>
                <div className="card bl-bg">
                    <span>PHP</span>
                </div>
            </div>
        </Carousel>
    )
}


