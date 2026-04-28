export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("jwt_token");
    if (!token) {
        return navigateTo("/login");
    }
}); 