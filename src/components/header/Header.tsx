import s from './header.module.scss'
import { TextField } from '../textField'

export const Header = () => {
  return (
    <header className={s.header}>
      <h3 className={s.headerHeading}>Классы</h3>
      <div className={s.inputsBlock}>
        <select name="" id="">
          <option value="">Присвоенные+1</option>
        </select>
        <select name="" id="">
          <option value="">В библиотеке+1</option>
        </select>
        <TextField type={'search'} className={s.textfield} placeholder={'Найти классы'} />
      </div>
    </header>
  )
}
