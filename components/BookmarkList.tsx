"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase-browser";

export type Bookmark = {
  id: string;
  title: string;
  url: string;
};

type BookmarkListProps = {
  bookmarks: Bookmark[];
  setBookmarks: React.Dispatch<React.SetStateAction<Bookmark[]>>;
};

export default function BookmarkList({
  bookmarks,
  setBookmarks,
}: BookmarkListProps) {
  useEffect(() => {
    fetchBookmarks();

    const channel = supabase
      .channel("realtime-bookmarks")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookmarks" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setBookmarks((prev) => {
              if (prev.find((b) => b.id === payload.new.id)) return prev;
              return [payload.new as Bookmark, ...prev];
            });
          }

          if (payload.eventType === "DELETE") {
            setBookmarks((prev) =>
              prev.filter((b) => b.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe((status) => {
        console.log("Realtime subscription status:", status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false });

    setBookmarks((data as Bookmark[]) || []);
  };

  const deleteBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id);
  };

  return (
    <ul className="space-y-2">
      {bookmarks.map((b) => (
        <li
          key={b.id}
          className="p-3 border flex justify-between items-center"
        >
          <a
            href={b.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {b.title}
          </a>
          <button onClick={() => deleteBookmark(b.id)}>❌</button>
        </li>
      ))}
    </ul>
  );
}