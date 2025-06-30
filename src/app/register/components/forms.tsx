'use client'

import { signup } from '@/app/login/actions'

export default function Signup() {
  return (
    <form className="flex flex-col gap-4 w-96" method="post">
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={signup}>Sign up</button>
    </form>
  )
}
