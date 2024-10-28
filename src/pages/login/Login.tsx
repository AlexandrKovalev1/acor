import s from './login.module.scss'
import { Card } from '../../components/card'
import { Button } from '../../components/button'
import { TextField } from '../../components/textField'
import { Logotype } from '../../assets'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema } from '../../common/utils/zodSchemas.ts'
import { useLoginMutation } from '../../services/loginApi.ts'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ROUTES } from '../../app/router/router.tsx'

export const Login = () => {
  type LoginSchemaType = z.infer<typeof LoginSchema>
  const navigate = useNavigate()

  const [login] = useLoginMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(LoginSchema),
  })

  const isButtonSubmitDisabled = !!Object.keys(errors).length

  const onSubmitLoginHandler = (data: LoginSchemaType) => {
    login(data)
      .unwrap()
      .then(res => {
        localStorage.setItem('token', res.login.token)
      })
      .then(() => {
        toast(`Здравствуйте `, { type: 'success' })
        navigate(ROUTES.base)
      })
      .catch(() => toast('Invalid Credentials', { type: 'error' }))
  }
  return (
    <div className={s.wrapper}>
      <Logotype />
      <Card className={s.card}>
        <form className={s.form} onSubmit={handleSubmit(onSubmitLoginHandler)}>
          <h3>Войдите в свой аккаунт</h3>
          <TextField
            label={'Адрес электронной почты'}
            required
            {...register('email')}
            errorMessage={errors.email?.message}
          />
          <TextField
            label={'Пароль'}
            type={'password'}
            required
            {...register('password')}
            errorMessage={errors.password?.message}
          />
          <Button className={s.button} variant={'fullWidth'} disabled={isButtonSubmitDisabled}>
            Продолжить
          </Button>
          <a href="" className={s.link}>
            Не удается войти в систему?
          </a>
        </form>
      </Card>
    </div>
  )
}
