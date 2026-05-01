
import type { ProductType } from "~~/types/addToCart";

export const useUserStore = defineStore("user", () => {
  const user = ref<string | null>(null);
  const isLoggedIn = ref(false);
  const products = ref<ProductType[]>([]);
  const isLoading = ref(false);
  const isError = ref(false);
  const getProducts = async () => {
    isLoading.value = true;
    isError.value = false;
    try {
      const res = await $fetch("/api/products");
      products.value = res as ProductType[];
    } catch (error) {
      isError.value = true;
      console.error("Error fetching products:", error);
    } finally {
      isLoading.value = false;
    }
  };
  onMounted(() => {
    getProducts();
  });
  return {
    user,
    isLoggedIn,
    products,
    isLoading,
    isError
  };
});
