import React from 'react'

function InputComponent(props){
    return (
        <input type={props.type}
               className="border-b-2 placeholder-gray-500 w-full focus:outline-none max-w-full"
               placeholder={props.placeholder}
               onChange={props.onChange}
               value={props.value}
               onBlur={props.onBlur}
               name={props.name}
        />
    )
}


export default InputComponent