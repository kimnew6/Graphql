import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import Product from "./Product";

import TextField from "@mui/material/TextField";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const GetProductList = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [productData, setProductData] = useState<Array<{}>>([]);
  const GETLIST = gql`
    query (
      $filter: ProductFilterInput
      $sortBy: ProductOrder
      $first: Int
      $last: Int
      $after: String
      $before: String
    ) {
      products(
        filter: $filter
        sortBy: $sortBy
        first: $first
        last: $last
        after: $after
        before: $before
      ) {
        pageInfo {
          endCursor
          startCursor
        }
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

  const [getList, { data }] = useLazyQuery(GETLIST);
  const navigate = useNavigate();
  console.log(data);

  useEffect(() => {
    getList({
      variables: { first: "10", sortBy: { field: "NAME", direction: "ASC" } },
    });
  }, []);

  const nameAsc = () => {
    getList({
      variables: { first: "10", sortBy: { field: "NAME", direction: "ASC" } },
    });
  };

  const nameDesc = () => {
    getList({
      variables: { first: "10", sortBy: { field: "NAME", direction: "DESC" } },
    });
  };

  const debounce = (callback: any, delay: number) => {
    let timer: any;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => callback(...args), delay);
    };
  };

  const debounceHandle = useCallback(
    debounce(
      (e: React.ChangeEvent<HTMLInputElement>) =>
        getList({
          variables: { first: "10", filter: { searchV: e.target.value } },
        }),
      500
    ),
    []
  );

  const moveToNext = () => {
    getList({
      variables: {
        first: "10",
        after: data.products.pageInfo.endcursor,
      },
    });
  };
  const moveToPrev = () => {
    getList({
      variables: {
        last: "3",
        before: data.products.pageInfo.startcursor,
      },
    });
  };

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
        <TextField label="Search" type="text" onChange={debounceHandle} />
        <div style={{ position: "absolute", right: 10 }}>
          <ArrowUpwardIcon
            style={{ cursor: "pointer" }}
            onClick={nameAsc}
          ></ArrowUpwardIcon>
          <ArrowDownwardIcon
            style={{ cursor: "pointer" }}
            onClick={nameDesc}
          ></ArrowDownwardIcon>
        </div>
      </div>
      <div style={{ padding: "40px" }}>
        {data &&
          data.products.edges.map((product: any) => {
            return (
              <div
                key={product.node.id}
                style={{
                  cursor: "pointer",
                  display: "inline-block",
                  margin: "20px",
                }}
                onClick={() => navigate(`/product/${product.node.id}`)}
              >
                {product.node.images[0] && (
                  <Product
                    key={product.node.id}
                    name={product.node.name}
                    img={product.node.images[0].url}
                  />
                )}
              </div>
            );
          })}
        <ArrowBackIosNewIcon
          style={{ position: "fixed", top: "50%", left: 10, cursor: "pointer" }}
          onClick={moveToNext}
        ></ArrowBackIosNewIcon>
        <ArrowForwardIosIcon
          style={{
            position: "fixed",
            top: "50%",
            right: 10,
            cursor: "pointer",
          }}
          onClick={moveToPrev}
        ></ArrowForwardIosIcon>
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
