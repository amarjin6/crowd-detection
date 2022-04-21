import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

export const UsageSlider = () => {

    return (
        <Carousel autoPlay={true} centerSlidePercentage={90} showIndicators={false} infiniteLoop={true} showStatus={false} transitionTime={1000} stopOnHover={true} showThumbs={false}>
            <div className="df jcc">
                <div className="card">
                    <span>Python</span>
                </div>
                <div className="card">
                    <span>PHP</span>
                </div>
                <div className="card">
                    <span>JavaScript</span>
                </div>
                <div className="card">
                    <span>Java</span>
                </div>
                <div className="card">
                    <span>Kotlin</span>
                </div>
                <div className="card">
                    <span>C++</span>
                </div>
                <div className="card">
                    <span>Python</span>
                </div>
                <div className="card">
                    <span>PHP</span>
                </div>
            </div>
        </Carousel>
    )
}


