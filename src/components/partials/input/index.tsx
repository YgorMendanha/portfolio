"use client";

import { forwardRef } from "react";
interface MyComponentProps {
  label: string;
  id?: string;
  className?: string;
}

export const CustomInput = forwardRef<HTMLInputElement, MyComponentProps>(
  function MyInput(props, ref) {
    return (
      <div className="relative w-full pt-5 mb-5 group ">
        <input
          {...props}
          className={`w-full border-b-2
          pl-2
          border-purple-500
          outline-0 text-xl 
          text-white py-3 bg-transparent 
          transition-all duration-200 
          placeholder:text-transparent placeholder-shown:text-xl
          placeholder-shown:cursor-text placeholder-shown:top-5
          group-focus-within:border-purple-700 ${props.className ?? ""}`}
          ref={ref}
        />
        <label
          htmlFor={props.id}
          className="pl-2 transition-all duration-200 absolute top-10 block text-lg text group-focus-within:top-0"
        >
          {props.label}
        </label>
      </div>
    );
  }
);
