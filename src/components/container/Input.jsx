import React, {useId} from 'react'


const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){
      const id = useId()
   return (
    <div className="w-full">
      {label && (
        <label
          className="mb-1 inline-block pl-1 text-sm font-medium text-slate-300"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`mx-2 mb-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-slate-100 outline-none placeholder:text-slate-500 duration-200 focus:border-violet-400/40 focus:bg-white/10 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)] ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  )
})
export default Input