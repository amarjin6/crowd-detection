import React from 'react'
import { NavLink } from 'react-router-dom'
import { Widget } from '../widgetStyles/Styles'
import { Checkbox } from './Checkbox'
import { ThemeController } from '../utils/Theme'

const switchTheme = (e) => {
    ThemeController(e.target.checked)
}

export const Footer = () => (
    <footer className="bl-bg pd-lr pd-tb ps" style={{zIndex: 99, marginTop: "auto"}}>
        <div className="wrapper df">
            <NavLink to="/" className={"df except_under"}>
                <img src="./img/logo.png" className="logo" alt="logo" />
                <span className="fs-m">Crowd Detection</span>
            </NavLink>
            <Widget className="mla">
                <NavLink to="/products">Products</NavLink>
                <NavLink to="/solutions">Solutions</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/docs">Docs</NavLink>
                <div className={"df jcc"}>
                    <Checkbox onChecked={e => switchTheme(e)} />
                </div>
                <NavLink to="/sign-in" className={"df jcc"}>
                    <img src="./img/account.svg" className="icon" alt="log in" />
                </NavLink>
            </Widget>
        </div>
    </footer>
)


