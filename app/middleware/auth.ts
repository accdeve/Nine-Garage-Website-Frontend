import { useAuthStore } from "~/stores/account/auth";

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();

  // List of routes that don't require authentication
  const publicRoutes = ["/login", "/register", "/", "/auth/callback"];

  // Check if user is authenticated
  const isAuthenticated = authStore.isAuthenticated;

  // If route is not public and user is not authenticated, redirect to login
  if (!publicRoutes.includes(to.path) && !isAuthenticated) {
    return navigateTo("/login");
  }

  // If user is authenticated and trying to access login/register, redirect to dashboard
  if (isAuthenticated && (to.path === "/login" || to.path === "/register")) {
    return navigateTo("/dashboard");
  }
});
