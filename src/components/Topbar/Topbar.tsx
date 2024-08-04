import { auth } from "@/firebase/firebase";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import { useRouter } from "next/router";
import Logout from "../Buttons/Logout";
import Timer from "../Timer/Timer";
import { problems } from "@/utils/problems";
import { Problem } from "@/utils/types/problem";


type TopbarProps = {
	problemPage?: boolean;
};

const Topbar: React.FC<TopbarProps> = ({ problemPage }) => {
	const [user] = useAuthState(auth);
	const setAuthModalState = useSetRecoilState(authModalState);
	const router = useRouter();
	const handleProblemChange = (isForward:boolean) => {
		const { order } = problems[router.query.pid as string] as Problem;
		const direction = isForward ? 1 : -1;
		const nextProblemOrder = order + direction;
		const nextProblemKey = Object.keys(problems).find((key) => problems[key].order === nextProblemOrder);
		console.log(nextProblemKey);

		if (isForward && !nextProblemKey) {
			const firstproblemKey = Object.keys(problems).find((key) => problems[key].order === 1);
			router.push(`/problems/${firstproblemKey}`);
		} else if (!isForward && !nextProblemKey) {
			const lastProblemKey = Object.keys(problems).find(
				(key) => problems[key].order === Object.keys(problems).length
			);
			router.push(`/problems/${lastProblemKey}`)
		}
		else {
			router.push(`/problems/${nextProblemKey}`)
		}
	}
	return (
		<nav className='relative flex h-[70px] w-full shrink-0 items-center px-5 bg-white text-dark-gray-7'>
			<div className={`flex w-full items-center justify-between ${!problemPage ? "max-w-[1200px] mx-auto" : ""}`}>
				<Link href='/' className='h-[60px] flex-1'>
					<Image src='/logo.png' alt='Logo' height={150} width={150} />
				</Link>	
				{problemPage && (
					<div className='flex items-center gap-4 flex-1 justify-center'>
						<div
							className='flex items-center justify-center rounded white hover:bg-dark-gray-8 h-8 w-8 cursor-pointer text-dark-blue-s'
							onClick = {() => handleProblemChange(false)}						
						>
							<FaChevronLeft />
						</div>
						<Link
							href='/'
							className='flex items-center gap-2 font-medium max-w-[170px] text-dark-blue-s cursor-pointer'
						>
							<div>
								<BsList />
							</div>
							<p>Problem List</p>
						</Link>
						<div
							className='flex items-center justify-center rounded bg-white hover:bg-dark-gray-8 h-8 w-8 cursor-pointer text-dark-blue-s'
							onClick = {() => handleProblemChange(true)}
						>
							<FaChevronRight />
						</div>
					</div>
				)}
				<div className='flex items-center space-x-4 flex-1 justify-end'>
					{!user && (
						<Link
							href='/auth'
                            onClick={() => {
                                setAuthModalState((prev) => ({...prev, isOpen: true, type: "login"}));
                            }}
						>
							<button className='bg-dark-fill-3 py-1 px-2 cursor-pointer rounded '>Đăng Nhập</button>
						</Link>
					)}
					{user && problemPage && <Timer />}
					{user && (
						<div className='cursor-pointer group relative'>
							<Image src='/avatar.png' alt='Avatar' width={30} height={30} className='rounded-full' />
                            <div
								className='absolute top-10 left-2/4 -translate-x-2/4  mx-auto bg-white text-dark-blue-s p-2 rounded shadow-lg 
								z-40 group-hover:scale-100 scale-0 
								transition-all duration-300 ease-in-out'
							>
								<p className='text-sm'>{user.email}</p>
							</div>
						</div>
					)}
                    {user && <Logout/>}
				</div>
			</div>
		</nav>
	);
};
export default Topbar;