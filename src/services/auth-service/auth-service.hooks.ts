import { useReactiveVar } from "@apollo/client";
import { authService } from "./auth-service";

export const useAuthUser = () => useReactiveVar(authService.user);
export const useAuthToken = () => useReactiveVar(authService.accessToken);
