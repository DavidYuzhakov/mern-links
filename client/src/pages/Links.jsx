import { useContext, useEffect, useState } from 'react'

import { useHttp } from "../hooks/http.hook"
import { Loader, LinksList } from "../components"
import { AuthContext } from '../context/AuthContext'

const Links = () => {
  const { token } = useContext(AuthContext)
  const {request, loading} = useHttp()
  const [links, setLinks] = useState([])

  useEffect(() => {
    (async function() {
      try {
        const data = await request('/api/links/', 'GET', null, {
          Authorization: `Bearer ${token}`
        })
        setLinks(data)
      } catch (e) {}
    }) ()
  }, [])

  if (loading) return <Loader />

  console.log(links)

  return (
    <div>
      {links.length > 0 && <LinksList links={links} />}
    </div>
  )
}

export default Links