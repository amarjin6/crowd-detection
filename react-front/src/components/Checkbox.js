import React from 'react'
import { CheckboxStyle } from '../widgetStyles/Styles'

export const Checkbox = ({ onChecked }) => (
    <>
        <CheckboxStyle type="checkbox" onClick={e => onChecked(e)} />
    </>
)


