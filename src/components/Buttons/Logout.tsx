import { auth } from '@/firebase/firebase';
import React from 'react';
import { useSignOut } from 'react-firebase-hooks/auth';
import { FiLogOut } from 'react-icons/fi';

const Logout:React.FC = () => {
    const[signOut, loading, error] = useSignOut(auth);
    const handleLogout = () => {
        signOut();
    }
    return ( 
        <button className= "bg-white py-1.5 px-3 cursor-pointer rounded text-dark-blue-s" onClick={handleLogout}>
            <FiLogOut/>
        </button>
    );
};
export default Logout;