import Link from "next/link";

const Homepage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome to My Mini Games</h1>
      <div className="flex justify-center items-center gap-6">
        <Link href="/tiktactoe">
          <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-green-500">
            Tic Tac Toe
          </button>
        </Link>
        <Link href="/flappy">
          <button className="px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500">
            Flappy Bird
          </button>
        </Link>
        <Link href="/snake">
          <button className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-purple-500">
            Snake Game
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
