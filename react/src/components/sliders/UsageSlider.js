import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

export const UsageSlider = () => {

    return (
        <Carousel autoPlay={true} centerSlidePercentage={90} showIndicators={false} infiniteLoop={true} showStatus={false} transitionTime={1000} stopOnHover={true} showThumbs={false}>
            <div className="df jcc">
                <div className="card">
                    <img src="./img/quality/safety.svg" alt="safety" />
                    <span>Privacy</span>
                </div>
                <div className="card">
                    <span>Safety</span>
                </div>
                <div className="card">
                    <span>Support</span>
                </div>
                <div className="card">
                    <span>Equipment</span>
                </div>
                <div className="card">
                    <span>Warranty</span>
                </div>
            </div>
        </Carousel>
    )
}


