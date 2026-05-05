"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("ucl_demo_auth") === "true") {
      router.replace("/build?domain=ucl.ac.uk");
    } else {
      setChecking(false);
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "UCL2026") {
      localStorage.setItem("ucl_demo_auth", "true");
      router.push("/build?domain=ucl.ac.uk");
    } else {
      setError(true);
      setPassword("");
    }
  };

  if (checking) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-lexend flex items-center justify-center px-6">
      <div className="w-full max-w-sm flex flex-col items-center gap-8">
        <Image
          src="/uk-universities/UCL/Logo/616172986_1297759015715287_4670572216606312291_n.jpg"
          alt="UCL logo"
          width={180}
          height={60}
          className="object-contain"
          unoptimized
        />

        <p className="text-slate-600 text-center text-[15px]">
          Demo built for University College London
        </p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
          <input
            type="text"
            value={password}
            onChange={e => { setPassword(e.target.value); setError(false); }}
            placeholder="Password"
            className={`w-full px-5 py-4 rounded-2xl border text-[15px] outline-none transition-all bg-white ${
              error ? "border-red-400 placeholder-red-300" : "border-slate-200 focus:border-blue-400"
            }`}
            autoFocus
          />
          {error && (
            <p className="text-red-500 text-[13px] text-center">Incorrect password. Try again.</p>
          )}
          <button
            type="submit"
            className="w-full py-4 bg-blue-600 text-white font-bold text-[16px] rounded-2xl hover:bg-blue-700 transition-all active:scale-95"
          >
            Go to demo
          </button>
        </form>
      </div>
    </div>
  );
}
