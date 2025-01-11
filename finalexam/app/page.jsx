"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter(); // Initialize the router

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-800 mb-8">FINAL EXAM</h1>

      {/* Buttons */}
      <div className="space-x-4">
        <button
          onClick={() => router.push("/login")} // Navigate to the login page
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Login
        </button>
        <button
          onClick={() => router.push("/register")} // Navigate to the register page
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Register
        </button>
      </div>
    </div>
  );
}
