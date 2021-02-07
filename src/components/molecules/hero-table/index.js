import React, { useState, useEffect } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import xor from 'lodash/xor'
import includes from 'lodash/includes'

function HeroTable({ items }) {
  const [favorites, setFavorites] = useState([])

  const handleClickFavorite = (id) => {
    const favoriteIds = JSON.parse(localStorage.getItem('favoriteIds'))
    const result = xor(favoriteIds, [id])
    localStorage.setItem('favoriteIds', JSON.stringify(result))
    setFavorites(result)
  }
  const getFavorite = (cell, row) => {
    return (
      <button onClick={() => handleClickFavorite(row.id)}>
        {includes(favorites, row.id) ? '❤️' : '🖤'}
      </button>
    )
  }

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('favoriteIds')))
  }, [])

  return (
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
  )
}

export default HeroTable
