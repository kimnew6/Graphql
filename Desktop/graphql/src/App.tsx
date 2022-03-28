import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import Product from "./Product";

import TextField from "@mui/material/TextField";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const PRODUCT_LIST = gql`
  query {
    products(first: 7) {
      edges {
        node {
          id
          name
          images {
            url
          }
        }
      }
    }
  }
`;
const ASC = (key) => {
  return function (a, b) {
    const x = parseInt(a[key]);
    const y = parseInt(b[key]);

    if (x < y) return -1;
    if (x > y) return 1;
    return 0;
  };
};

const GetProductList = () => {
  const [searchInput, setSearchInput] = useState("");
  const { loading, error, data } = useQuery(PRODUCT_LIST);
  console.log(data);

  const navigate = useNavigate();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  return (
    <>
      <div
        style={{
          margin: "10px",
          textAlign: "center",
          borderBottom: "1px solid lightgrey",
          fontSize: "80px",
        }}
      >
        weprex
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          label="Search"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <div style={{ position: "absolute", right: 10 }}>
          <ArrowUpwardIcon></ArrowUpwardIcon>
          <ArrowDownwardIcon></ArrowDownwardIcon>
        </div>
      </div>
      <div>
        {data.products.edges
          .filter((val: any) => {
            if (searchInput === "") {
              return val;
            } else if (
              val.node.name.toLowerCase().includes(searchInput.toLowerCase())
            ) {
              return val;
            }
          })
          .map((product: any) => {
            return (
              <div
                key={product.node.id}
                style={{ display: "inline-block", margin: "20px" }}
                onClick={() => navigate(`/product/${product.node.id}`)}
              >
                <Product
                  id={product.node.id}
                  name={product.node.name}
                  img={product.node.images[0].url}
                />
              </div>
            );
          })}
      </div>
    </>
  );
};

const App = () => {
  return (
    <div className="App">
      <GetProductList />
    </div>
  );
};

export default App;
