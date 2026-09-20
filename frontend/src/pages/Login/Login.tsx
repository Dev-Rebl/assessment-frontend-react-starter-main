import loginImage from '../../assets/images/login-music-collage.png'
import { Logo } from '../../components/Logo'
import { PageLayout } from '../../components/PageLayout'
import { Surface } from '../../components/Surface'
import { LoginForm } from './components/LoginForm'

export const Login = () => {
  return (
    <PageLayout contentClassName="overflow-y-auto">
      <div className="flex min-h-full items-center justify-center">
        <Surface className="w-full max-w-screen-md overflow-clip grid grid-cols-[2fr_3fr]">
          <div className="p-6 isolate relative flex flex-col justify-end gap-4 text-white">
            <img
              src={loginImage}
              alt="login music collage"
              className="absolute inset-0 h-full w-full border-r object-cover size-full object-center z-[-1]"
            />
            <h2>
              Music
              <br /> fuels better
              <br /> work.
            </h2>

            <hr className="w-10" />

            <small className="leading-4 text-white/70">
              A brighter day,
              <br /> a better you
            </small>
          </div>
          <div className="flex flex-col gap-8 p-6">
            <div className="h-20 w-auto flex">
              <Logo />
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="text-display">Welcome back</h1>
              <p>Sign in to keep the office playing</p>
            </div>

            <LoginForm />
          </div>
        </Surface>
      </div>
    </PageLayout>
  )
}
