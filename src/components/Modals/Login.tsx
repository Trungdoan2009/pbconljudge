import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/firebase";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
type LoginProps = {};

const Login: React.FC<LoginProps> =() => {
	const setAuthModalState = useSetRecoilState(authModalState)
	const handleClick = (type: "login" | "register" | "forgotPassword") =>{
		setAuthModalState((prev) => ({...prev, type}));

	};
	const [inputs, setInputs] = useState({ email:"", password: ""});
	const [
		signInWithEmailAndPassword,
		user,
		loading,
		error,
	  ] = useSignInWithEmailAndPassword(auth);
	  const router = useRouter();
	  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	  };

	  const handleLogin = async (e: React. FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!inputs.email || !inputs.password) return alert("Please fill all fields");
		try {
			const newUser = await signInWithEmailAndPassword(inputs.email, inputs.password);
			if (!newUser) return;
			router.push("/");
		} catch (error: any) {
			toast.error("Nhập Sai Mật Khẩu", { position: "top-center", autoClose: 3000});
		}
	  };

	  useEffect(() => {
		if(error) toast.error("Nhập Sai Mật Khẩu", { position: "top-center", autoClose: 3000});
	  },[error])
	  console.log(user, "user");
    return <form className="space-y-6 px-6 pb-4" onSubmit = {handleLogin}>
        <h3 className='text-xl font-medium text-dark-blue-s'>Đăng nhập vào PBCOJ</h3>
			<div>
				<label htmlFor='email' className='text-black font-medium block mb-2 '>
					Email của bạn
				</label>
                <input
				onChange={handleInputChange}
					type='email'
					name='email'
					id='email'
					className='
            border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray-500 placeholder-gray-400 text-white
        '
					placeholder='name@company.com'
				/>
            </div>
            <div>
            <label htmlFor='password' className='text-black font-medium block '>
					Mật Khẩu của bạn
				</label>
				<input
				onChange={handleInputChange}
					type='password'
					name='password'
					id='password'
					className='
            border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray-500 placeholder-gray-400 text-white
        '
					placeholder='*******'
				/>
            </div>

            <button
				type='submit'
				className='w-full text-white focus:ring-blue-300 font-medium rounded-lg
                text-sm px-5 py-2.5 text-center bg-dark-blue-s hover:bg-dark-blue-s
            '
			>
				{loading ? "Đang tải..." : "Đăng Nhập"}
			</button>
			<button className='flex w-full justify-end' onClick={() => handleClick("forgotPassword")}>
				<a href='#' className='text-sm block text-dark-blue-s hover:underline w-full text-right'>
					Quên Mật Khẩu?
				</a>
			</button>
			<div className='text-sm font-medium text-black' onClick={() => handleClick("register")}>
				Chưa đăng ký?{" "}
				<a href='#' className='text-blue-700 hover:underline'>
					Tạo tài khoán
				</a>
            </div>
    </form>
};

export default Login;
