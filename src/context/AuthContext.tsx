
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { AuthState, User, UserRole } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT" }
  | { type: "UPDATE_USER"; payload: Partial<User> };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Mock user data
const mockUsers: Record<string, User> = {
  "master@example.com": {
    id: "1",
    name: "Master Admin",
    email: "master@example.com",
    role: "master",
    createdAt: new Date(),
  },
  "admin@example.com": {
    id: "2",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    createdAt: new Date(),
  },
  "manager@example.com": {
    id: "3",
    name: "Manager User",
    email: "manager@example.com",
    role: "manager",
    createdAt: new Date(),
  },
  "tl@example.com": {
    id: "4",
    name: "Team Leader",
    email: "tl@example.com",
    role: "tl",
    createdAt: new Date(),
  },
  "user@example.com": {
    id: "5",
    name: "Basic User",
    email: "user@example.com",
    role: "user",
    tlId: "4",
    managerId: "3",
    createdAt: new Date(),
  },
};

const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...initialState,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    default:
      return state;
  }
};

interface AuthContextProps {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  canManageRole: (role: UserRole) => boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  state: initialState,
  login: async () => {},
  logout: () => {},
  updateUser: () => {},
  canManageRole: () => false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const { toast } = useToast();

  // Check for stored auth on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        dispatch({ type: "LOGIN_SUCCESS", payload: user });
      } catch (error) {
        localStorage.removeItem("user");
      }
    }
  }, []);

  // Mock login function (would connect to your backend)
  const login = async (email: string, password: string) => {
    dispatch({ type: "LOGIN_START" });

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check mock users
      const user = mockUsers[email.toLowerCase()];
      if (user && password === "password") {
        // Store in localStorage (for demo purposes)
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({ type: "LOGIN_SUCCESS", payload: user });
        toast({
          title: "Login Successful",
          description: `Welcome back, ${user.name}!`,
        });
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: "Invalid email or password",
        });
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: "An error occurred. Please try again.",
      });
      toast({
        title: "Login Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
  };

  const updateUser = (userData: Partial<User>) => {
    dispatch({ type: "UPDATE_USER", payload: userData });
    if (state.user) {
      localStorage.setItem(
        "user",
        JSON.stringify({ ...state.user, ...userData })
      );
    }
  };

  // Helper to check if current user can manage a specific role
  const canManageRole = (role: UserRole): boolean => {
    if (!state.user) return false;

    const roleHierarchy: Record<UserRole, number> = {
      master: 4,
      admin: 3,
      manager: 2,
      tl: 1,
      user: 0,
    };

    const userRoleLevel = roleHierarchy[state.user.role];
    const targetRoleLevel = roleHierarchy[role];

    return userRoleLevel > targetRoleLevel;
  };

  return (
    <AuthContext.Provider
      value={{ state, login, logout, updateUser, canManageRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
