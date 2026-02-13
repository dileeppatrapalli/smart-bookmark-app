"use client";

import { useState } from "react";
import BookmarkForm from "@/components/BookmarkForm";
import BookmarkList from "@/components/BookmarkList";
import { supabase } from "@/lib/supabase-browser";

export default function DashboardPage() {
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  const logout = async () => {
    await supabase.auth.signOut();
    location.href = "/login";
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-xl font-bold">Smart Bookmarks</h1>
        <button onClick={logout} className="text-sm underline">
          Logout
        </button>
      </div>

      {/* 👇 THIS LINE IS REQUIRED */}
      <BookmarkForm onAdd={(b) => setBookmarks((prev) => [b, ...prev])} />

      <BookmarkList bookmarks={bookmarks} setBookmarks={setBookmarks} />
    </div>
  );
}