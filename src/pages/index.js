import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Switch from "react-switch";
import { Carousel } from "react-responsive-carousel";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";

import Layout from "src/global/Layout";
import axios from "src/components/Axios/";

function IndexPage() {
  const [items, setItems] = useState([]);
  const [random, setRandom] = useState(false);
  const imagesCount = 8;
  const itemRangeRandom = Array.from(
    { length: process.env.LIMITED_IDS },
    () => Math.floor(Math.random() * process.env.LIMITED_IDS) + 1
  ).splice(0, imagesCount);
  const handleSwitch = () => {
    setRandom(!random);
    localStorage.setItem("randomImages", !random);
  };
  const itemRange = random ? itemRangeRandom : [1, 2, 3, 4, 5, 6, 7, 8];

  const fetchList = async () => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const fetchItem = async (id) => {
      await axios.get(`/${id}`).then((response) =>
        setItems((state) => {
          return itemRange[0] === id
            ? [response.data]
            : [...state, response.data];
        })
      );
    };
    for (let i = 0; i < imagesCount; i++) {
      fetchItem(itemRange[i]);
      await sleep(500);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("randomImages") === "true") {
      setRandom(true);
    }
  }, []);
  useEffect(() => {
    fetchList();
  }, [random]);

  return (
    <Layout>
      <Carousel>
        {items &&
          items.map((item, index) => (
            <div key={index}>
              <img src={item?.image?.url} style={{ maxWidth: `300px` }} />
              <p className="legend">{item.name}</p>
            </div>
          ))}
      </Carousel>
      <div className="p-3">
        <strong>Random Images: </strong>
        <Switch
          onChange={() => handleSwitch()}
          checked={random}
          className="ml-3"
        />
      </div>
    </Layout>
  );
}

export default IndexPage;
