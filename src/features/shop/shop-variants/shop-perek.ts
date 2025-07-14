// export const getPerekShop = () => {
//   return {
//     onClick: () => {
//       console.log("перекресток");
//     },
//   };
// };

import { ShopModel } from "../shop.page";

export const getPerekShop = (): (() => ShopModel) => {
  return () => ({
    onClick: () => {
      console.log("перекресток");
    },
  });
};
