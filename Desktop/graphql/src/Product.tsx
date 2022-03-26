// import React from "react";
// import { useParams } from "react-router-dom";

// const Product = ({ id, name, img }: any) => {
//   return (
//     <div key={id}>
//       <p>{name}</p>
//       <img style={{ width: "150px" }} src={img} alt="lulu" />
//     </div>
//   );
// };

// export default Product;

import React from "react";
import { useParams } from "react-router-dom";

const Product = ({ id, name, img }: any) => {
  return (
    <div key={id}>
      <p>{name}</p>
      <img style={{ width: "150px" }} src={img} alt="lulu" />
    </div>
  );
};

export default Product;
