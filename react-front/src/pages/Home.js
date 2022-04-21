import React from 'react'
import { AboutUsSlider } from '../components/sliders/AboutUsSlider'
import { EmployeeSlider } from '../components/sliders/EmployeeSlider'
import { SolutionsSlider } from '../components/sliders/SolutionsSlider'
import { UsageSlider } from '../components/sliders/UsageSlider'

export const Home = () => {
    return (
        <>
            <div className="wrapper section df">
                <div className="df fw-tab">
                    <div className="dib">
                        <h1 className="title">Crowd Detection</h1>
                        <div className="subtitle">
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
                        </div>
                    </div>
                    <EmployeeSlider />
                </div>
            </div>
            <div className="section">
                <div className="wrapper">
                    <div className="ttl_main">Products</div>
                </div>
                <div className="df bl-bg pd-tb">
                    <div className="wrapper">
                        <UsageSlider />
                    </div>
                </div>
            </div>
            <div className="section wrapper jcc tac">
                <div className="subtitle dib">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </div>
            </div>
            <div className="section">
                <div className="wrapper">
                    <div className="ttl_main">Solutions</div>
                </div>
                <div className="df pd-tb">
                    <div className="wrapper">
                        <SolutionsSlider />
                    </div>
                </div>
            </div>
            <div className="section">
                <div className="wrapper">
                    <div className="ttl_main">About Us</div>
                </div>
                <div className="df pd-tb">
                    <div className="wrapper">
                        <AboutUsSlider />
                    </div>
                </div>
            </div>
            <div className="section">
                <div className="wrapper">
                    <div className="ttl_main">Solutions</div>
                </div>
                <div className="df pd-tb">
                    <div className="wrapper">
                        <SolutionsSlider />
                    </div>
                </div>
            </div>
        </>

    )
}


