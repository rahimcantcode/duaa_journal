import type { Database } from "@/lib/types/supabase";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Dua = Database["public"]["Tables"]["duas"]["Row"];
export type DuaInsert = Database["public"]["Tables"]["duas"]["Insert"];
export type DuaUpdate = Database["public"]["Tables"]["duas"]["Update"];
export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type CategoryInsert = Database["public"]["Tables"]["categories"]["Insert"];
export type UserSettings = Database["public"]["Tables"]["settings"]["Row"];
export type SettingsInsert = Database["public"]["Tables"]["settings"]["Insert"];
export type FriendDuaRequest = Database["public"]["Tables"]["friends_dua_requests"]["Row"];
export type FriendDuaRequestInsert = Database["public"]["Tables"]["friends_dua_requests"]["Insert"];

export type FeedbackState = {
  type: "error" | "success" | "info";
  message: string;
} | null;
