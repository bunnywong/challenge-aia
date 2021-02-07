import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Switch from 'react-switch'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import xor from 'lodash/xor'

import Layout from 'src/global/Layout'
import axios from 'src/components/_settings/axios'
import HeroCarousel from 'src/components/organisms/carousel/'

function IndexPage() {
  const [items, setItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [random, setRandom] = useState(false)
  const imagesCount = 8
  const itemRangeRandom = Array.from(
    { length: process.env.LIMITED_IDS },
    () => Math.floor(Math.random() * process.env.LIMITED_IDS) + 1
  ).splice(0, imagesCount)
  const handleSwitch = () => {
    setRandom(!random)
    localStorage.setItem('randomImages', !random)
  }
  const itemRange = random ? itemRangeRandom : [1, 2, 3, 4, 5, 6, 7, 8]
  const fetchList = async () => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
    const fetchItem = async (id) => {
      await axios.get(`/${id}`).then((response) =>
        setItems((state) => {
          return itemRange[0] === id ? [response.data] : [...state, response.data]
        })
      )
    }
    for (let i = 0; i < imagesCount; i++) {
      fetchItem(itemRange[i])
      await sleep(process.env.FETCH_SLEEP)
    }
  }
  const handleClickFavorite = (id) => {
    const favoriteIds = JSON.parse(localStorage.getItem('favoriteIds'))
    const result = xor(favoriteIds, [id])
    localStorage.setItem('favoriteIds', JSON.stringify(result))
    setFavorites(result)
  }
  const getFavorite = (cell, row) => {
    return (
      <button onClick={() => handleClickFavorite(row.id)}>
        {favorites.includes(row.id) ? '❤️' : '🖤'}
      </button>
    )
  }
  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('favoriteIds')))
    if (localStorage.getItem('randomImages') === 'true') {
      setRandom(true)
    }
  }, [])
  useEffect(() => {
    fetchList()
  }, [random])

  return (
    <Layout>
      <section>
        <HeroCarousel items={items} />
        <div className="p-3">
          <strong>Random Images: </strong>
          <Switch onChange={() => handleSwitch()} checked={random} className="ml-3" />
        </div>
      </section>
      <section>
        <BootstrapTable data={items} striped hover condensed search>
          <TableHeaderColumn dataField="favorite" width="100" dataFormat={getFavorite} dataSort>
            Favorite
          </TableHeaderColumn>
          <TableHeaderColumn dataField="id" width="100" isKey dataSort>
            ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField="name" dataSort>
            Name
          </TableHeaderColumn>
        </BootstrapTable>
      </section>
    </Layout>
  )
}

export default IndexPage
