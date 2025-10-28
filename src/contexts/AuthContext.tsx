import  { createContext, useContext, useState, type ReactNode } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  userRole: "admin" | "user" | null;
  username: string | null;
  login: (username: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userRole: null,
  username: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<"admin" | "user" | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const login = (username: string, password: string) => {
    if (username === "admin" && password === "admin123") {
      setUserRole("admin");
    } else {
      // selain admin, dianggap user biasa
      setUserRole("user");
    }
    setIsAuthenticated(true);
    setUsername(username);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
