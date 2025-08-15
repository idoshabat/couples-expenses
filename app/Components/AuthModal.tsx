"use client";

import { useState } from "react";
import { SignIn, SignUp } from "@clerk/nextjs";

export default function AuthModal() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div>
      <button
        onClick={() => setShowSignIn(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Login
      </button>
      <button
        onClick={() => setShowSignUp(true)}
        className="px-4 py-2 bg-green-500 text-white rounded ml-2"
      >
        Sign Up
      </button>

      {/* Inline SignIn */}
      {showSignIn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded">
            <button
              className="mb-4 text-red-500"
              onClick={() => setShowSignIn(false)}
            >
              Close
            </button>
            <SignIn
              path="/sign-in"
              routing="path"
              signUpUrl="/sign-up"
              redirectUrl="/"
            />
          </div>
        </div>
      )}

      {/* Inline SignUp */}
      {showSignUp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded">
            <button
              className="mb-4 text-red-500"
              onClick={() => setShowSignUp(false)}
            >
              Close
            </button>
            <SignUp
              path="/sign-up"
              routing="path"
              signInUrl="/sign-in"
              redirectUrl="/"
            />
          </div>
        </div>
      )}
    </div>
  );
}
