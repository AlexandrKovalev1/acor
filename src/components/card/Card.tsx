import { ComponentPropsWithoutRef, forwardRef } from 'react'

import s from './card.module.scss'
import clsx from 'clsx'

export type CardProps = ComponentPropsWithoutRef<'div'>

export const Card = forwardRef<HTMLDivElement, CardProps>(({ className, ...restProps }, ref) => {
  const root = clsx(s.card, className)
  return <div ref={ref} className={root} {...restProps}></div>
})
