"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>

        <Input
          type="email"
          label="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          label="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex justify-center">
          <Button type="submit" className="w-48">
            Login
          </Button>
        </div>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
