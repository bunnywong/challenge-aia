import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Switch from 'react-switch'

import Layout from 'src/global/Layout'
import axios from 'src/components/_settings/axios'
import Axios from 'axios'
import HeroCarousel from 'src/components/molecules/hero-carousel/'
import HeroTable from 'src/components/molecules/hero-table/'

function IndexPage() {
  const [items, setItems] = useState([])
  const [random, setRandom] = useState(false)
  const source = Axios.CancelToken.source()
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
    const fetchItem = async (id) => {
      await axios
        .get(`/${id}`, {
          cancelToken: source.token,
        })
        .then((response) =>
          setItems((state) => {
            return itemRange[0] === id ? [response.data] : [...state, response.data]
          })
        )
        .catch((error) => {
          if (!Axios.isCancel(error)) {
            throw error
          }
        })
    }
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
    for (let i = 0; i < imagesCount; i++) {
      fetchItem(itemRange[i])
      await sleep(process.env.FETCH_SLEEP)
    }
  }

  useEffect(() => {
    if (localStorage.getItem('randomImages') === 'true') {
      setRandom(true)
    }
  }, [])
  useEffect(() => {
    fetchList()
    return () => {
      source.cancel()
    }
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
        <HeroTable items={items} />
      </section>
    </Layout>
  )
}

export default IndexPage
