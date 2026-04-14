import { ref } from "vue";
import type { AddToCart } from "../types/addToCart";
const mobileMenuOpen = ref(false);
const cartCount = ref(0);
const isCartOpen = ref(false);
const cartArray= ref<AddToCart[]>([]);
export default function useBasic() {
  const products = ref<AddToCart[]>([
  {
    id: 1,
    name: "Wireless Pro Headphones",
    category: "Audio",
    price: 89.99,
    emoji: "🎧",
    badge: "Best Seller",
    stock: "In Stock",
    stockClass: "text-green-400",
    bg: "bg-gradient-to-br from-amber-400/15 to-orange-500/15",
    quantity: 1
  },
  {
    id: 2,
    name: "Smart Watch Series X",
    category: "Gadgets",
    price: 149.99,
    emoji: "⌚",
    badge: null,
    stock: "Low Stock",
    stockClass: "text-yellow-400",
    bg: "bg-gradient-to-br from-blue-400/15 to-cyan-500/15",
    quantity: 1
  },
  {
    id: 3,
    name: "Digital Air Fryer 5L",
    category: "Appliances",
    price: 64.99,
    emoji: "🔌",
    badge: "Hot",
    stock: "In Stock",
    stockClass: "text-green-400",
    bg: "bg-gradient-to-br from-purple-400/15 to-pink-500/15",
    quantity: 1
  },
  {
    id: 4,
    name: "Leather Tote Bag",
    category: "Accessories",
    price: 49.99,
    emoji: "👜",
    badge: null,
    stock: "In Stock",
    stockClass: "text-green-400",
    bg: "bg-gradient-to-br from-rose-400/15 to-red-500/15",
    quantity: 1
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    category: "Audio",
    price: 59.99,
    emoji: "🔊",
    badge: "New",
    stock: "In Stock",
    stockClass: "text-green-400",
    bg: "bg-gradient-to-br from-teal-400/15 to-cyan-600/15",
    quantity: 1
  },
  {
    id: 6,
    name: "Robot Vacuum Cleaner",
    category: "Appliances",
    price: 199.99,
    emoji: "🤖",
    badge: null,
    stock: "In Stock",
    stockClass: "text-green-400",
    bg: "bg-gradient-to-br from-gray-400/15 to-slate-600/15",
    quantity: 1
  },
  {
    id: 7,
    name: "Sunglasses UV400",
    category: "Accessories",
    price: 34.99,
    emoji: "🕶️",
    badge: null,
    stock: "Low Stock",
    stockClass: "text-yellow-400",
    bg: "bg-gradient-to-br from-amber-300/15 to-yellow-500/15",
    quantity: 1
  },
  {
    id: 8,
    name: "Mechanical Keyboard",
    category: "Gadgets",
    price: 119.99,
    emoji: "⌨️",
    badge: "New",
    stock: "In Stock",
    stockClass: "text-green-400",
    bg: "bg-gradient-to-br from-indigo-400/15 to-violet-600/15",
    quantity: 1
  },
  {
    id: 9,
    name: "Neck Massager",
    category: "Appliances",
    price: 79.99,
    emoji: "💆",
    badge: null,
    stock: "In Stock",
    stockClass: "text-green-400",
    bg: "bg-gradient-to-br from-pink-400/15 to-fuchsia-600/15",
    quantity: 1
  },
  {
    id: 10,
    name: "Gold Hoop Earrings",
    category: "Accessories",
    price: 24.99,
    emoji: "💍",
    badge: null,
    stock: "In Stock",
    stockClass: "text-green-400",
    bg: "bg-gradient-to-br from-yellow-300/15 to-amber-500/15",
    quantity: 1
  },
  {
    id: 11,
    name: "Noise-Cancel Earbuds",
    category: "Audio",
    price: 69.99,
    emoji: "🎵",
    badge: null,
    stock: "In Stock",
    stockClass: "text-green-400",
    bg: "bg-gradient-to-br from-emerald-400/15 to-green-600/15",
    quantity: 1
  },
  {
    id: 12,
    name: "Portable Charger 20k",
    category: "Gadgets",
    price: 44.99,
    emoji: "🔋",
    badge: "Hot",
    stock: "In Stock",
    stockClass: "text-green-400",
    bg: "bg-gradient-to-br from-orange-400/15 to-red-500/15",
    quantity: 1
  },
]);
  function addToCart(product: AddToCart) {
    const isDuplicate = cartArray.value.some(s => s.id === product.id)
    if (isDuplicate) {
      return
    }
    cartArray.value.push(product);
    cartCount.value++;
    // console.log("Added to cart:", product.name);
    console.log(cartArray.value);
  }
  function increaseQuantity(id: number) {
    const item = cartArray.value.find(f => f.id = id)
    if (item) {
      item.quantity++
    }
  }
  function decreaseQuantity(id: number) {
    const item = cartArray.value.find(f => f.id = id)
    if (item) {
      item.quantity--
    }
  }
  return {
    products,
    mobileMenuOpen,
    cartCount,
    isCartOpen,
    cartArray,
    addToCart,
    increaseQuantity,
    decreaseQuantity
  };
}