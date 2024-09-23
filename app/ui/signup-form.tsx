"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { signup } from "../lib/auth";

const inputContainerStyle = "flex items-center justify-between gap-2";
const inputStyle = "border rounded py-1 px-2";

export default function SignupForm() {
  const [state, dispatch] = useFormState(signup, undefined);
  return (
    <form action={dispatch} className="border rounded-xl shadow p-6 flex flex-col gap-4">
      <div className={inputContainerStyle}>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" id="name" className={inputStyle} placeholder="your name" />
      </div>
      {state?.errors?.name && (
        <p className="text-sm text-red-500 mt-[-12px]">{state.errors.name}</p>
      )}

      <div className={inputContainerStyle}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          className={inputStyle}
          placeholder="your email"
        />
      </div>
      {state?.errors?.email && (
        <p className="text-sm text-red-500 mt-[-12px]">{state.errors.email}</p>
      )}

      <div className={inputContainerStyle}>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          className={inputStyle}
          placeholder="password"
        />
      </div>
      {state?.errors?.password && (
        <div className="text-sm text-red-500 mt-[-10px]">
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}

      {state?.message && <p className="text-sm text-red-500">{state?.message}</p>}

      <div className="flex justify-between gap-2">
        <Link href={"/"} className="w-1/2 py-1 rounded bg-gray-200 text-center">
          Cancel
        </Link>
        <button type="submit" className="flex-grow rounded bg-blue-600 text-white">
          Confirm
        </button>
      </div>
    </form>
  );
}
