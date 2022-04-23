import React from 'react'
import { NavLink } from 'react-router-dom'
import { FooterStyle, Widget } from '../widgetStyles/Styles'

export const Footer = () => (
    <footer className="tr-bg pd-lr pd-tb ps" style={{zIndex: 99, marginTop: "auto"}}>
        <div className="wrapper df">
            <NavLink to="/crowd-detection/" className={"df except_under"}>
                <img src="./img/logo.png" className="logo" alt="logo" />
                <div className="fs-m">Crowd Detection</div>
            </NavLink>
            {/* <Widget className="mla">
                <NavLink to="/crowd-detection/products">Products</NavLink>
                <NavLink to="/crowd-detection/solutions">Solutions</NavLink>
                <NavLink to="/crowd-detection/about">About</NavLink>
                <NavLink to="/crowd-detection/docs">Docs</NavLink>
            </Widget> */}
        </div>
        <div className="wrapper">
            <FooterStyle>
                <div>
                    <div className="min-ttl">About</div>
                    <NavLink to="/crowd-detection/products">Products</NavLink>
                    <NavLink to="/crowd-detection/solutions">Solutions</NavLink>
                    <NavLink to="/crowd-detection/about">About</NavLink>
                    <NavLink to="/crowd-detection/docs">Docs</NavLink>
                </div>
                <div>
                    <div className="min-ttl">Support</div>
                    <NavLink to="/crowd-detection/products">Products</NavLink>
                    <NavLink to="/crowd-detection/solutions">Solutions</NavLink>
                    <NavLink to="/crowd-detection/about">About</NavLink>
                    <NavLink to="/crowd-detection/docs">Docs</NavLink>
                </div>
                <div>
                    <div className="min-ttl">Legal</div>
                    <NavLink to="/crowd-detection/products">Products</NavLink>
                    <NavLink to="/crowd-detection/solutions">Solutions</NavLink>
                    <NavLink to="/crowd-detection/about">About</NavLink>
                    <NavLink to="/crowd-detection/docs">Docs</NavLink>
                </div>
                <div>
                    <div className="min-ttl">Other</div>
                    <NavLink to="/crowd-detection/products">Products</NavLink>
                    <NavLink to="/crowd-detection/solutions">Solutions</NavLink>
                    <NavLink to="/crowd-detection/about">About</NavLink>
                    <NavLink to="/crowd-detection/docs">Docs</NavLink>
                </div>
            </FooterStyle>
            <div className="df jcc mt mb">
                <img className="social_icons" src="./img/social/facebook.svg" alt="facebook" />
                <img className="social_icons" src="./img/social/twitter.svg" alt="twitter" />
                <img className="social_icons" src="./img/social/skype.svg" alt="skype" />
                <img className="social_icons" src="./img/social/github.svg" alt="github" />
                <img className="social_icons" src="./img/social/gmail.svg" alt="gmail" />
            </div>
            <div className="df jcc mt mb">
                <img className="payments_icons" src="./img/payments/visa.jpg" alt="visa" />
                <img className="payments_icons" src="./img/payments/mastercard.png" alt="mastercard" />
                <img className="payments_icons" src="./img/payments/paypal.png" alt="paypal" />
                <img className="payments_icons" src="./img/payments/apple-pay.jpg" alt="apple pay" />
            </div>
        </div>
    </footer>
)


