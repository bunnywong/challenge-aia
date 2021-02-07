import React from 'react'
import renderer from 'react-test-renderer'

import HeroCarousel from '../'
import { items } from '../../data.stories'

describe('Carousel', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<HeroCarousel items={items} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
