import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import Product from "./Product";

import TextField from "@mui/material/TextField";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

// const PRODUCT_LIST = gql`
//   query {
//     products(first: 7) {
//       edges {
//         node {
//           id
//           name
//           images {
//             url
//           }
//         }
//       }
//     }
//   }
// `;

const GetProductList = () => {
  // const { loading, error, data } = useQuery(PRODUCT_LIST);
  const [searchInput, setSearchInput] = useState<string>("");
  const [productData, setProductData] = useState<Array<{}>>([]);
  const GETLIST = gql`
    query ($filter: ProductFilterInput, $sortBy: ProductOrder) {
      products(filter: $filter, sortBy: $sortBy, first: 13) {
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
    getList();
    if (data) {
      setProductData(data.products.edges);
    }
  }, []);

  const nameAsc = () => {
    getList({ variables: { sortBy: { field: "NAME", direction: "ASC" } } });
  };

  const nameDesc = () => {
    getList({ variables: { sortBy: { field: "NAME", direction: "DESC" } } });
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
        getList({ variables: { filter: { searchV: e.target.value } } }),
      500
    ),
    []
  );

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
      <div>
        {data &&
          // productData
          // .filter((val: any) => {
          //   if (searchInput === "") {
          //     return val;
          //   } else if (
          //     val.node.name.toLowerCase().includes(searchInput.toLowerCase())
          //   ) {
          //     return val;
          //   }
          // })
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
