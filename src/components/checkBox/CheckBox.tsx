import { ComponentPropsWithoutRef, useId } from 'react'
import s from './checkBox.module.scss'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import { CheckIcon } from '../../assets'

type Props = { label?: string } & ComponentPropsWithoutRef<typeof CheckboxRadix.Root>
export const CheckBox = ({ id, label, ...props }: Props) => {
  const generatedId = id ?? useId()

  return (
    <div className={s.wrapper}>
      <CheckboxRadix.Root {...props} className={s.checkboxRoot}>
        <CheckboxRadix.Indicator>
          <CheckIcon />
        </CheckboxRadix.Indicator>
      </CheckboxRadix.Root>
      {label && <label id={generatedId}>{label}</label>}
    </div>
  )
}
