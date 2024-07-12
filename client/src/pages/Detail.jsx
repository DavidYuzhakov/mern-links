import { Typography } from 'antd'
import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { LinkCard, Loader } from '../components'

const Detail = () => {
  const {token} = useContext(AuthContext)
  const [link, setLink] = useState()
  const { id: linkId } = useParams()
  const {request, loading} = useHttp()

  useEffect(() => {
    (async function(){
      const data = await request(`/api/links/${linkId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setLink(data)
    })()
  }, [])

  if (loading) return <Loader />

  return (
    <>
      <Typography.Title>Detail page!</Typography.Title>
      {link && <LinkCard link={link} />}
    </>
  )
}

export default Detail
