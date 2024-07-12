import { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header } = Layout;

export const NavBar = () => {
  const navigate = useNavigate()
  const { logout } = useContext(AuthContext)

  function logoutHandler () {
    if (window.confirm()) {
      logout()
      navigate('/')
    }
  }

  const items = [
    {key: 1, label: 'создать', onClick: () => navigate('/create')},
    {key: 2, label: 'ссылки', onClick: () => navigate('/links')},
    {key: 3, label: 'выйти', onClick: logoutHandler},
  ]  

  return (
    <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Link to={'/'}>Сокращение ссылок</Link>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        items={items}
        style={{ flex: 1, minWidth: 0 }}
      />
    </Header>
  )
}

