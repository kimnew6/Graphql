import React, { useEffect, useState } from "react";
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

const GetProductList = () => {
  const { loading, error, data } = useQuery(PRODUCT_LIST); // useLazyQuery
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState<string>("");
  const [productData, setProductData] = useState<Array<{}>>([]);
  console.log(data);

  useEffect(() => {
    if (data) {
      setProductData(data.products.edges);
    }
  }, [data]);

  const Asc = () => {
    const arrayData = [...data.products.edges];
    console.log(arrayData);
    setProductData(arrayData);
    return arrayData.sort((a, b): any => {
      const upperCaseA = a.node.name.toUpperCase();
      const upperCaseB = b.node.name.toUpperCase();

      if (upperCaseA < upperCaseB) return 1;
      if (upperCaseA > upperCaseB) return -1;
      if (upperCaseA === upperCaseB) return 0;
    });
  };

  const Desc = () => {
    const arrayData = [...data.products.edges];
    console.log(arrayData);
    setProductData(arrayData);
    return arrayData.sort((a, b): any => {
      const upperCaseA = a.node.name.toUpperCase();
      const upperCaseB = b.node.name.toUpperCase();

      if (upperCaseA > upperCaseB) return 1;
      if (upperCaseA < upperCaseB) return -1;
      if (upperCaseA === upperCaseB) return 0;
    });
  };

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
        wiprex
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchInput(e.target.value)
          }
        />
        <div style={{ position: "absolute", right: 10 }}>
          <ArrowUpwardIcon
            style={{ cursor: "pointer" }}
            onClick={Asc}
          ></ArrowUpwardIcon>
          <ArrowDownwardIcon
            style={{ cursor: "pointer" }}
            onClick={Desc}
          ></ArrowDownwardIcon>
        </div>
      </div>
      <div>
        {data &&
          productData
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
                    // id={product.node.id}
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
