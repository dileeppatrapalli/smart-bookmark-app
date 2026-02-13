"use client";

import { supabase } from "@/lib/supabase-browser";

export default function LoginPage() {
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("OAuth error:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={signInWithGoogle}
        className="px-6 py-3 bg-black text-white rounded"
      >
        Sign in with Google
      </button>
    </div>
  );
}