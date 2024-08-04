import { auth, firestore } from '@/firebase/firebase';
import { problems } from '@/mockProblems/problems';
import { DBProblem } from '@/utils/types/problem';
import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AiFillYoutube } from 'react-icons/ai';
import { BsCheckCircle } from 'react-icons/bs';
import { DiLaravel } from 'react-icons/di';
import { IoClose } from 'react-icons/io5';
import YouTube from 'react-youtube';

type ProblemsTableProps = {
    setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>
};

const ProblemsTable: React.FC<ProblemsTableProps> = ({ setLoadingProblems }) => {
    const [youtubePlayer,setYoutubePlayer] = useState({
        isOpen:false,
        videoId: ""
    });

    const closeModal =() => {
        setYoutubePlayer({isOpen:false , videoId: ""});
    }
    useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") closeModal();
		};
		window.addEventListener("keydown", handleEsc);

		return () => window.removeEventListener("keydown", handleEsc);
	}, []);
    const problems = useGetProblems(setLoadingProblems);
    const solvedProblems = useGetSolvedProblems();
    return (
        <>
            {problems.map((problem, idx) => {
                const difficultyColor = problem.difficulty === "Easy"
                    ? "text-green-600"
                    : problem.difficulty === "Medium"
                    ? "text-yellow-600"
                    : "text-red-600";

                return (
                    <tr
                        key={problem.id}
                        className={`${idx % 2 === 1 ? 'bg-gray-100 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'} border-b`}
                    >
                        <td className='px-4 py-3 text-green-600'>
                            {solvedProblems.includes(problem.id) && <BsCheckCircle fontSize={"20"} />}
                        </td>
                        <td className="px-4 py-3">
                            {problem.link ? (
                                <Link href={problem.link} className='hover:text-blue-600 cursor-pointer' target='_blank'>
                                    {problem.title} 
                                </Link>
                            ) : (
                                <Link className="text-blue-600 hover:underline" href={`/problems/${problem.id}`}>
                                {problem.title}
                            </Link>
                            )}
                        </td>
                        <td className={`px-4 py-3 ${difficultyColor}`}>{problem.difficulty}</td>
                        <td className="px-4 py-3">{problem.category}</td>
                        <td className="px-4 py-3">
                            {problem.videoId ? (
                                <AiFillYoutube fontSize={"28"} className="cursor-pointer hover:text-red-600" 
                                    onClick={() => setYoutubePlayer({isOpen: true, videoId: problem.videoId as string})}
                                />
                            ) : (
                                <p className="text-dark-blue-s">Sẽ sớm ra mắt</p>
                            )}
                        </td>
                        
                    </tr>
                );
            })}
            {youtubePlayer.isOpen && (
            <div className='fixed top-0 left-0 h-screen w-screen flex items-center justify-center'>
                <div className='bg-black z-10 opacity-70 top-0 left-0 w-screen absolute'></div>
                <div className= 'w-full z-50 h-full px-6 relative max-w-4xl'>
                    <div className='w-full h-full flex items-center justify-center relative'>
                        <div className='w-full relative'>
                            <IoClose fontSize={"35"} className='cursor-pointer absolute -top-16 right-0' onClick={closeModal}/>
                            <YouTube videoId={youtubePlayer.videoId} loading='lazy' iframeClassName='w-full min-h-[500px]'/> 
                        </div>
                    </div>
                </div>
            </div>
            )}
        </>
    );
};

export default ProblemsTable;

function useGetProblems(setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>) {
    const [problems, setProblems] = useState<DBProblem[]>([]);

    useEffect(() => {
        const getProblems = async () => {
            setLoadingProblems(true);
            const q = query(collection(firestore,"problems"),orderBy("order","asc"))
            const querySnapshot = await getDocs(q);
            const tmp : DBProblem[] = [];
            querySnapshot.forEach((doc) => {
                tmp.push({ id: doc.id, ...doc.data()} as DBProblem)
            });
            setProblems(tmp);
            setLoadingProblems(false);
        }
        getProblems()
    },[setLoadingProblems])
    return problems;
}
function useGetSolvedProblems() {
	const [solvedProblems, setSolvedProblems] = useState<string[]>([]);
	const [user] = useAuthState(auth);

	useEffect(() => {
		const getSolvedProblems = async () => {
			const userRef = doc(firestore, "users", user!.uid);
			const userDoc = await getDoc(userRef);

			if (userDoc.exists()) {
				setSolvedProblems(userDoc.data().solvedProblems);
			}
		};

		if (user) getSolvedProblems();
		if (!user) setSolvedProblems([]);
	}, [user]);

	return solvedProblems;
}