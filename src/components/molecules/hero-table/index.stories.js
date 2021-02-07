import React from 'react'
import { storiesOf } from '@storybook/react'

import HeroTable from '.'
import { items } from '../data.stories'

storiesOf('Hero Table', module).add('Default', () => <HeroTable items={items} />)
