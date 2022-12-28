export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      spaces: {
        Row: {
          id: string
          created_at: string | null
          modified_at: string | null
          name: string | null
          title: string | null
          message: string | null
          questions: Json | null
          logo_image: string | null
          isVideoOnly: boolean | null
          isUserConsent: boolean | null
          isRating: boolean | null
          links: Json[] | null
        }
        Insert: {
          id?: string
          created_at?: string | null
          modified_at?: string | null
          name?: string | null
          title?: string | null
          message?: string | null
          questions?: Json | null
          logo_image?: string | null
          isVideoOnly?: boolean | null
          isUserConsent?: boolean | null
          isRating?: boolean | null
          links?: Json[] | null
        }
        Update: {
          id?: string
          created_at?: string | null
          modified_at?: string | null
          name?: string | null
          title?: string | null
          message?: string | null
          questions?: Json | null
          logo_image?: string | null
          isVideoOnly?: boolean | null
          isUserConsent?: boolean | null
          isRating?: boolean | null
          links?: Json[] | null
        }
      }
      testimonials: {
        Row: {
          id: number
          created_at: string | null
          isVideo: boolean | null
          rating: number | null
          name: string | null
          email: string | null
          tags: Json | null
          isHighlight: boolean | null
          isLike: boolean | null
          video_url: string | null
          video_thumbnail: string | null
          modified_at: string | null
          photo: string | null
          attach_images: Json | null
          message: string | null
          isUserPermission: boolean | null
          spaces: string | null
        }
        Insert: {
          id?: number
          created_at?: string | null
          isVideo?: boolean | null
          rating?: number | null
          name?: string | null
          email?: string | null
          tags?: Json | null
          isHighlight?: boolean | null
          isLike?: boolean | null
          video_url?: string | null
          video_thumbnail?: string | null
          modified_at?: string | null
          photo?: string | null
          attach_images?: Json | null
          message?: string | null
          isUserPermission?: boolean | null
          spaces?: string | null
        }
        Update: {
          id?: number
          created_at?: string | null
          isVideo?: boolean | null
          rating?: number | null
          name?: string | null
          email?: string | null
          tags?: Json | null
          isHighlight?: boolean | null
          isLike?: boolean | null
          video_url?: string | null
          video_thumbnail?: string | null
          modified_at?: string | null
          photo?: string | null
          attach_images?: Json | null
          message?: string | null
          isUserPermission?: boolean | null
          spaces?: string | null
        }
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
  }
}
