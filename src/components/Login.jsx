import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom' // what it do
import appwriteService from '../appwrite/config' // its work
import { login as authLogin } from '../store/authSlice' // what it do
import Button from "./Button";
import Input from "./container/Input";
import Logo from "./Logo";
import {useDispatch} from "react-redux" // why needed
import {useForm} from "react-hook-form" // what can it do

function Login() {
    const navigate = useNavigate() // explain that hook
    const dispatch = useDispatch() // explain that hook
    const {register, handleSubmit} = useForm() // what is register here explaint that hook
    const [error, setError] = useState("")

    const login = async(data) =>{
        setError("")
        try {
            const session = await appwriteService.login(data);
            if(session){
                const userData = await appwriteService.getCurrentUser()
                if(userData) dispatch(authLogin(userData));
                navigate("/")

                
            }
            
        } catch (error) {
            setError(error.message)
            
        }
    }

  return (
  <div className="flex w-full items-center justify-center">
    <div className="mx-auto w-full max-w-lg rounded-2xl border border-violet-400/20 bg-slate-900/60 p-10 shadow-[0_10px_30px_rgba(15,23,42,0.65)] backdrop-blur-xl">

      <div className="mb-4  flex justify-center align-centre">
            <span className="w-full mx-100">
                <Logo width="400%" />
            </span>
        </div>

      <h2 className="text-center text-2xl font-bold leading-tight text-slate-100">
        Sign in to your account
      </h2>

      <p className="mt-2 text-center text-base text-slate-400">
        Don&apos;t have any account?&nbsp;
        <Link to="/signup" className="font-medium text-cyan-300 transition-all duration-200 hover:text-cyan-200 hover:underline">
          Sign Up
        </Link>
      </p>

      {error && <p className="text-center text-red-400">{error}</p>}

      <form onSubmit={handleSubmit(login)} className="mt-8">
        <div className="space-y-5">
          <Input
            label="Email: "
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*\.\w{2,3}$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />

          <Input
            label="Password: "
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: true,
              minLength: 8,
              validate: {
                strong: (value) =>
                  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(value) ||
                  "Password must be 8+ chars, include uppercase, number, and symbol",
              },
            })}
          />

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-600 text-white shadow-[0_0_18px_rgba(139,92,246,0.35)] hover:from-violet-600 hover:to-fuchsia-700"
          >
            Sign in
          </Button>
        </div>
      </form>
    </div>
  </div>
);
}

export default Login