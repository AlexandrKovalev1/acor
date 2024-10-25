import s from './layout.module.scss'
import { Header } from '../header'
import { NavigationMenu } from '../navigation'
import { Outlet } from 'react-router-dom'
import { nodes } from '../../common/data/nodes.ts'

export const Layout = () => {
  return (
    <div className={s.container}>
      <Header />
      <NavigationMenu nodes={nodes} />
      <main className={s.main}>
        <Outlet />
      </main>
    </div>
  )
}
