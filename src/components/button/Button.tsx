import { ComponentPropsWithoutRef, forwardRef } from 'react'

import s from './button.module.scss'
import clsx from 'clsx'

export type Props = {
  variant?: 'fullWidth' | 'primary'
} & ComponentPropsWithoutRef<'button'>

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, variant = 'primary', ...restProps }, ref) => {
    const root = clsx(s.button, s[variant], className)
    return <button ref={ref} className={root} {...restProps} />
  }
)
