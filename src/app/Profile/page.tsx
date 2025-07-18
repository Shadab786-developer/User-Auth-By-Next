"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React from "react";

export default function Profile() {
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("/API/users/logout");
      toast.success("Logout successfully");
      router.push("/Login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const [data, setData] = React.useState("nothing");

  const getUserDetail = async () => {
    try {
      const res = await axios.get("/API/users/me");
      console.log(res.data);
      setData(res.data.data.username);
    } catch (error: any) {
      console.log("Can't get data", error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <h2 className="p-3 rounded bg-green-500 text-white">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/Profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={logout}
      >
        Logout
      </button>
      <button
        className="bg-green-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={getUserDetail}
      >
        Get User Detail
      </button>
    </div>
  );
}
