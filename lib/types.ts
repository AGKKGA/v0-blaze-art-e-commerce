export interface Artwork {
  id: string
  title: string
  description: string | null
  category: string | null
  price: number
  type: "digital" | "physical"
  stock_quantity: number | null
  image_url: string
  watermarked_url: string
  is_featured: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CartItem {
  artwork: Artwork
  quantity: number
}

export interface Order {
  id: string
  customer_email: string
  customer_name: string
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled"
  total: number
  currency: string
  stripe_session_id: string | null
  stripe_payment_intent: string | null
  shipping_address: ShippingAddress | null
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  artwork_id: string
  quantity: number
  unit_price: number
  created_at: string
}

export interface ShippingAddress {
  line1: string
  line2?: string
  city: string
  state?: string
  postal_code: string
  country: string
}

export type ArtworkCategory = "Paintings" | "Digital Art" | "Logos"
export type ArtworkType = "digital" | "physical"
