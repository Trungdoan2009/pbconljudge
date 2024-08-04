import { authModalState } from "@/atoms/authModalAtom";
import Link from "next/link";
import React from "react";
import { useSetRecoilState } from "recoil";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> =() => {
    const setAuthModalState = useSetRecoilState(authModalState)
    const handleClick = () => {
        setAuthModalState((prev) => ({...prev, isOpen:true}));
    };
    return (
        <div className='flex items-center justify-between sm:px-12 px-2 md:px-24'>
            <Link href='/' className='flex items-center justify-center h-20'>
                <img src='/logo.png' alt='PBCOJ' className='h-full'></img>
            </Link>
            <div className='flex items-center'>
                <button className='bg-dark-blue-s text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium hover:text-dark-blue-s hover:bg-white hover:border-dark-blue-s border-2 border-transparent transition duration-300 ease-in-out' onClick={handleClick}>
                    Đăng Nhập
                </button>
            </div>
        </div>
    );
};

export default Navbar;
