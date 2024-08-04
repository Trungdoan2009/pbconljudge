import React, { useEffect, useState } from "react";
import { authModalState } from "@/atoms/authModalAtom";
import { useSetRecoilState } from "recoil";
import { auth, firestore } from "@/firebase/firebase";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useRouter } from "next/router";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";


type SignupProps = {};

const Signup: React.FC<SignupProps> =() => {
	const setAuthModalState = useSetRecoilState(authModalState);
	const handleClick = () => {
		setAuthModalState((prev) => ({ ...prev, type: "login" }));
	};
	const [inputs,setInputs] = useState({email:'',displayName:'', password:''})
	const router = useRouter();
	const [
		createUserWithEmailAndPassword,
		user,
		loading,
		error,
	  ] = useCreateUserWithEmailAndPassword(auth);
	const handleChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	}
	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!inputs.email || !inputs.password || !inputs.displayName) return alert("Please fill all fields");
		try {
			toast.loading("Tạo tài khoản của bạn",{position:"top-center",toastId:"loadingToast"})
			const newUser= await createUserWithEmailAndPassword(inputs.email, inputs.password);
			if (!newUser) return;
			const userData = {
				uid: newUser.user.uid,
				email: newUser.user.email,
				displayName: inputs.displayName,
				createdAt: Date.now(),
				updatedAt:Date.now(),
				likedProblems:[],
				dislikedProblems:[],
				solvedProblems:[],
				starredProblems: [],
			}
			await setDoc(doc(firestore, "users", newUser.user.uid), userData)
			router.push('/')
		} catch (error: any) {
			toast.error(error.message,{position:"top-center"})
		} finally {
			toast.dismiss("loadingToast");
		}
	};

	useEffect(() => {
		if(error) alert(error.message)
	},[error])

    return (
        <form className="space-y-6 px-6 pb-4" onSubmit={handleRegister}>
        <h3 className='text-xl font-medium text-dark-blue-s'>Đăng ký vào PBCOJ</h3>
			    <div>
                    <label htmlFor='email' className='text-black font-medium block mb-2'>
                        Email của bạn
                     </label>
                <input
				onChange = {handleChangeInput}
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
				<label htmlFor='displayName' className='text-black font-medium block mb-2'>
					Tên của bạn
				</label>
                <input
				onChange = {handleChangeInput}
					type='displayName'
					name='displayName'
					id='displayName'
					className='
            border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray-500 placeholder-gray-400 text-white
        '
					placeholder='Thế Trung'
				/>
            </div>
            <div>
            <label htmlFor='password' className='text-black font-medium block mb-2 '>
					Mật Khẩu của bạn
				</label>
				<input
				onChange={handleChangeInput}
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
				{loading ? "Đang tải..." : "Đăng ký"}
			</button>
			<div className='text-sm font-medium text-black'>
				Bạn đã có tài khoản rồi đúng không?{" "}
				<a href='#' className='text-blue-700 hover:underline' onClick={handleClick}>
					Đăng nhập
				</a>
            </div>
    </form>
    );
};

export default Signup;
