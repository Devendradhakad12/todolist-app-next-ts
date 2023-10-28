import React, { ChangeEvent } from 'react'

interface TextareaProps extends React.ComponentPropsWithoutRef<'textarea'> {
    placeholder: string;
    className: string;
    required: boolean;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    value: string;
    rows: number; 
  }

const Textarea =  React.forwardRef<HTMLTextAreaElement , TextareaProps>(({placeholder,className,onChange,required,value,rows})=>(
  
    <textarea
    placeholder={placeholder}
    className={className}
    required={required}
    onChange={onChange}
    value={value}
    rows={rows}   
  ></textarea>
 
))

export default Textarea
