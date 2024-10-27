import s from './header.module.scss'
import { TextField } from '../textField'
import { useSearchParams } from 'react-router-dom'
import { ChangeEvent, KeyboardEvent, useState } from 'react'

export const Header = () => {
  const [findText, setFindText] = useState('')
  const [searchParams, setSearchParams] = useSearchParams('')

  if (!searchParams.get('search') && findText) {
    setFindText('')
  }
  const onChangeSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.currentTarget.value
    setFindText(searchValue)

    setSearchParams(searchParams => {
      searchParams.set('search', searchValue)
      return searchParams
    })

    !searchValue && setSearchParams('')
  }

  const onEnterPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      setFindText('')
      setSearchParams('')
    }
  }

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
        <TextField
          value={findText}
          type={'search'}
          className={s.textfield}
          placeholder={'Найти классы'}
          onChange={onChangeSearchHandler}
          onKeyUp={onEnterPressHandler}
        />
      </div>
    </header>
  )
}
