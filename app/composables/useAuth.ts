import { useUserStore } from "~/stores/userStore";
import type { jwtUserInfo } from "~~/types/addToCart";

export default function useAuth() {
  const USER_STORE = useUserStore();
  const toast = useToast();
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const storedToken = useCookie("jwt_token");
  const userDetail = ref<jwtUserInfo | null>(null);

  const signIn = async (username: string, password: string) => {
    try {
      const res = await $fetch("/api/auth/login", {
        method: "POST",
        body: { username: username, password: password },
        async onResponseError({ response }) {
          if (response.status === 401) {
            error.value = response._data.message;
            return;
          }
        },
      });
      if (!res)
        toast.error({ title: "Login failure", message: "Failed to login" });
      if (res)
        toast.success({
          title: "Login success",
          message: "Logged in successfully",
        });
      // await new Promise(r => setTimeout(r, 1200))
      if (res.token) {
        useCookie("jwt_token").value = res.token;
      } else {
        console.log("there was an issue with the body");
      }
      // Redirect after short delay
      await navigateTo("/");
    } catch (err) {
      error.value = "Incorrect username or password. Please try again.";
    } finally {
      isLoading.value = false;
    }
  };
  const signUp = async (username: string, password: string) => {
    const res = await $fetch("/api/auth/register", {
      method: "POST",
      body: { username: username, password: password },
    });
    if (res) {
      toast.success({ title: "Sucess", message: "Signup successful" });
      await navigateTo("/login");
    }
    if (!res)
      return toast.error({
        title: "error",
        message: "User registration failed",
      });
    username = "";
    password = "";
  };
  const getuserDetail = async () => {
    const token = useCookie("jwt_token");
    if (token) {
      const res = await $fetch("/api/auth/verifyToken", {
        method: "POST",
        body: { token: token.value },
      });
      if (!res) return;

      userDetail.value = res.user;
    }
  };
  onMounted(() => {
    if (storedToken.value) {
      getuserDetail();
    }
  });

  return {
    signIn,
    signUp,
    error,
    isLoading,
    storedToken,
    getuserDetail,
    userDetail
  };
}
