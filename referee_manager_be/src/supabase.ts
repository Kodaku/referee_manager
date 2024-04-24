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
      bench: {
        Row: {
          created_at: string
          description: string | null
          id: number
          team: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          team?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          team?: string | null
        }
        Relationships: []
      }
      danger_level: {
        Row: {
          created_at: string
          danger_level: number | null
          danger_name: string | null
          id: number
        }
        Insert: {
          created_at?: string
          danger_level?: number | null
          danger_name?: string | null
          id?: number
        }
        Update: {
          created_at?: string
          danger_level?: number | null
          danger_name?: string | null
          id?: number
        }
        Relationships: []
      }
      follower: {
        Row: {
          created_at: string
          followed_referee_id: number | null
          followed_referee_name: string | null
          following_referee_id: number | null
          following_referee_name: string | null
          id: number
        }
        Insert: {
          created_at?: string
          followed_referee_id?: number | null
          followed_referee_name?: string | null
          following_referee_id?: number | null
          following_referee_name?: string | null
          id?: number
        }
        Update: {
          created_at?: string
          followed_referee_id?: number | null
          followed_referee_name?: string | null
          following_referee_id?: number | null
          following_referee_name?: string | null
          id?: number
        }
        Relationships: []
      }
      link_dangerlevel_bench: {
        Row: {
          bench_id: number | null
          created_at: string
          danger_level_id: number | null
          id: number
        }
        Insert: {
          bench_id?: number | null
          created_at?: string
          danger_level_id?: number | null
          id?: number
        }
        Update: {
          bench_id?: number | null
          created_at?: string
          danger_level_id?: number | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_link_dangerlevel_bench_bench_id_fkey"
            columns: ["bench_id"]
            isOneToOne: false
            referencedRelation: "bench"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_link_dangerlevel_bench_danger_level_id_fkey"
            columns: ["danger_level_id"]
            isOneToOne: false
            referencedRelation: "danger_level"
            referencedColumns: ["id"]
          },
        ]
      }
      link_dangerlevel_soccerplayer: {
        Row: {
          created_at: string
          danger_level_id: number | null
          id: number
          soccer_player_id: number | null
        }
        Insert: {
          created_at?: string
          danger_level_id?: number | null
          id?: number
          soccer_player_id?: number | null
        }
        Update: {
          created_at?: string
          danger_level_id?: number | null
          id?: number
          soccer_player_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_link_dangerlevel_soccerplayer_danger_level_id_fkey"
            columns: ["danger_level_id"]
            isOneToOne: false
            referencedRelation: "danger_level"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_link_dangerlevel_soccerplayer_soccer_player_id_fkey"
            columns: ["soccer_player_id"]
            isOneToOne: false
            referencedRelation: "soccer_player"
            referencedColumns: ["id"]
          },
        ]
      }
      link_referee_follower: {
        Row: {
          created_at: string
          follower_id: number | null
          id: number
          referee_id: number | null
        }
        Insert: {
          created_at?: string
          follower_id?: number | null
          id?: number
          referee_id?: number | null
        }
        Update: {
          created_at?: string
          follower_id?: number | null
          id?: number
          referee_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_link_referee_follower_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "follower"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_link_referee_follower_referee_id_fkey"
            columns: ["referee_id"]
            isOneToOne: false
            referencedRelation: "referee"
            referencedColumns: ["id"]
          },
        ]
      }
      link_referee_soccermatch: {
        Row: {
          created_at: string
          id: number
          referee_id: number | null
          soccer_match_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          referee_id?: number | null
          soccer_match_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          referee_id?: number | null
          soccer_match_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_link_referee_soccermatch_referee_id_fkey"
            columns: ["referee_id"]
            isOneToOne: false
            referencedRelation: "referee"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_link_referee_soccermatch_soccer_match_id_fkey"
            columns: ["soccer_match_id"]
            isOneToOne: false
            referencedRelation: "soccer_match"
            referencedColumns: ["id"]
          },
        ]
      }
      link_soccermatch_bench: {
        Row: {
          bench_id: number | null
          created_at: string
          id: number
          soccer_match_id: number | null
        }
        Insert: {
          bench_id?: number | null
          created_at?: string
          id?: number
          soccer_match_id?: number | null
        }
        Update: {
          bench_id?: number | null
          created_at?: string
          id?: number
          soccer_match_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_link_soccermatch_bench_bench_id_fkey"
            columns: ["bench_id"]
            isOneToOne: false
            referencedRelation: "bench"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_link_soccermatch_bench_soccer_match_id_fkey"
            columns: ["soccer_match_id"]
            isOneToOne: false
            referencedRelation: "soccer_match"
            referencedColumns: ["id"]
          },
        ]
      }
      link_soccermatch_soccerplayer: {
        Row: {
          created_at: string
          id: number
          soccer_match_id: number | null
          soccer_player_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          soccer_match_id?: number | null
          soccer_player_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          soccer_match_id?: number | null
          soccer_player_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_link_soccermatch_soccerplayer_soccer_match_id_fkey"
            columns: ["soccer_match_id"]
            isOneToOne: false
            referencedRelation: "soccer_match"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_link_soccermatch_soccerplayer_soccer_player_id_fkey"
            columns: ["soccer_player_id"]
            isOneToOne: false
            referencedRelation: "soccer_player"
            referencedColumns: ["id"]
          },
        ]
      }
      link_soccermatch_supporters: {
        Row: {
          created_at: string
          id: number
          soccer_match_id: number | null
          supporters_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          soccer_match_id?: number | null
          supporters_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          soccer_match_id?: number | null
          supporters_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_link_soccermatch_supporters_soccer_match_id_fkey"
            columns: ["soccer_match_id"]
            isOneToOne: false
            referencedRelation: "soccer_match"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_link_soccermatch_supporters_supporters_id_fkey"
            columns: ["supporters_id"]
            isOneToOne: false
            referencedRelation: "supporters"
            referencedColumns: ["id"]
          },
        ]
      }
      link_soccerteam_soccercategory: {
        Row: {
          created_at: string
          id: number
          soccer_category_id: number | null
          soccer_team_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          soccer_category_id?: number | null
          soccer_team_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          soccer_category_id?: number | null
          soccer_team_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_link_soccerteam_soccercategory_soccer_category_id_fkey"
            columns: ["soccer_category_id"]
            isOneToOne: false
            referencedRelation: "soccer_category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_link_soccerteam_soccercategory_soccer_team_id_fkey"
            columns: ["soccer_team_id"]
            isOneToOne: false
            referencedRelation: "soccer_team"
            referencedColumns: ["id"]
          },
        ]
      }
      link_soccerteam_soccermatch: {
        Row: {
          created_at: string
          id: number
          soccer_match_id: number | null
          soccer_team_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          soccer_match_id?: number | null
          soccer_team_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          soccer_match_id?: number | null
          soccer_team_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_link_soccerteam_soccermatch_soccer_match_id_fkey"
            columns: ["soccer_match_id"]
            isOneToOne: false
            referencedRelation: "soccer_match"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_link_soccerteam_soccermatch_soccer_team_id_fkey"
            columns: ["soccer_team_id"]
            isOneToOne: false
            referencedRelation: "soccer_team"
            referencedColumns: ["id"]
          },
        ]
      }
      link_soccerteam_sportseason: {
        Row: {
          created_at: string
          id: number
          soccer_team_id: number | null
          sport_season_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          soccer_team_id?: number | null
          sport_season_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          soccer_team_id?: number | null
          sport_season_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_link_soccerteam_sportseason_soccer_team_id_fkey"
            columns: ["soccer_team_id"]
            isOneToOne: false
            referencedRelation: "soccer_team"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_link_soccerteam_sportseason_sport_season_id_fkey"
            columns: ["sport_season_id"]
            isOneToOne: false
            referencedRelation: "sport_season"
            referencedColumns: ["id"]
          },
        ]
      }
      referee: {
        Row: {
          created_at: string
          gender: string | null
          id: number
          mechanographic_code: string | null
          name: string | null
          password: string | null
          qualification: string | null
        }
        Insert: {
          created_at?: string
          gender?: string | null
          id?: number
          mechanographic_code?: string | null
          name?: string | null
          password?: string | null
          qualification?: string | null
        }
        Update: {
          created_at?: string
          gender?: string | null
          id?: number
          mechanographic_code?: string | null
          name?: string | null
          password?: string | null
          qualification?: string | null
        }
        Relationships: []
      }
      soccer_category: {
        Row: {
          category_name: string | null
          created_at: string
          id: number
        }
        Insert: {
          category_name?: string | null
          created_at?: string
          id?: number
        }
        Update: {
          category_name?: string | null
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      soccer_match: {
        Row: {
          away_score: number | null
          created_at: string
          home_score: number | null
          id: number
          match_date: string | null
          match_refund: number | null
          oa_evaluation: string | null
          oa_match_description: string | null
          referee_away_team_description: string | null
          referee_home_team_description: string | null
          referee_match_description: string | null
          total_red_cards: number | null
          total_yellow_cards: number | null
          uuid: string | null
        }
        Insert: {
          away_score?: number | null
          created_at?: string
          home_score?: number | null
          id?: number
          match_date?: string | null
          match_refund?: number | null
          oa_evaluation?: string | null
          oa_match_description?: string | null
          referee_away_team_description?: string | null
          referee_home_team_description?: string | null
          referee_match_description?: string | null
          total_red_cards?: number | null
          total_yellow_cards?: number | null
          uuid?: string | null
        }
        Update: {
          away_score?: number | null
          created_at?: string
          home_score?: number | null
          id?: number
          match_date?: string | null
          match_refund?: number | null
          oa_evaluation?: string | null
          oa_match_description?: string | null
          referee_away_team_description?: string | null
          referee_home_team_description?: string | null
          referee_match_description?: string | null
          total_red_cards?: number | null
          total_yellow_cards?: number | null
          uuid?: string | null
        }
        Relationships: []
      }
      soccer_player: {
        Row: {
          created_at: string
          description: string | null
          id: number
          player_name: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          player_name?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          player_name?: string | null
        }
        Relationships: []
      }
      soccer_team: {
        Row: {
          created_at: string
          id: number
          logo: string | null
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          logo?: string | null
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          logo?: string | null
          name?: string | null
        }
        Relationships: []
      }
      sport_season: {
        Row: {
          created_at: string
          end_date: string | null
          id: number
          season_name: string | null
          start_date: string | null
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          id?: number
          season_name?: string | null
          start_date?: string | null
        }
        Update: {
          created_at?: string
          end_date?: string | null
          id?: number
          season_name?: string | null
          start_date?: string | null
        }
        Relationships: []
      }
      supporters: {
        Row: {
          created_at: string
          description: string | null
          id: number
          team: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          team?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          team?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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
