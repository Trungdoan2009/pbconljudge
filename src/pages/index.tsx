import ProblemTable from "@/components/ProblemsTable/ProblemTable";
import Topbar from "@/components/Topbar/Topbar";
import Head from "next/head";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore"; 
import { firestore } from "@/firebase/firebase";
import useHasMounted from "@/hooks/useHasMounted";

export default function Home() {
  const hasMounted = useHasMounted();

  const [loadingProblems, setLoadingProblems] = useState(false);
  const [inputs, setInputs] = useState({
    id: '',
    title: '',
    difficulty: '',
    category: '',
    videoId: '',
    link: '',
    order: 0,
    likes: 0,
    dislikes: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newProblem = {
      ...inputs,
      order: Number(inputs.order),
    };
    await setDoc(doc(firestore, "problems", inputs.id), newProblem);
    alert("Saved to DB");
  };

  // If not mounted, return null
  if (!hasMounted) return null;

  return (
    <>
      <Head>
        <title>Danh Sách Bài Tập</title>
      </Head>
      <main className="bg-gray-100 min-h-screen">
        <Topbar />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-200">
            &ldquo; Danh Sách Bài Tập &rdquo;
          </h1>
          <div className="relative overflow-x-auto mt-8 bg-white shadow-lg rounded-lg">
            {loadingProblems && (
              <div className="max-w-[1200px] mx-auto sm:w-7/12 w-full animate-pulse">
                {[...Array(10)].map((_, idx) => (
                  <LoadingSkeleton key={idx} />
                ))}
              </div>
            )}
            <table className="text-sm text-left text-gray-500 dark:text-gray-400 w-full">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-2 font-medium">
                    Tình Trạng
                  </th>
                  <th scope="col" className="px-4 py-2 font-medium">
                    Tên
                  </th>
                  <th scope="col" className="px-4 py-2 font-medium">
                    Độ Khó
                  </th>
                  <th scope="col" className="px-4 py-2 font-medium">
                    Thể Loại
                  </th>
                  <th scope="col" className="px-4 py-2 font-medium">
                    Video Hướng Dẫn
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Always render ProblemTable */}
                <ProblemTable setLoadingProblems={setLoadingProblems} />
              </tbody>
            </table>
          </div>

          {/* Form Section */}
          <form
            className="mt-8 bg-white p-6 rounded-lg shadow-lg max-w-sm"
            onSubmit={handleSubmit}
          >
            <h2 className="text-lg font-semibold mb-4">Thêm Bài Tập Mới</h2>
            <input
              onChange={handleInputChange}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              type="text"
              placeholder="Problem ID"
              name="id"
            />
            <input
              onChange={handleInputChange}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              type="text"
              placeholder="Title"
              name="title"
            />
            <input
              onChange={handleInputChange}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              type="text"
              placeholder="Difficulty"
              name="difficulty"
            />
            <input
              onChange={handleInputChange}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              type="text"
              placeholder="Category"
              name="category"
            />
            <input
              onChange={handleInputChange}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              type="text"
              placeholder="Order"
              name="order"
            />
            <input
              onChange={handleInputChange}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              type="text"
              placeholder="Video ID (optional)"
              name="videoId"
            />
            <input
              onChange={handleInputChange}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              type="text"
              placeholder="Link (optional)"
              name="link"
            />
            <button className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
              Save to DB
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

const LoadingSkeleton = () => {
  return (
    <div className="flex items-center space-x-12 mt-4 px-6">
      <div className="w-6 h-6 shrink-0 rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-52 w-32 rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-52 w-32 rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-52 w-32 rounded-full bg-dark-layer-1"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
