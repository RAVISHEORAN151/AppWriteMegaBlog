import React, { useId } from 'react'

function Select({
    options,
    label,
    className = '',
    ...props
}, ref) {
    const id = useId()

    return (
        <div className='w-full'>
            {label && (
                <label htmlFor={id} className='inline-block mb-1 pl-1'>
                    {label}
                </label>
            )}

           <select
                {...props}
                id={id}
                ref={ref}
                className={`w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-slate-100 outline-none duration-200 focus:border-violet-400/40 focus:bg-white/10 ${className}`}
                >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)