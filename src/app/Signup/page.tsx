"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSighup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/API/users/Signup", user);
      console.log("Signup successfully", response.data);
      router.push("/Login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("Signup failed", error.message);
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Signup"}</h1>
      <hr />
      <label htmlFor="username">
        Username:
        <input
          className="border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 p-2 ml-4 text-black "
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Enter your username"
        />
      </label>
      <label htmlFor="email">
        Email:
        <input
          className="border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 p-2 ml-4 text-black"
          type="email"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter your email"
        />
      </label>
      <label htmlFor="password">
        Password:
        <input
          className="border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 p-2 ml-4 text-black"
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter your password"
        />
      </label>
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={onSighup}
      >
        {buttonDisabled ? "No Signup" : "Signup Here"}
      </button>
      <Link href="/Login">
        <p className="text-blue-500">Already have an account? Login here</p>
      </Link>
    </div>
  );
}
