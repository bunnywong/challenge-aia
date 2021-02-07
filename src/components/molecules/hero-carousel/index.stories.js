import React from 'react'
import { storiesOf } from '@storybook/react'

import HeroCarousel from '.'
import { items } from './data.stories'

storiesOf('Hero Carousel', module).add('Default', () => <HeroCarousel items={items} />)
