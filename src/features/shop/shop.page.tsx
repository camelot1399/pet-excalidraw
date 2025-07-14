import React, { useState } from "react";
import { getDiksiShop } from "./shop-variants/shop-diksi";
import { getPerekShop } from "./shop-variants/shop-perek";
import { getMagnitShop } from "./shop-variants/shop-magnit";
import { getX5Shop } from "./shop-variants/shop-x5";

const SHOPS = [
  { id: "1", title: "Пятерочка", name: "value1", color: "red" },
  { id: "2", title: "Дикси", name: "value2", color: "yellow" },
  { id: "3", title: "Магнит", name: "value3", color: "blue" },
  { id: "4", title: "Перекресток", name: "value4", color: "green" },
] as const;

type Shop = (typeof SHOPS)[number];
type NameShop = Shop["name"];
type ShopColors = Shop["color"];

const getActiveShopTitle = (name: string) => {
  return SHOPS.find((el) => el.name === name)?.title ?? "Неизвестно";
};

const shopModelMap: Record<NameShop, () => ShopModel> = {
  value1: getX5Shop(),
  value2: getDiksiShop,
  value3: getMagnitShop(),
  value4: getPerekShop(),
} satisfies Record<NameShop, () => ShopModel>;

export type ShopModel = {
  onClick: () => void;
};

const getShopModel = (name: NameShop): ShopModel => shopModelMap[name]();

const useShopModel = (initialShop: Shop = SHOPS[0]) => {
  const [activeShop, setActiveShop] = useState<NameShop>(initialShop.name);
  const [shopColor, setShopColor] = useState<ShopColors>(initialShop.color);

  const handleChangeInput = (shop: Shop) => {
    setActiveShop(shop.name);
    setShopColor(shop.color);

    const shopModel = getShopModel(shop.name);
    shopModel.onClick();
  };

  return {
    activeShop,
    shopColor,
    handleChangeInput,
  };
};

const ShopPage = () => {
  const { activeShop, shopColor, handleChangeInput } = useShopModel();

  return (
    <>
      <h1>Магазины</h1>

      <div style={{ color: shopColor ? shopColor : "black" }}>
        активный магазин: {getActiveShopTitle(activeShop)}
      </div>

      <fieldset>
        <legend>Выберете активный магазин:</legend>

        <ul>
          {SHOPS.map((shop) => (
            <li key={shop.id}>
              <input
                type="radio"
                id={shop.id}
                name="shop"
                value={shop.name}
                checked={activeShop === shop.name}
                onChange={() => handleChangeInput(shop)}
              />
              <label htmlFor={shop.id}>{shop.title}</label>
            </li>
          ))}
        </ul>
      </fieldset>
    </>
  );
};

export default ShopPage;
