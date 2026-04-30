export default defineNuxtRouteMiddleware((to, from) => {
  const toast = useToast()
  const token = useCookie("jwt_token");
    if (!token.value) {
        toast.error({
          title: 'Necessary login',
          message: 'Login to proceed to see your profile'
        })
        return navigateTo("/login");
    }
}); 