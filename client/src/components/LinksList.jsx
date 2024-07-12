import { Link } from "react-router-dom"
import { LinkCard } from "./LinkCard"

export function LinksList ({ links }) {
  if (links.lenght < 1) {
    return <p style={{ textAlign: 'center' }}>Ссылок пока нет :(</p>
  }

  return (
    <>
      {links.map((link, i) => (
        <LinkCard key={link._id} isList link={link} />
      ))}
    </>
  )
}