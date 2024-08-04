import React, { useState, useEffect } from "react";
import PreferenceNav from "./PreferenceNav/PreferenceNav";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import EditorFooter from "./EditorFooter";
import { Problem } from "@/utils/types/problem";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/firebase";
import { toast } from "react-toastify";
import { problems } from "@/utils/problems";
import { useRouter } from "next/router";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import useLocalStorage from "@/hooks/useLocalStorage";

type PlaygroundProps = {
	problem: Problem;
	setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
    setSolved: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface ISettings {
	fontSize: string;
	settingsModalIsOpen: boolean;
	dropdownIsOpen: boolean;
}

const Playground: React.FC<PlaygroundProps> = ({ problem, setSuccess, setSolved }) => {
	const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
	let [userCode, setUserCode] = useState<string>(problem.starterCodeJS);
	const [fontSize, setFontSize] = useLocalStorage("lcc-fontSize","16px");
    const [settings, setSettings] = useState<ISettings>({
        fontSize: fontSize,
        settingsModalIsOpen: true,
        dropdownIsOpen: false
    });
	const [user] = useAuthState(auth);
	const {
		query: { pid },
	} = useRouter();

	const handleSubmit = async () => {
		if (!user) {
			toast.error("Please login to submit your code", {
				position: "top-center",
				autoClose: 3000,
				theme: "dark",
			});
			return;
		}
		try {
			userCode = userCode.slice(userCode.indexOf(problem.starterFunctionName));
			const cb = new Function(`return ${userCode}`)();
			const handler = problems[pid as string].handlerFunction;

			if (typeof handler === "function") {
				const success = handler(cb);
				if (success) {
					toast.success("Vượt qua các testcases", {
						position: "top-center",
						autoClose: 3000,
						theme: "dark",
					});
					setSuccess(true);
					setTimeout(() => {
						setSuccess(false);
					}, 4000);

					const userRef = doc(firestore, "users", user.uid);
					await updateDoc(userRef, {
						solvedProblems: arrayUnion(pid),
					});
                    setSolved(true);
				}
			}
		} catch (error: any) {
			console.log(error.message);
			if (
				error.message.startsWith("AssertionError")
			) {
				toast.error("1 hay nhiều testcases sai", {
					position: "top-center",
					autoClose: 3000,
				});
			} else {
				toast.error(error.message, {
					position: "top-center",
					autoClose: 3000,
				});
			}
		}
	};
    const onChange = (value: string) => {
        setUserCode(value);
        localStorage.setItem(`code-${pid}`, JSON.stringify(value));
    }
	useEffect(() => {
		const code = localStorage.getItem(`code-${pid}`);
		if (user) {
			setUserCode(code ? JSON.parse(code) : problem.starterCodeJS);
		} else {
			setUserCode(problem.starterCodeJS);
		}
	}, [pid, user, problem.starterCodeJS]);

	return (
        <div className="flex flex-col bg-dark-layer-1 relative overflow-x-hidden shadow-lg"> {/* Added shadow */}
            <PreferenceNav settings={settings} setSettings={setSettings} />
            <Split className="h-[calc(100vh-94px)]" direction='vertical' sizes={[60, 40]} minSize={60}>
                <div className='w-full overflow-auto shadow-md'> {/* Added shadow */}
                    <CodeMirror
                        value={userCode} // Updated to use userCode
                        extensions={[javascript()]}
                        onChange={onChange}
                        theme={vscodeDark}
                        style={{
                            fontSize: settings.fontSize
                        }}
                    />
                </div>
                <div className="w-full px-5 overflow-auto bg-gray-100 shadow-md"> {/* Added shadow */}
                    <div className="flex h-10 items-center space-x-6">
                        <div className="relative flex h-full flex-col justify-center cursor-pointer">
                            <div className="text-sm font-medium leading-5 text-dark-blue-s">TestCases</div>
                            <hr className="absolute bottom-0 h-0.5 w-16 rounded-full border-none bg-dark-blue-s" />
                        </div>
                    </div>
                    <div className="flex">
                        {problem.examples.map((example, index) => (
                            <div className='mr-2 items-start mt-2 ' key={example.id} onClick={() => setActiveTestCaseId(index)}>
                                <div className='flex flex-wrap items-center gap-y-4'>
                                    <div className={`font-medium items-center transition-all focus:outline-none inline-flex bg-gray-200
                                        hover:bg-gray-100 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap shadow-sm ${activeTestCaseId === index ? "text-dark-blue-s" : "text-gray-800"}
                                    `}>
                                        Case {index + 1}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='font-semibold'>
                        <p className='text-sm font-medium mt-4 text-dark-blue-s'>Input:</p>
                        <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-gray-200 border-transparent text-dark-blue-s mt-2 shadow-inner'>
                            {problem.examples[activeTestCaseId].inputText}
                        </div>
                        <p className='text-sm font-medium mt-4 text-dark-blue-s'>Output:</p>
                        <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-gray-200 border-transparent text-dark-blue-s mt-2 mb-12 shadow-inner'>
                            {problem.examples[activeTestCaseId].outputText}
                        </div>
                    </div>
                    <div>
                        <EditorFooter handleSubmit={handleSubmit} />
                    </div>
                </div>
            </Split>
        </div>
    );
};

export default Playground;
