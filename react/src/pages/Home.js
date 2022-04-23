import React from 'react'
import { AboutUsSlider } from '../components/sliders/AboutUsSlider'
import { ProjectSlider } from '../components/sliders/ProjectSlider'
import { SolutionsSlider } from '../components/sliders/SolutionsSlider'
import { UsageSlider } from '../components/sliders/UsageSlider'

export const Home = () => {
    return (
        <>
            <div className="wrapper section df">
                <div className="df fw-tab">
                    <div className="dib">
                        <h1 className="fs-eb">Crowd Detection</h1>
                        <div className="subtitle fs-n">
                            Video analytic system, that estimates the number of people within a given area in real time and triggers
                            an alarm when a specified number of people (capacity) or a specified percentage of people (occupancy) is reached.   
                        </div>
                    </div>
                    <div className="project_slider">
                        <ProjectSlider />
                    </div>
                </div>
            </div>
            <div className="section tr-bg">
                <div className="wrapper">
                    <div className="ttl_main fs-eb">How it works</div>
                </div>
                <div className="df pd-tb jcc fdc">
                    <div className="wrapper df tac jcc">
                        <div className="subtitle taj fs-n">
                            Crowd Detection is capable of detecting and calculating the density of crowds within a pre-defined area.
                            It can send alerts if it exceeds a certain set percentage. There are two ways to install the camera for crowd detection – lens facing down or 45 degrees tilted. 
                            When installed face down, the camera detects people by recognizing heads, whereas when installed tilted, 
                            the camera detects people by recognizing heads and shoulders at the same time.
                        </div>
                    </div>
                    <div className="tac jcc pd-tb">
                        <img src="./img/how-it-works/how-it-works.jpg" alt="how it works" />
                    </div>
                </div>
            </div>
            <div className="section">
                <div className="wrapper">
                    <div className="ttl_main fs-eb">Our Service</div>
                </div>
                <div className="df pd-tb">
                    <div className="wrapper">
                        <UsageSlider />
                    </div>
                </div>
            </div>
            <div className="section tr-bg">
                <div className="wrapper">
                    <div className="ttl_main fs-eb">Team Members</div>
                </div>
                <div className="df pd-tb mt">
                    <div className="wrapper">
                        <AboutUsSlider />
                    </div>
                </div>
            </div>
            <div className="section">
                <div className="wrapper">
                    <div className="ttl_main fs-eb">Technologies & Tools</div>
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


