import React from 'react'

export const ThemeController = (isDark) => {
    const body = document.querySelector('body')
    const dark = getComputedStyle(body).getPropertyValue('--dark-color')
    const light = getComputedStyle(body).getPropertyValue('--light-color')
    
    if (isDark) {
        body.style.setProperty('--main-bg-color', dark);
        body.style.setProperty('--main-text-color', light);
    } else {
        body.style.setProperty('--main-bg-color', light);
        body.style.setProperty('--main-text-color', dark);
    }
}


