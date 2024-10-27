import s from './layout.module.scss'
import { Header } from '../header'
import { NavigationMenu } from '../navigation'
import { ClassInfoPage } from '../../pages/classInfoPage'

export const Layout = () => {
  return (
    <div className={s.container}>
      <Header />
      <NavigationMenu />
      <main className={s.main}>
        <ClassInfoPage />
      </main>
    </div>
  )
}
