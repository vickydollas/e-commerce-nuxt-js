// import { ref } from "vue";
import { useUserStore } from "../stores/userStore";
import type { AddToCart, ProductType } from "../../types/addToCart";
import { onClickOutside } from "@vueuse/core";

const mobileMenuOpen = ref(false);
const cartCount = ref(0);
const cartArray = ref<ProductType[]>([]);
export function useBasic() {
  const isModalOpen = ref(false);
  // Sample product data
  const store = useUserStore();
  // fix this onMounted issue where it runs before the store is populated with the cart data from the database
  function initializeCart() {
    const storedCart = localStorage.getItem("cart");
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
  watch(
    cartArray,
    (newVal) => {
      localStorage.setItem("cart", JSON.stringify(newVal));
    },
    { deep: true },
  );
  function removeFromCart(id: number) {
    cartArray.value = cartArray.value.filter((item) => item.id !== id);
  }
  function increaseQuantity(id: number) {
    console.log(id);
    const item = cartArray.value.find((f) => f.id === id);
    if (item) {
      item.quantity++;
    }
  }
  function decreaseQuantity(id: number) {
    const item = cartArray.value.find((f) => f.id === id);
    if (item) {
      item.quantity--;
    }
  }
  const subtotal = computed(() => {
    return cartArray.value.reduce((s, i) => s + i.price * i.quantity, 0);
  });
  const shipping = computed(() => (subtotal.value >= 300 ? 0 : 15));
  const tax = computed(() => subtotal.value * 0.033);
  const total = computed(() => subtotal.value + shipping.value + tax.value);
  // modal logic for opening and closing the profile
  const openCart = () => {
    isModalOpen.value = !isModalOpen.value;
  };
  // HANDLING CLICK EVENT FOR CLOSING MODAL
  const target = ref<HTMLElement | null>(null);
  const clickListener = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      isModalOpen.value = false
    }
  }
  watch(isModalOpen, (isOpen) => {
    if (isOpen) { window.addEventListener('keydown', clickListener)}
    else { window.removeEventListener('keydown', clickListener)}
  })
  onUnmounted(() => window.removeEventListener('keydown', clickListener))
  onClickOutside(target, () => (isModalOpen.value = false));
  // const closeListener = (e: Event) => {
  //   if (target.value && !target.value.contains(e.target as HTMLElement)) {
  //     isModalOpen.value = false;
  //   }
  // };
  // watch(isModalOpen, (isOpen) => {
  //   if (isOpen) {
  //     setTimeout(() => {
  //       window.addEventListener("click", closeListener);
  //     }, 0);
  //   } else {
  //     window.removeEventListener("click", closeListener);
  //   }
  // });
  // onUnmounted(() => window.removeEventListener("click", closeListener));
  return {
    mobileMenuOpen,
    cartCount,
    cartArray,
    initializeCart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    subtotal,
    shipping,
    tax,
    total,
    // modal logic
    isModalOpen,
    openCart,
    // CLICK HANDLER
    target,
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
