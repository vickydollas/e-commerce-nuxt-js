// import { ref } from "vue";
import { useUserStore } from "../stores/userStore";
import type { AddToCart, ProductType } from "../../types/addToCart";
const mobileMenuOpen = ref(false);
const cartCount = ref(0);
const isCartOpen = ref(false);
const cartArray = ref<ProductType[]>([]);
export function useBasic() {
  // Sample product data
  const store = useUserStore();
  function initializeCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      cartArray.value = JSON.parse(storedCart);
    }
  }
  function addToCart(product: ProductType) {
    const isDuplicate = cartArray.value.some((s) => s.id === product.id);
    if (isDuplicate) {
      return;
    }
    cartArray.value.push(product);
    cartCount.value++;
    // console.log("Added to cart:", product.name);
    // console.log(cartArray.value);
  }
  watch(cartArray, (newVal) => {
    localStorage.setItem('cart', JSON.stringify(newVal))  
  }, { deep: true })
  function removeFromCart(id: number) {
    cartArray.value = cartArray.value.filter((item) => item.id !== id);
  }
  function increaseQuantity(id: number) {
    console.log(id)
    const item = cartArray.value.find((f) => (f.id === id));
    if (item) {
      item.quantity++;
    }
  }
  function decreaseQuantity(id: number) {
    const item = cartArray.value.find((f) => (f.id === id));
    if (item) {
      item.quantity--;
    }
  }
  const subtotal = computed(() =>{
    return cartArray.value.reduce((s, i) => s + i.price * i.quantity, 0)
  })
  return {
    mobileMenuOpen,
    cartCount,
    isCartOpen,
    cartArray,
    initializeCart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    subtotal
  };
}
export function useDesign() {
  const getStockClass = (p: string) => {
    if (p === "Low stock") return "text-yellow-400";
    return "text-green-400";
  };
  const getBackgroundClass = (category: string) => {
    switch (category) {
      case "Audio":
        return "bg-gradient-to-br from-amber-400/15 to-orange-500/15";
      case "Gadgets":
        return "bg-gradient-to-br from-blue-400/15 to-cyan-500/15";
      case "Appliances":
        return "bg-gradient-to-br from-purple-400/15 to-pink-500/15";
      case "Accessories":
        return "bg-gradient-to-br from-rose-400/15 to-red-500/15";
      default:
        return "bg-gray-800";
    }
  };
  return {
    getStockClass,
    getBackgroundClass,
  };
}
