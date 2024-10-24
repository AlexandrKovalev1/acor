import s from './layout.module.scss'
import { Header } from '../header'

export const Layout = () => {
  return (
    <div className={s.wrapper}>
      <Header />
      <nav className={s.nav}></nav>
      <main className={s.main}></main>
    </div>
  )
}
