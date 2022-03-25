import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import Product from "./Product";

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
  const { loading, error, data } = useQuery(PRODUCT_LIST);

  const navigate = useNavigate();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  return (
    <div>
      {data.products.edges.map((product: any) => {
        return (
          <div
            style={{ display: "inline-block", margin: "20px" }}
            key={product.node.id}
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
