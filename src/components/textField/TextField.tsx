import { ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import { clsx } from 'clsx'

import s from './textField.module.scss'
import { Close, Eye, EyeOff, Search } from '../../assets/icons'

export type TextFieldProps = {
  type?: 'search' | 'text' | 'password'
  label?: string
  errorMessage?: string
  clearField?: () => void
} & ComponentPropsWithoutRef<'input'>

type PropsType = TextFieldProps & Omit<ComponentPropsWithoutRef<'input'>, keyof TextFieldProps>

export const TextField = forwardRef<HTMLInputElement, PropsType>(
  ({ type = 'text', errorMessage, className, clearField, label, required, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    const isPasswordType = type === 'password'

    const isSearchType = type === 'search'

    const displayClearButton = isSearchType && clearField && rest.value

    const finalType = getFinalType(type, showPassword)

    const passwordHandler = () => setShowPassword(prev => !prev)

    const classes = {
      root: clsx(s.root, className),
      label: clsx(s.label, rest.disabled && s.disabled),
      input: clsx(s.input, isSearchType && s.search, errorMessage && s.error),
      searchIcon: clsx(s.searchIcon, rest.disabled && s.disabledIcon),
      required: clsx(s.required),
      error: clsx(s.errorMessage),
    }

    return (
      <div className={classes.root}>
        <label className={classes.label}>
          {label}
          {required && <span className={classes.required}>*</span>}
          <div className={s.container}>
            <input
              className={classes.input}
              type={isPasswordType ? finalType : 'text'}
              ref={ref}
              {...rest}
            />
            {isPasswordType && (
              <button
                type="button"
                className={s.button}
                onClick={passwordHandler}
                disabled={rest.disabled}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            )}
            {isSearchType && <Search className={classes.searchIcon} />}
            {displayClearButton && (
              <button
                type="button"
                className={s.button}
                onClick={clearField}
                disabled={rest.disabled}
              >
                <Close />
              </button>
            )}
          </div>
        </label>
        {!!errorMessage && <p className={classes.error}>{errorMessage}</p>}
      </div>
    )
  }
)

function getFinalType(type: TextFieldProps['type'], showPassword: boolean) {
  if (type === 'password' && !showPassword) {
    return 'password'
  }

  return 'text'
}
