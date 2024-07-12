import { createContext } from "react";

function noop () {}
export const AuthContext = createContext({
  token: null,
  userId: null,
  login: noop,
  logout: noop,
  isAuth: false
})

export default function AuthContextProvider ({ value, children }) {
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
