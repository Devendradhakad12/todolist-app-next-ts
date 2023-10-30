import React, { ChangeEvent } from 'react'

interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
    placeholder: string;
    className: string;
    required: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    value: string;
    type: string,
}

 

const Input = React.forwardRef<HTMLInputElement,InputProps> (({type,placeholder,className,onChange,value})=>(
    <input
    type={type}
    placeholder={placeholder}
    className={className}
    required
    onChange={onChange}
    value={value}
/>
))

Input.displayName = "Input"

export default Input
