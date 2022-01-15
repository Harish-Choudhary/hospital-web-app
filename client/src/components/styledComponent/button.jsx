import style from 'styled-components';
export const Button = style.button`

    width: ${(props)=> props.width };
    background-color:#475bd8;
    padding:${(props)=> props.padding };
    margin:${(props)=> props.margin };
    border-radius:10px;
    outline:none;
    color:white;
    border:none;
    cursor:pointer;
    font-family:poppins;
    font-size:${(props)=> props.fontSize };
`