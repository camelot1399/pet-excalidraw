// export const getMagnitShop = () => {
//   return {
//     onClick: () => {
//       console.log("магнит");
//     },
//   };
// };

import { ShopModel } from "../shop.page";

export const getMagnitShop = (): (() => ShopModel) => {
  return () => ({
    onClick: () => {
      console.log("магнит");
    },
  });
};
