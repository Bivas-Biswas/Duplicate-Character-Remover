import clsx from 'clsx'
import React from 'react'
import { HTMLInputProps } from 'types'

export const inputStyle = {
  base: `border-0 w-full !bg-background border-b-2 text-secondary placeholder:text-gray-600 outline-0 border-gray-900 focus:border-indigo-500 focus:ring-indigo-500`,
  textSize: {
    small: 'text-xs',
    regular: 'text-sm',
    large: 'text-base'
  },
  roundness: {
    default: 'rounded-md',
    none: 'rounded-none',
    full: 'rounded-full'
  }
}

export type InputCustomProps = {
  id: string
  label: string
  wrapperClassName?: string
  placeholder?: string
  hideLabel?: boolean
  labelClassName?: string
  onChangeValue?: (_value: string) => void
  roundness?: keyof typeof inputStyle.roundness
  onChange?: (_e: React.ChangeEvent<HTMLInputElement>) => void
}

export type InputProps = HTMLInputProps & InputCustomProps

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props: InputProps, ref) => {
    const {
      id,
      label,
      roundness = 'default',
      hideLabel,
      type = 'text',
      wrapperClassName,
      className,
      labelClassName,
      onChangeValue,
      placeholder,
      onChange,
      ...rest
    } = props

    return (
      <div className={clsx('w-full', wrapperClassName)}>
        <label
          htmlFor={id}
          className={clsx(
            hideLabel
              ? 'sr-only'
              : 'block text-sm font-medium text-gray-100 mb-1',
            labelClassName
          )}>
          {label}
        </label>
        <input
          ref={ref}
          type={type}
          id={id}
          placeholder={placeholder}
          className={clsx(
            inputStyle.base,
            inputStyle.roundness[roundness],
            className
          )}
          onChange={(e) => {
            if (onChange) onChange(e)
            if (onChangeValue) onChangeValue(e.target.value)
          }}
          {...rest}
        />
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
