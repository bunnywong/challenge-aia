import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";

import Layout from "src/global/Layout";
import axios from "src/components/Axios/";

function IndexPage() {
  const [items, setItems] = useState([]);
  const imagesCount = 8;
  const itemRange = Array.from(
    { length: process.env.LIMITED_IDS },
    () => Math.floor(Math.random() * process.env.LIMITED_IDS) + 1
  ).splice(0, imagesCount);

  useEffect(() => {
    const fetchList = async () => {
      const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const fetchItem = async (id) => {
        await axios
          .get(`/${id}`)
          .then((response) => setItems((state) => [...state, response.data]));
      };
      for (let i = 0; i < imagesCount; i++) {
        fetchItem(itemRange[i]);
        await sleep(500);
      }
    };
    fetchList();
  }, []);

  return (
    <Layout>
      <Carousel>
        {items.map((item, index) => (
          <div key={index}>
            <img src={item.image.url} style={{ maxWidth: `300px` }} />
            <p className="legend">{item.name}</p>
          </div>
        ))}
      </Carousel>
    </Layout>
  );
}

export default IndexPage;
