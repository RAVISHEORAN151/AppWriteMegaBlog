import React,{useState} from 'react'
import authService from '../appwrite/auth'
import {Link, useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import Button from "./Button";
import Input from "./container/Input";
import Logo from "./Logo";
import { useDispatch } from 'react-redux'
import {useForm} from 'react-hook-form'


function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

   const create = async (data) => {
  console.log("CREATE BUTTON CLICKED");
  console.log("FORM DATA:", data);

  setError("");

  try {
    const session = await authService.createAccount(data);

    console.log("ACCOUNT CREATED:", session);

    if (session) {
      const userData = await authService.getCurrentUser();

      if (userData) {
        dispatch(login({ userData }));
        navigate("/");
      }
    }
  } catch (error) {
    console.log("SIGNUP ERROR:", error);
    setError(error.message);
  }
};

   return (
        <div className="flex items-center justify-center">

            <div className="mx-auto w-full max-w-lg rounded-2xl border border-violet-400/20 bg-slate-900/60 p-10 shadow-[0_10px_30px_rgba(15,23,42,0.65)] backdrop-blur-xl">

                <div className="mb-4  flex justify-center align-centre">
                    <span className="w-full mx-100">
                        <Logo width="400%" />
                    </span>
                </div>

                <h2 className="text-center text-2xl font-bold leading-tight text-slate-100">
                    Sign up to create account
                </h2>

                <p className="mt-2 text-center text-base text-slate-400">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-cyan-300 transition-all duration-200 hover:text-cyan-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

                {error && <p className="text-center text-red-400">{error}</p>}

                <form onSubmit={handleSubmit(create)} className="mt-8">
                    <div className="space-y-5">
                        <Input
                            label="Full Name:"
                            placeholder="Enter your full name"
                            {...register("name", { required: true })}
                        />

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
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup