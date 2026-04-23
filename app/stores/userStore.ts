export const useUserStore = defineStore("user", () => {
  const user = ref<string | null>(null);
  const isLoggedIn = ref(false);

  return {
    user,
    isLoggedIn,
  };
});