import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css'

function HeroCarousel({ items }) {
  return (
    <Carousel>
      {items &&
        items.map((item, index) => (
          <div key={index}>
            <img src={item?.image?.url} style={{ maxWidth: `300px` }} />
            <p className="legend">{item.name}</p>
          </div>
        ))}
    </Carousel>
  )
}

export default HeroCarousel
