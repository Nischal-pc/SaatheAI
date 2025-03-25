export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          company: string | null
          phone_number: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          company?: string | null
          phone_number?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          company?: string | null
          phone_number?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      calls: {
        Row: {
          id: string
          user_id: string
          call_sid: string | null
          caller: string
          phone_number: string
          duration: number
          timestamp: string
          status: "completed" | "ongoing" | "missed"
          recording_url: string | null
          summary: string | null
          sentiment: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          call_sid?: string | null
          caller: string
          phone_number: string
          duration?: number
          timestamp?: string
          status: "completed" | "ongoing" | "missed"
          recording_url?: string | null
          summary?: string | null
          sentiment?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          call_sid?: string | null
          caller?: string
          phone_number?: string
          duration?: number
          timestamp?: string
          status?: "completed" | "ongoing" | "missed"
          recording_url?: string | null
          summary?: string | null
          sentiment?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      call_transcripts: {
        Row: {
          id: string
          call_id: string
          speaker: string
          text: string
          time: string
          created_at: string
        }
        Insert: {
          id?: string
          call_id: string
          speaker: string
          text: string
          time: string
          created_at?: string
        }
        Update: {
          id?: string
          call_id?: string
          speaker?: string
          text?: string
          time?: string
          created_at?: string
        }
      }
      call_topics: {
        Row: {
          id: string
          call_id: string
          topic: string
          created_at: string
        }
        Insert: {
          id?: string
          call_id: string
          topic: string
          created_at?: string
        }
        Update: {
          id?: string
          call_id?: string
          topic?: string
          created_at?: string
        }
      }
      user_settings: {
        Row: {
          id: string
          user_id: string
          category: string
          settings: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          category: string
          settings?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          category?: string
          settings?: Json
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"]
export type Call = Database["public"]["Tables"]["calls"]["Row"]
export type CallTranscript = Database["public"]["Tables"]["call_transcripts"]["Row"]
export type CallTopic = Database["public"]["Tables"]["call_topics"]["Row"]
export type UserSettings = Database["public"]["Tables"]["user_settings"]["Row"]

