import { Card } from "antd";
import { Link } from "react-router-dom";

export function LinkCard ({ link, isList }) {
  return (
    <Card title="Ссылка" style={{ overflow: 'hidden', marginBottom: 10 }}>
      <p>Ваша ссылка: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
      <p>Откуда: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
      {!isList && <>
        <p>Кол-во кликов по ссылке: <strong>{link.clicks}</strong></p>
        <p>Дата создания: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
      </>}
      {isList && 
        <>
          <p>ID: {link._id}</p>
          <p>Открыть: <Link to={`/detail/${link._id}`}>ссылка</Link></p>
        </>
      }
    </Card>
  )
}