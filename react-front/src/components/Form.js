import React from 'react'
import { FormStyle } from '../widgetStyles/Styles'

export const Form = ({ title, subtitle, onSubmit, children, ...props }) => {

    return (
        <FormStyle onSubmit={onSubmit} {...props}>
            <div className="form_title min-ttl">{title}</div>
            <div className="form_subtitle">{subtitle}</div>
            {children}
        </FormStyle>
    )
}


