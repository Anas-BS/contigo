"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, GraduationCap } from "lucide-react";

type Role = "student" | "teacher" | "admin";

const roleRoutes: Record<Role, string> = {
  student: "/student/dashboard",
  teacher: "/teacher/dashboard",
  admin: "/admin/dashboard",
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("student");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate auth delay
    await new Promise((r) => setTimeout(r, 800));
    router.push(roleRoutes[role]);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{
        background: "linear-gradient(135deg, #F97B4F 0%, #F5C842 60%, #F96B3F 100%)",
      }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <span className="font-nunito font-extrabold text-3xl text-white">
              Contigo
            </span>
          </div>
          <p className="text-white/80 text-sm">With you, every step.</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <h2 className="font-nunito font-bold text-2xl text-contigo-navy mb-1">
            Welcome back 👋
          </h2>
          <p className="text-contigo-slate text-sm mb-6">
            Sign in to your Contigo account
          </p>

          <form onSubmit={handleSignIn} className="space-y-4">
            {/* Role Selector */}
            <div>
              <label className="block text-sm font-medium text-contigo-navy mb-2">
                I am a...
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["student", "teacher", "admin"] as Role[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                      role === r
                        ? "bg-contigo-orange text-white shadow"
                        : "bg-contigo-peach text-contigo-slate hover:bg-contigo-orange/20"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-contigo-navy mb-1.5"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@school.edu"
                required
                className="w-full px-4 py-3 border border-contigo-peach rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-contigo-orange/50 bg-contigo-white text-contigo-navy placeholder:text-contigo-slate"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-contigo-navy mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 border border-contigo-peach rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-contigo-orange/50 bg-contigo-white text-contigo-navy placeholder:text-contigo-slate pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-contigo-slate hover:text-contigo-navy"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <a
                href="#"
                className="text-xs text-contigo-orange hover:underline"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-contigo-orange text-white rounded-xl font-semibold text-sm hover:bg-contigo-coral transition-colors shadow-lg shadow-contigo-orange/30 disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-xs text-contigo-slate mt-6">
            New to Contigo?{" "}
            <a href="#" className="text-contigo-orange font-medium hover:underline">
              Contact your administrator
            </a>
          </p>
        </div>

        <p className="text-center text-white/60 text-xs mt-6">
          © 2026 Contigo. All rights reserved.
        </p>
      </div>
    </div>
  );
}
