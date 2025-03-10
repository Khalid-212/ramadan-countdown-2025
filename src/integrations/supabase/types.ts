export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activity_logs: {
        Row: {
          amount_completed: number
          completed_at: string
          id: string
          planned_activity_id: string
        }
        Insert: {
          amount_completed: number
          completed_at?: string
          id?: string
          planned_activity_id: string
        }
        Update: {
          amount_completed?: number
          completed_at?: string
          id?: string
          planned_activity_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "activity_logs_planned_activity_id_fkey"
            columns: ["planned_activity_id"]
            isOneToOne: false
            referencedRelation: "planned_activities"
            referencedColumns: ["id"]
          },
        ]
      }
      anonymous_plans: {
        Row: {
          ai_suggestion: string
          browser: string
          created_at: string
          device_type: string
          geographical_info: Json
          id: string
          ip_address: string
          operating_system: string
          responses: Json
          source: string | null
          time_spent: number
        }
        Insert: {
          ai_suggestion: string
          browser: string
          created_at?: string
          device_type: string
          geographical_info: Json
          id?: string
          ip_address: string
          operating_system: string
          responses: Json
          source?: string | null
          time_spent: number
        }
        Update: {
          ai_suggestion?: string
          browser?: string
          created_at?: string
          device_type?: string
          geographical_info?: Json
          id?: string
          ip_address?: string
          operating_system?: string
          responses?: Json
          source?: string | null
          time_spent?: number
        }
        Relationships: []
      }
      countdown_dates: {
        Row: {
          countdown_date: string
          created_at: string
          id: string
          name: string
        }
        Insert: {
          countdown_date: string
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          countdown_date?: string
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      daily_progress: {
        Row: {
          completion_percentage: number
          created_at: string
          date: string
          id: string
          user_id: string
        }
        Insert: {
          completion_percentage: number
          created_at?: string
          date: string
          id?: string
          user_id: string
        }
        Update: {
          completion_percentage?: number
          created_at?: string
          date?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "daily_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      planned_activities: {
        Row: {
          ai_suggestion: string | null
          created_at: string
          date: string
          id: string
          response_details: Json | null
          target_amount: number
          type: string
          user_id: string
        }
        Insert: {
          ai_suggestion?: string | null
          created_at?: string
          date: string
          id?: string
          response_details?: Json | null
          target_amount: number
          type: string
          user_id: string
        }
        Update: {
          ai_suggestion?: string | null
          created_at?: string
          date?: string
          id?: string
          response_details?: Json | null
          target_amount?: number
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "planned_activities_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      youtube_playlists: {
        Row: {
          created_at: string
          description: string | null
          id: string
          order: number
          playlist_url: string
          thumbnail_url: string | null
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          order?: number
          playlist_url: string
          thumbnail_url?: string | null
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          order?: number
          playlist_url?: string
          thumbnail_url?: string | null
          title?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_daily_completion_percentage: {
        Args: {
          p_user_id: string
          p_date: string
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
