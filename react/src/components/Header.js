import React from 'react'
import { NavLink } from 'react-router-dom'
import { ButtonStyle, Widget } from '../widgetStyles/Styles'
import { Checkbox } from './Checkbox'
import { ThemeController } from '../utils/Theme'

const switchTheme = (e) => {
    ThemeController(e.target.checked)
}

export const Header = () => (
    <header className="bl-bg pd-lr pd-tb ps">
        <div className="wrapper df">
            <NavLink to="/crowd-detection/" className={"df except_under"}>
                <img src="./img/logo.png" className="logo" alt="logo" />
                <span className="fs-b logo_font">Vegas <span className="blue">M</span><span className="yellow">L</span></span>
            </NavLink>
            <Widget className="mla">
                <NavLink to="/crowd-detection/products" className="fs-n">Products</NavLink>
                <NavLink to="/crowd-detection/solutions" className="fs-n">Solutions</NavLink>
                <NavLink to="/crowd-detection/support" className="fs-n">Support</NavLink>
                <NavLink to="/crowd-detection/partners" className="fs-n">Partners</NavLink>
                <ButtonStyle>Try Us</ButtonStyle>
                <div className={"df jcc"}>
                    <Checkbox onChecked={e => switchTheme(e)} />
                </div>
                <NavLink to="/crowd-detection/sign-in" className={"df jcc except_under"}>
                    <img src="./img/account.svg" className="icon" alt="log in" />
                </NavLink>
            </Widget>
        </div>
    </header>
)


