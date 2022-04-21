import styled from 'styled-components'

const EmployeeItem = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin: 0px 10px;
    & img {
        object-fit: cover;
        max-width: 100%;
        width: 400px;
    }
    & > div {
        width: calc(100% - 420px);
        margin-left: 20px;
    }
`

export {
    EmployeeItem
}


