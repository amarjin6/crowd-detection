import styled from 'styled-components'

const Widget = styled.div`
    display: flex;
    align-items: center;
    margin: 0px 20px;
    & > * {
        margin: 5px 20px;
    }
`

const ButtonStyle = styled.button`
    color: #fff;
`

const CheckboxStyle = styled.input`
    position: relative;
    font-size: 0px;
    width: 23px;
    height: 16px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    cursor: pointer;
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: calc(100% - 3px * 2);
        border-radius: 8px;
        border: 3px solid var(--light-color);
        background-color: transparent;
    }
    &::before {
        content: '';
        position: absolute;
        top: 0px;
        left: 0px;
        margin: 4px;
        width: 8px;
        height: 8px;
        background-color: var(--light-color);
        border-radius: 50%;
        transition: .2s;
    }
    &:checked:before {
        left: calc(100% - 8px - 2px);
        right: 0;
        transition: .2s;
    }

`

const FormStyle = styled.form`
    margin: 10px;
    padding: 20px;
    background-color: var(--light-color);
    display: flex;
    align-items: start;
    flex-direction: column;
    border-radius: 5px;
    box-shadow: 0px 0px 8px rgba(0,0,0,.2);
    & > *:not(.form_title):not(.form_subtitle):not(:last-child) {
        margin: 0px 0px 20px 0px;
    }
    & .form_title.form_title,
    & .form_subtitle.form_subtitle {
        font-family: var(--font);
        color: var(--dark-color);
    }
    & .form_subtitle {
        font-size: var(--fsz-normal);
        margin: 10px 0px 20px 0px;
    }
    & > *:last-child {
        /* margin-top: 20px; */
    }
`

const InputStyle = styled.input`
`

const FooterStyle = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 20px 0px;
    color: var(--main-color);
    & > div {
        width: calc(25% - 20px);
        min-width: 250px;
        margin: 0px 10px;
        display: flex;
        flex-direction: column;
        align-items: start;
        & > * {
            margin: 10px 5px;
        }
    }

`

export {
    Widget,
    ButtonStyle,
    CheckboxStyle,
    InputStyle,
    FormStyle,
    FooterStyle
}


