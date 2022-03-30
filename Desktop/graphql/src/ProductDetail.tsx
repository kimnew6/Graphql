import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const PRODUCT = gql`
  query ($id: ID!) {
    product(id: $id) {
      id
      name
      publicationDate
      images {
        url
      }
      favoriteCount
    }
  }
`;

const ProductDetail = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(PRODUCT, {
    variables: { id: id },
  });
  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "500px",
          border: "solid 1px lightgrey",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <img
          style={{ width: "400px" }}
          src={data.product.images[0].url}
          alt="lulu"
        ></img>
        <span>{data.product.name}</span>
        <span>발매일 : {data.product.publicationDate}</span>
        <span>좋아요 : {data.product.favoriteCount}</span>
      </div>
    </main>
  );
};
export default ProductDetail;
