import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useSignup } from '../../queries/auth-queries'

export const Route = createFileRoute('/auth/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  const { mutate } = useSignup()
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
  })

  function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    mutate(signupData)
  }

  return (
    <div className="grid h-screen grid-cols-1 gap-4 p-4 lg:grid-cols-2">
      <div className="flex flex-col">
        <div className="">
          <span className="text-2xl font-bold"> LMS </span>
        </div>
        <div className="flex h-full flex-col justify-center gap-8 pb-[30%] lg:pb-0">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-2xl font-semibold">
              Hi, welcome
            </h1>
            <p className="text-lg">
              Lorem, ipsum dolor.
            </p>
          </div>
          <form className="flex flex-col gap-6 px-0 lg:px-32" onSubmit={handleSignup}>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <label htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  className="d-input w-full"
                  placeholder="Enter your Name"
                  type="text"
                  value={signupData.name}
                  onChange={e => setSignupData({ ...signupData, name: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="email">
                  Email
                </label>
                <input
                  id="password"
                  className="d-input w-full"
                  placeholder="Enter your email"
                  value={signupData.email}
                  onChange={e => setSignupData({ ...signupData, email: e.target.value })}
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  className="d-input w-full"
                  placeholder="Enter your password"
                  value={signupData.password}
                  onChange={e => setSignupData({ ...signupData, password: e.target.value })}
                  type="text"
                />
              </div>
            </div>
            <button className="d-btn d-btn-primary w-full" type="submit">
              Signup
            </button>
            <p className="text-center">
              Already have an account?
              <Link className="text-sky-700" to="/auth/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
      <div
        className="hidden h-full rounded-xl bg-cover bg-center lg:block"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1741548384019-44e405f96772?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}
      />
    </div>
  )
}
