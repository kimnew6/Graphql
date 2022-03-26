import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

// const PRODUCT = gql`
//   query {
//     product {
//       id
//       name
//       seoTitle
//       images {
//         url
//       }
//       variants {
//         price {
//           currency
//         }
//       }
//     }
//   }
// `;
const PRODUCT = gql`
  query Query($code: ID!) {
    country(code: $code) {
      code
      name
      phone
      currency
    }
  }
`;
// const ProductDetail = () => {
//   const { loading, error, data } = useQuery(PRODUCT);
//   const { productId } = useParams();
//   console.log(productId);
//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error!</p>;
//   return (
//     <div>
//       <span>{data.product.id}</span>
//       <span>{data.product.name}</span>
//       <span>{data.product.seoTitle}</span>
//       <span>{data.product.variants.price.currency}</span>
//       <img src={data.product.images[0].url} alt="lulu"></img>
//     </div>
//   );
// };
// export default ProductDetail;
const ProductDetail = () => {
  const { code } = useParams();
  const { loading, error, data } = useQuery(PRODUCT, {
    variables: { code: code },
  });
  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span>{data.country.name}</span>
      <span>{data.country.phone}</span>
      <span>{data.country.code}</span>
      <span>{data.country.currency}</span>
    </div>
  );
};
export default ProductDetail;
