import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";

const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,

      // Login with proper error handling
      login: async (username, password) => {
        try {
          const { data } = await axios.post(
            "https://dummyjson.com/auth/login",
            { username, password },
            {
              headers: { "Content-Type": "application/json" },
            }
          );

          const finalToken = data.token || data.accessToken;

          set({
            token: finalToken,
            user: data,
          });

          return data;
        } catch (error) {
          const message = error.response?.data?.message || "Login failed";
          throw message;
        }
      },

      // Complete cleanup
      logout: () => {
        // Clear all app stores
        localStorage.removeItem("auth-storage");
        localStorage.removeItem("users-storage");
        localStorage.removeItem("products-storage");
        localStorage.removeItem("token"); // Legacy fallback

        // Reset state
        set({ token: null, user: null });
      },

      // Check if authenticated
      isAuthenticated: (state) => !!state.token,
    }),

    // Persist config
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }), // Only persist token/user
    }
  )
);

export default useAuthStore;
