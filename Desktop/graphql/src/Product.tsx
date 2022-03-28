import React from "react";

const Product = ({ id, name, img }: any) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
      key={id}
    >
      <img style={{ width: "150px" }} src={img} alt="lulu" />
      <p>{name}</p>
    </div>
  );
};

export default Product;
