import React, { useState } from "react";

const SHOPS = [
  { id: "1", title: "Пятерочка", name: "value1" },
  { id: "2", title: "Дикси", name: "value2" },
  { id: "3", title: "Магнит", name: "value3" },
  { id: "4", title: "Перекресток", name: "value4" },
] as const;

type Shop = (typeof SHOPS)[number];
type NameShop = Shop["name"];

const SHOP_COLORS = ["red", "yellow", "blue", "green"] as const;

type ShopColors = (typeof SHOP_COLORS)[number];

const colorMap: Record<Shop["name"], ShopColors> = {
  value1: "red",
  value2: "yellow",
  value3: "blue",
  value4: "green",
};

const getActiveShopTitle = (name: string) => {
  return SHOPS.find((el) => el.name === name)?.title ?? "Неизвестно";
};

type ShopModelParams = {
  activeShop: NameShop;
};

type ShopModel = {
  onClick: () => void;
};

const useShopModel = (params: ShopModelParams): ShopModel => {
  const { activeShop } = params;
  const behaviorMap: Record<NameShop, ShopModel> = {
    value1: {
      onClick: () => {
        console.log("value1");
      },
    },
    value2: {
      onClick: () => {
        console.log("value2");
      },
    },
    value3: {
      onClick: () => {
        console.log("value3");
      },
    },
    value4: {
      onClick: () => {
        console.log("value4");
      },
    },
  };

  return behaviorMap[activeShop];
};

const ShopPage = () => {
  const [activeShop, setActiveShop] = useState<NameShop>(SHOPS[0].name);
  const [shopColor, setShopColor] = useState<ShopColors>(SHOP_COLORS[0]);

  const shopModel = useShopModel({ activeShop });

  const handleChangeInput = (shop: Shop) => {
    setActiveShop(shop.name);

    setShopColor(colorMap[shop.name]);
  };

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
                onClick={() => shopModel.onClick()}
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
