import React from 'react'
import { InputStyle } from '../widgetStyles/Styles'

export const Input = ({ hint, warning, isError, ...props }) => {
    return (
        <div className="input_cmp">
            <span>{hint}</span>
            <InputStyle {...props} />
            <span className="input_warning">{isError && warning}</span>
        </div>
    )
}


