import { ComponentPropsWithoutRef, useId } from 'react'
import s from './checkBox.module.scss'

type Props = { label?: string } & Omit<ComponentPropsWithoutRef<'input'>, 'type'>
export const CheckBox = ({ id, label, ...props }: Props) => {
  const generatedId = id ?? useId()

  return (
    <div>
      <input className={s.customCheckbox} id={generatedId} type="checkbox" {...props} />
      <label htmlFor={generatedId}>{label}</label>
    </div>
  )
}
