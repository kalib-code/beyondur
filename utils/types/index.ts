import {Database} from "./database";

export type TSpaceRow = Database['public']['Tables']['spaces']['Row']
export type TSpaceInsert = Database['public']['Tables']['spaces']['Insert']
export type TSpaceUpdate = Database['public']['Tables']['spaces']['Update']

export type TTestimoniesRow = Database['public']['Tables']['testimonials']['Row']
export type TTestimoniesInsert = Database['public']['Tables']['testimonials']['Insert']
export type TTestimoniesUpdate = Database['public']['Tables']['testimonials']['Update']

export type TUserRow = Database['public']['Tables']['profiles']['Row']
export type TUserInsert = Database['public']['Tables']['profiles']['Insert']
export type TUserUpdate = Database['public']['Tables']['profiles']['Update']
