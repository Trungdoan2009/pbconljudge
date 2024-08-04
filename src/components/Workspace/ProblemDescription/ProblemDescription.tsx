import CircleSkeleton from "@/components/Skeletons/CircleSkeleton";
import RectangleSkeleton from "@/components/Skeletons/RectangleSkeleton";
import { auth, firestore } from "@/firebase/firebase";
import { DBProblem, Problem } from "@/utils/types/problem";
import { arrayRemove, arrayUnion, doc, getDoc, runTransaction, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiFillLike, AiFillDislike, AiOutlineLoading3Quarters, AiFillStar } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";
import { toast } from "react-toastify";

type ProblemDescriptionProps = {
	problem: Problem;
	_solved: boolean;
};

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ problem, _solved }) => {
	const [user] = useAuthState(auth);
	const { currentProblem, loading, problemDifficultyClass, setCurrentProblem } = useGetCurrentProblem(problem.id);
	const { liked, disliked, solved, setData, starred } = useGetUsersDataOnProblem(problem.id);
    const [updating, setUpdating] = useState(false);

    const returnUserDataAndProblemData = async (transaction:any) => {
        const userRef = doc(firestore, "users", user!.uid);
        const problemRef= doc(firestore, "problems", problem.id)
        const userDoc = await transaction.get(userRef)
        const problemDoc = await transaction.get(problemRef);
        return {userDoc, problemDoc, userRef, problemRef}
    } 

    const handleLike = async() => {
        if (!user) {
            toast.error("Bạn cần phải đăng nhập tài khoản thì mới like được", {position:"top-center"})
            return;
        }
    if (updating) return;
    setUpdating(true);
    await runTransaction(firestore, async(transaction) => {
        const {problemDoc,userDoc, userRef, problemRef} = await returnUserDataAndProblemData(transaction);
        if (userDoc.exists() && problemDoc.exists()) {
            if(liked)
            {
                transaction.update(userRef,{
                    likedProblems: userDoc.data().likedProblems.filter((id:string) => id !== problem.id)
                })                
                transaction.update(problemRef, {
                    likes: problemDoc.data().likes - 1
                })
                setCurrentProblem(prev => prev?{...prev, likes: prev.likes -1} : null)
                setData(prev => ({...prev, liked:false}))
            } else if (disliked)
            {
                transaction.update(userRef,{
                    likedProblems: [...userDoc.data().likedProblems, problem.id],
                    dislikedProblems: userDoc.data().dislikedProblems.filter((id:string) => id !== problem.id)
                })
                transaction.update(problemRef,{
                    likes: problemDoc.data().likes+1,
                    dislikes: problemDoc.data().dislikes-1
                })
                setCurrentProblem(prev => prev? {...prev, likes:prev.likes+1, dislikes: prev.dislikes -1} : null)
                setData(prev => ({...prev, liked:true, disliked:false}))
            } else {
                transaction.update(userRef, {
                    likedProblems: [...userDoc.data().likedProblems, problem.id]
                })
                transaction.update(problemRef,{
                    likes: problemDoc.data().likes+1
                })
                setCurrentProblem(prev => prev? {...prev, likes: prev.likes +1}:null)
                setData(prev => ({...prev,liked:true}))
            }
        }
    })
    setUpdating(false);
};
const handleDislike = async () => {
    if (!user) {
        toast.error("Bạn phải đăng nhập thì mới dislike được", { position: "top-left", theme: "dark" });
        return;
    }
    if (updating) return;
    setUpdating(true);
    await runTransaction(firestore, async (transaction) => {
        const { problemDoc, userDoc, problemRef, userRef } = await returnUserDataAndProblemData(transaction);
        if (userDoc.exists() && problemDoc.exists()) {
            // already disliked, already liked, not disliked or liked
            if (disliked) {
                transaction.update(userRef, {
                    dislikedProblems: userDoc.data().dislikedProblems.filter((id: string) => id !== problem.id),
                });
                transaction.update(problemRef, {
                    dislikes: problemDoc.data().dislikes - 1,
                });
                setCurrentProblem((prev) => (prev ? { ...prev, dislikes: prev.dislikes - 1 } : null));
                setData((prev) => ({ ...prev, disliked: false }));
            } else if (liked) {
                transaction.update(userRef, {
                    dislikedProblems: [...userDoc.data().dislikedProblems, problem.id],
                    likedProblems: userDoc.data().likedProblems.filter((id: string) => id !== problem.id),
                });
                transaction.update(problemRef, {
                    dislikes: problemDoc.data().dislikes + 1,
                    likes: problemDoc.data().likes - 1,
                });
                setCurrentProblem((prev) =>
                    prev ? { ...prev, dislikes: prev.dislikes + 1, likes: prev.likes - 1 } : null
                );
                setData((prev) => ({ ...prev, disliked: true, liked: false }));
            } else {
                transaction.update(userRef, {
                    dislikedProblems: [...userDoc.data().dislikedProblems, problem.id],
                });
                transaction.update(problemRef, {
                    dislikes: problemDoc.data().dislikes + 1,
                });
                setCurrentProblem((prev) => (prev ? { ...prev, dislikes: prev.dislikes + 1 } : null));
                setData((prev) => ({ ...prev, disliked: true }));
            }
        }
    });
    setUpdating(false);
};
const handleStar = async () => {
    if (!user) {
        toast.error("You must be logged in to star a problem", { position: "top-left", theme: "dark" });
        return;
    }
    if (updating) return;
    setUpdating(true);

    if (!starred) {
        const userRef = doc(firestore, "users", user.uid);
        await updateDoc(userRef, {
            starredProblems: arrayUnion(problem.id),
        });
        setData((prev) => ({ ...prev, starred: true }));
    } else {
        const userRef = doc(firestore, "users", user.uid);
        await updateDoc(userRef, {
            starredProblems: arrayRemove(problem.id),
        });
        setData((prev) => ({ ...prev, starred: false }));
    }

    setUpdating(false);
};


	return (
        <div className='bg-white text-gray-900 shadow-sm rounded-lg'>
            {/* Tab Section */}
            <div className='flex h-12 w-full items-center bg-gray-200 text-gray-900'>
                <div className='rounded-t-md px-6 py-3 text-sm cursor-pointer bg-white font-semibold'>
                    Description
                </div>
            </div>

            {/* Main Content */}
            <div className='flex flex-col px-6 py-4 h-[calc(100vh-94px)] overflow-y-auto'>
                {/* Problem Heading */}
                <div className='mb-2'>
                    <div className='flex items-center space-x-4'>
                        <div className='text-2xl font-semibold'>{problem?.title}</div>
                    </div>
                    
                        {!loading && currentProblem && (
                            <div className='flex items-center mt-1'>
                                <div className={`${problemDifficultyClass} rounded-full px-3 py-1 text-xs font-medium capitalize`}>
                                    {currentProblem.difficulty}
                                </div>
                                {(solved || _solved) && (
									<div className='rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s'>
										<BsCheck2Circle />
									</div>
								)}
                                <div className='flex items-center cursor-pointer hover:bg-gray-100 space-x-1 rounded p-2 text-lg text-gray-700 transition' onClick={handleLike}>
                                    {liked && !updating && <AiFillLike className="text-dark-blue-s"/>}
                                    {!liked && <AiFillLike/>}
                                    {updating && <AiOutlineLoading3Quarters className = 'animate-spin'/>}
                                    <span className='text-sm font-medium'>{currentProblem.likes}</span>
                                </div>
                                <div className='flex items-center cursor-pointer hover:bg-gray-100 space-x-1 rounded p-2 text-lg text-gray-700 transition' onClick={handleDislike}>
                                    {disliked && !updating && <AiFillDislike className='text-dark-blue-s' />}
									{!disliked && !updating && <AiFillDislike />}
									{updating && <AiOutlineLoading3Quarters className='animate-spin' />}
                                    <span className='text-sm font-medium'>{currentProblem.dislikes}</span>
                                </div>
                                <div className='cursor-pointer hover:bg-gray-100 rounded p-2 text-xl text-yellow-500 transition' onClick={handleStar}>
                                    {starred && !updating && <AiFillStar className='text-dark-yellow' />}
									{!starred && !updating && <TiStarOutline />}
									{updating && <AiOutlineLoading3Quarters className='animate-spin' />}
                                </div>
                            </div>
                        )}
                </div>
                {loading && (
                    <div className='mt-3 flex space-x-2'>
                        <RectangleSkeleton/>
                        <CircleSkeleton/>
                        <RectangleSkeleton/>
                        <RectangleSkeleton/>
                        <CircleSkeleton/>
                    </div>
                )}
                {/* Problem Statement */}
                <div className='text-gray-800 text-sm leading-relaxed mt-0'>
                    <div dangerouslySetInnerHTML={{ __html: problem?.problemStatement }} />
                </div>

                {/* Examples */}
                <div className='mt-2'>
                    {problem.examples.map((example, index) => (
                        <div key={example.id} className='mb-4'>
                            <p className='font-semibold text-black mb-2'>Example {index + 1}:</p>
                            {example.img && 
                                <img src={example.img} alt=""/>
                            }
                            <div className='bg-gray-200 p-4 rounded-lg shadow-inner'>
                                <pre className='text-sm'>
                                    <strong className='text-blue-600'>Input:</strong> {example.inputText}
                                    <br />
                                    <strong className='text-blue-600'>Output:</strong> {example.outputText}
                                    <br />
                                    {example.explanation && (
                                        <>
                                            <strong>Explanation:</strong> {example.explanation}
                                        </>
                                    )}
                                </pre>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Constraints */}
                <div className='my-8'>
                    <div className='text-gray-900 text-sm font-semibold'>Constraints:</div>
                    <ul className='text-gray-700 ml-6 list-disc my-4'>
                       <div dangerouslySetInnerHTML={{__html:problem.constraints}}/>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProblemDescription;

function useGetCurrentProblem(problemId: string) {
	const [currentProblem, setCurrentProblem] = useState<DBProblem | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [problemDifficultyClass, setProblemDifficultyClass] = useState<string>("");

	useEffect(() => {
		// Get problem from DB
		const getCurrentProblem = async () => {
			setLoading(true);
			const docRef = doc(firestore, "problems", problemId);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const problem = docSnap.data();
				setCurrentProblem({ id: docSnap.id, ...problem } as DBProblem);
				// easy, medium, hard
				setProblemDifficultyClass(
					problem.difficulty === "Easy"
						? "bg-green-100 text-green-600"
						: problem.difficulty === "Medium"
						? "bg-yellow-100 text-yellow-600"
						: " bg-red-100 text-red-600"
				);
			}
			setLoading(false);
		};
		getCurrentProblem();
	}, [problemId]);

	return { currentProblem, loading, problemDifficultyClass, setCurrentProblem };
}

function useGetUsersDataOnProblem(problemId: string) {
	const [data, setData] = useState({ liked: false, disliked: false, starred: false, solved: false });
	const [user] = useAuthState(auth);

	useEffect(() => {
		const getUsersDataOnProblem = async () => {
			const userRef = doc(firestore, "users", user!.uid);
			const userSnap = await getDoc(userRef);
			if (userSnap.exists()) {
				const data = userSnap.data();
				const { solvedProblems, likedProblems, dislikedProblems, starredProblems } = data;
				setData({
                    liked:likedProblems.includes(problemId),
                    disliked:dislikedProblems.includes(problemId),
                    starred:starredProblems.includes(problemId),
                    solved: solvedProblems.includes(problemId)
				});
			}
		};

		if (user) getUsersDataOnProblem();
		return () => setData({ liked: false, disliked: false, starred: false, solved: false });
	}, [problemId, user]);

	return { ...data, setData };
}