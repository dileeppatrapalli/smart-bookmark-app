"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase-browser";

type Bookmark = {
  id: string;
  title: string;
  url: string;
};

export default function BookmarkForm({
  onAdd,
}: {
  onAdd: (bookmark: Bookmark) => void;
}) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const addBookmark = async () => {
    if (!title || !url) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.error("User not verified");
      return;
    }

    // ✅ THIS IS WHERE IT GOES
    const { data, error } = await supabase
      .from("bookmarks")
      .insert({ title, url, user_id: user.id })
      .select()
      .single();

    if (error) {
      console.error("Insert error:", error);
      return;
    }

    // 🔥 instantly update UI
    onAdd(data);

    setTitle("");
    setUrl("");
  };

  return (
    <div className="mb-6 space-y-2">
      <input
        className="w-full p-2 border"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="w-full p-2 border"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button
        onClick={addBookmark}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Add Bookmark
      </button>
    </div>
  );
}