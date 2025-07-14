// import { ShopModel } from "../shop.page";

import { ShopModel } from "../shop.page";

// export const getX5Shop = (): ShopModel => ({
//   onClick: () => {
//     console.log("пятерочка");
//   },
// });

export const getX5Shop = (): (() => ShopModel) => {
  return () => ({
    onClick: () => {
      console.log("пятерочка");
    },
  });
};
