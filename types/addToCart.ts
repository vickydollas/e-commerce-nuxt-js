export interface AddToCart {
  id: number
  name: string
  category: string
  price: number
  emoji: string
  badge: string | null
  stock: string
  stockClass: string
  bg: string
  quantity: number
}
export interface jwtUserInfo {
  id: number
  username: string
}