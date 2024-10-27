import s from './classInfoPage.module.scss'
import { CheckBox } from '../../components/checkBox'
import { ComponentPropsWithoutRef } from 'react'
import clsx from 'clsx'
import { Navigate, useSearchParams } from 'react-router-dom'
import { useGetClasses } from '../../common/hooks/useGetClasses.ts'
import { useSelectedClassObj } from '../../common/hooks/useSelectedClassObj.ts'

export const ClassInfoPage = () => {
  const { classes } = useGetClasses()
  const selectedClass = useSearchParams()[0].get('selectedClass')
  const { selectedClassObj, comunicationItems } = useSelectedClassObj(classes, selectedClass)
  if (!classes[0].children) return <Navigate to={'/login'} />

  if (!selectedClassObj) return <div>Выберете класс</div>

  return (
    <div className={s.wrapper}>
      <div>
        <h3>Описание</h3>
        <textarea className={s.textarea} value={selectedClassObj.data || ''} />
      </div>
      <div>
        <h3>Свойства</h3>
        <TableProperties />
      </div>
      <div>
        <h3>Связи</h3>
        <TableCommunications tableItems={comunicationItems} />
      </div>
    </div>
  )
}

type TableProps = {
  variant?: 'small' | 'large'
} & ComponentPropsWithoutRef<'table'>

const Table = ({ variant = 'large', ...props }: TableProps) => {
  return <table className={clsx(s.table, s[variant])} {...props} />
}

const TableHeader = ({ children, ...props }: ComponentPropsWithoutRef<'thead'>) => {
  return (
    <thead {...props}>
      <tr>{children}</tr>
    </thead>
  )
}

const TableBody = ({ ...props }: ComponentPropsWithoutRef<'tbody'>) => {
  return <tbody {...props} />
}

const TableProperties = () => {
  return (
    <Table>
      <TableHeader>
        <td>Название</td>
        <td>Значение по умолчанию</td>
        <td>Единица измерения</td>
      </TableHeader>
      <TableBody>
        <tr>
          <td>Давление номинальное</td>
          <td>2,5</td>
          <td>МПа</td>
        </tr>
        <tr>
          <td>Пожаробезопасный</td>
          <td>
            <CheckBox />
          </td>
          <td></td>
        </tr>
        <tr>
          <td>Температура среды</td>
          <td></td>
          <td>°C</td>
        </tr>
        <tr>
          <td>Функциональный признак прибора</td>
          <td>T</td>
          <td></td>
        </tr>
      </TableBody>
    </Table>
  )
}

const TableCommunicationsItem = ({ label }: { label: string }) => {
  return (
    <tr>
      <td>
        <CheckBox label={label} />
      </td>
    </tr>
  )
}

const TableCommunications = ({ tableItems }: { tableItems?: string[] }) => {
  return (
    <Table variant={'small'}>
      <TableHeader>
        <td>
          <CheckBox label={'Название класса'} />
        </td>
      </TableHeader>
      <TableBody>{tableItems?.map(i => <TableCommunicationsItem label={i} />)}</TableBody>
    </Table>
  )
}
