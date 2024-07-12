import { Navigate, Route, Routes } from "react-router-dom"
import {Links, Detail, Create, Auth} from "./pages"

export const useRoutes = (isAuth) => {
  if (isAuth) {
    return (
      <Routes>
        <Route path="/links" element={<Links />} exact />
        <Route path="/create" element={<Create />} exact />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="*" element={<Navigate to="/create" replace />} />
      </Routes>
    )
  }
  return (
    <Routes>
      <Route path="/" element={<Auth />} exact />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}