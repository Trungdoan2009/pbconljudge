import { auth } from "@/firebase/firebase";
import React, { useEffect, useState } from "react";
import { useSendPasswordResetEmail, useVerifyBeforeUpdateEmail } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

type ResetPasswordProps = {};

const ResetPassword: React.FC<ResetPasswordProps> = () => {
	const [email, setEmail] = useState("");
	const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);
	const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const success = await sendPasswordResetEmail(email);
		if (success)
		{
			toast.success("Mật khẩu thiết lập đã được gửi đi", {position: "top-center", autoClose: 3000});
		}
	};

	useEffect(() => {
		if (error) {
			alert(error.message);
		}
	}, [error]);
    return (
        <form className='space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8' onSubmit={handleReset}>
			<h3 className='text-xl font-medium  text-dark-blue-s'>Reset Password</h3>
			<p className='text-sm text-dark-blue-s '>
            Quên mật khẩu của bạn? Nhập địa chỉ email của bạn bên dưới và chúng tôi sẽ gửi cho bạn một email cho phép bạn
            để thiết lập lại nó.
			</p>
			<div>
				<label htmlFor='email' className='text-sm font-medium block mb-2 text-gray-300'>
					Email của bạn
				</label>
				<input
					type='email'
					name='email'
					onChange={(e) => setEmail(e.target.value)}
					id='email'
					className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white'
					placeholder='name@company.com'
				/>
			</div>

			<button
				type='submit'
				className={`w-full text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                bg-dark-blue-s hover:bg-dark-blue-s `}
			>
				Thiết lập lại mật khẩu
			</button>
		</form>
    );
};

export default ResetPassword;
