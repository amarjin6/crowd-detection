import React from 'react'
import { NavLink } from 'react-router-dom'
import { Form } from '../components/Form'
import { Input } from '../components/Input'
import { ButtonStyle } from '../widgetStyles/Styles'

export const Auth = () => {
    return (
        <div className="wrapper df">
            <Form title={"Authorization"} subtitle={"Write your data for login here"}>
                <Input hint={"Name"} warning={"Field is empty"} placeholder="John" />
                <Input hint={"Surname"} warning={"Field is empty"} placeholder="Doe" />
                <Input hint={"Email"} placeholder="example@gmail.com" />
                <Input hint={"Password"} warning={"Field is empty"} isError={true} placeholder="********" />
                <ButtonStyle type={"button"}>Done</ButtonStyle>
                <NavLink to="/sign-in" className={"bl-l fs-t"}>Not yet?  Register now!</NavLink>
            </Form>
        </div>
    )
}


