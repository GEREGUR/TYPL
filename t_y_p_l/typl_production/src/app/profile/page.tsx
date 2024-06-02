"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "@/types/types";

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      console.log("Token from localStorage:", token); // Debug log

      if (!token) {
        console.log("Token not found, redirecting to login.");
        router.push("/login");
        return;
      }

      try {
        console.log("Token found:", token);
        const decoded: JwtPayload = jwtDecode(token);
        console.log("Decoded token:", decoded);
        const userId = decoded.userId;
        console.log("User ID from token:", userId);

        const response = await axios.get(`/api/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Response from API:", response.data);
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) return <div>Loading...</div>;

  if (!user) return <div>User not found</div>;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-96 rounded bg-white p-6 shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Profile</h1>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Surname:</strong> {user.surname}
        </p>
        <p>
          <strong>Second Name:</strong> {user.secondName}
        </p>
        <p>
          <strong>Study Group:</strong> {user.studyGroup}
        </p>
        <p>
          <strong>Login:</strong> {user.login}
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
