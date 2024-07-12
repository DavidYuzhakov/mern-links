import { Input, Typography } from 'antd'
import React, { useContext, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from "react-router-dom"

const Create = () => {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const {request} = useHttp()
  const [link, setLink] = useState('')

  async function keyHandler (e) {
    if (e.key === 'Enter') {
      try {
        const data = await request('/api/links/generate', 'POST', { from: link }, {
          Authorization: `Bearer ${auth.token}`
        })
        console.log(data)
        navigate(`/detail/${data.link._id}`)
      } catch (e) {}
    }
  }

  return (
    <div>
      <Typography.Title>Create page!</Typography.Title>
      <Input 
        value={link} 
        onChange={(e) => setLink(e.target.value)} 
        onKeyDown={keyHandler}
        placeholder='Вставьте ссылку' 
      />
    </div>
  )
}

export default Create
