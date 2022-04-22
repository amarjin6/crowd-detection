import React from 'react'
import { NavLink } from 'react-router-dom'
import { Form } from '../components/Form'
import { Input } from '../components/Input'
import { Button } from '../widgetStyles/Styles'

export const Auth = () => {
    return (
        <div className="wrapper df">
            {/* <h1>Auth Page</h1> */}
            <Form title={"Authorization"} subtitle={"Write your data for login here"}>
                <Input hint={"Name"} warning={"Field is empty"} placeholder="Saydullin" />
                <Input hint={"Email"} placeholder="Saydullin@gmail.com" />
                <Input hint={"Password"} warning={"Field is empty"} isError={true} placeholder="********" />
                <Button type={"button"}>Done</Button>
                <NavLink to="/sign-in" className={"bl-l fs-t"}>Not in yet? Registr now!</NavLink>
            </Form>
        </div>
    )
}


