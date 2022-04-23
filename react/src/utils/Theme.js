
export const ThemeController = (isDark) => {
    const body = document.querySelector('body')
    const darkTriller = getComputedStyle(body).getPropertyValue('--dark-triller-color')
    const dark = getComputedStyle(body).getPropertyValue('--dark-color')
    const light = getComputedStyle(body).getPropertyValue('--light-color')
    const lightTriller = getComputedStyle(body).getPropertyValue('--light-triller-color')
    
    if (isDark) {
        body.style.setProperty('--main-bg-color', dark);
        body.style.setProperty('--main-bg-triller-color', darkTriller);
        body.style.setProperty('--main-text-color', light);
    } else {
        body.style.setProperty('--main-bg-color', light);
        body.style.setProperty('--main-bg-triller-color', lightTriller);
        body.style.setProperty('--main-text-color', dark);
    }
}


