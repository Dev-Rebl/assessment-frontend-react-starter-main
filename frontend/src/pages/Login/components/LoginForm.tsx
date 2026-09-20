import { useMutation } from '@tanstack/react-query'
import { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginMutationOptions } from '../../../api/mutations'
import { Button } from '../../../components/Button'

export const LoginForm = () => {
  const navigate = useNavigate()

  const loginMutation = useMutation({
    ...loginMutationOptions,
    onSuccess: () => {
      navigate('/')
    },
    onError: () => {
      // TODO: implement toaster
    },
  })

  const sendData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const email = String(formData.get('email'))
    const password = String(formData.get('password'))

    loginMutation.mutate({
      email,
      password,
    })
  }
  return (
    <form onSubmit={sendData} className="flex flex-col gap-6">
      <label className="grid gap-2">
        <span>Email address</span>
        <input
          className="w-full rounded-lg border-2 bg-transparent p-2 text-content placeholder:text-content-muted focus:border-feedback-focus focus:outline-none focus:ring-2 focus:ring-feedback-focus/20"
          name="email"
          type="email"
          defaultValue={import.meta.env.DEV ? 'test@axxes.com' : undefined}
          placeholder="Email"
        />
      </label>

      <label className="grid gap-2">
        <span>Password</span>
        <input
          className="w-full rounded-lg border-2 bg-transparent p-2 text-content placeholder:text-content-muted focus:border-feedback-focus focus:outline-none focus:ring-2 focus:ring-feedback-focus/20"
          name="password"
          type="password"
          defaultValue={import.meta.env.DEV ? 'test' : undefined}
          placeholder="Password"
        />
      </label>

      <Button type="submit">Login</Button>
    </form>
  )
}
