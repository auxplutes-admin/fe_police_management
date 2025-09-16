/**
 * Authentication Context
 * Manages global authentication state and related functions
 */
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
  } from "react";
  import {
    clearSession,
  } from "@/constant/session";
import { getOfficerProfile } from "@/api";
import { API_BASE_URL, SESSION_COOKIE_NAME } from "@/constant";
  
  interface officerProfile {
    officer_id: string;
    officer_name: string;
    officer_designation: string;
    officer_badge_number: string;
    officer_mobile_number: string;
    officer_email: string;
    officer_joining_date: string;
    officer_status: string;
    created_at: string;
    updated_at: string;
    created_by: string | null;
    updated_by: string | null;
    deleted_at: string | null;
    deleted_by: string | null;
    is_active: boolean;
    is_deleted: boolean;
    station_id: string;
    officer_username: string;
  }
  
  interface AuthContextType {
    loginResponse: officerProfile | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: () => void;
    logout: () => void;
    checkAuth: () => Promise<void>;
  }
  
  // Export the context for use in the hook
  export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
  );
  
  /**
   * Authentication Provider Component
   * Wraps the application with authentication context
   */
  export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    const [loginResponse, setLoginResponse] = useState<officerProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
  
    const checkAuth = useCallback(async () => {
      try {
        const token = localStorage.getItem(SESSION_COOKIE_NAME);
        
        if (!token) {
          setLoginResponse(null);
          setIsLoading(false);
          return;
        }

        console.log("api called")
        const response = await getOfficerProfile();
        console.log("data", response);

        setLoginResponse(response);
        

      } catch (error) {
        console.error("Auth check failed:", error);
        clearSession();
        setLoginResponse(null);
      } finally {
        setIsLoading(false);
      }
    }, []);

    console.log("user",loginResponse)

  
    const login = useCallback(() => {
      window.location.href = `${API_BASE_URL}/api/v1/auth/login`;
    }, []);
  
    const logout = useCallback(() => {
      setLoginResponse(null);
      clearSession();
      window.location.href = "/";
    }, []);
  
    useEffect(() => {
      checkAuth();
      }, [checkAuth]);

    const value = {
      loginResponse,
      isAuthenticated: !!loginResponse,
      isLoading,
      login,
      logout,
      checkAuth,
    };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  
  };
  
  /**
   * Custom hook to use authentication context
   */
  export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  }