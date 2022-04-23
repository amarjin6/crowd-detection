import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

export const SolutionsSlider = () => {

    return (
        <Carousel autoPlay={true} centerMode={true} centerSlidePercentage={90} showIndicators={false} infiniteLoop={true} showStatus={false} transitionTime={1000} stopOnHover={true} showThumbs={false}>
            <div className="df jcc">
                <div className="df card fdc">
                    <img src="./img/technologies/python_ramka.png" alt="python" className="slide_icon" />
                    <div>Python</div>
                </div>
                <div className="df card fdc">
                    <img src="./img/technologies/yolo.png" alt="yolo" className="slide_icon" />
                    <div>Yolo</div>
                </div>
                <div className="card fdc">
                    <img src="./img/technologies/ai.png" alt="ai" className="slide_icon" />
                    <div>AI</div>
                </div>
                <div className="card fdc">
                    <img src="./img/technologies/js.png" alt="js" className="slide_icon" />
                    <div>JavaScript</div>
                </div>
                <div className="card">
                    <img src="./img/technologies/django.png" alt="django" className="slide_icon" />
                    <div>Django</div>
                </div>
                <div className="card">
                    <img src="./img/technologies/rcnn.png" alt="js" className="slide_icon" />
                    <div>RCNN</div>
                </div>
                <div className="card">
                    <img src="./img/technologies/figma.png" alt="js" className="slide_icon" />
                    <div>Figma</div>
                </div>
            </div>
        </Carousel>
    )
}


