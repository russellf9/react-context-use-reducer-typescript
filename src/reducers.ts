import { Key } from "react";

type ActionMap<M extends { [index: string]: any }> = {
  [key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  Create = "CREATE_PRODUCT",
  Delete = "DELETE_PRODUCT",
  Add = "ADD_PRODUCT",
}

//Product

type ProductType = {
  id: number;
  name: string;
  price: number;
};

type ProductPayload = {
  [Types.Create]: {
    id: number;
    name: string;
    price: number;
  };
  [Types.Delete]: {
    id: number;
  };
};

export type ProductActions = ActionMap<ProductPayload>[keyof ActionMap<ProductPayload>];

export const productReducer = (
  state: ProductType[],
  action: ProductActions | ShoppingCartActions
) => {
  const payload = action.payload;
  switch (action.type) {
    case Types.Create:
      return [
        ...state,
        {
          id: (payload as ProductPayload[Types.Create]).id,
          name: (payload as ProductPayload[Types.Create]).name,
          price: (payload as ProductPayload[Types.Create]).price,
        },
      ];

    case Types.Delete:
      return [
        ...state.filter(
          (product) =>
            product.id !== (payload as ProductPayload[Types.Delete]).id
        ),
      ];

    default:
      return state;
  }
};

//ShoppingCart

type ShoppingCartPayload = {
  [Types.Add]: undefined;
};

export type ShoppingCartActions = ActionMap<ShoppingCartPayload>[keyof ActionMap<ShoppingCartPayload>];

export const shoppingCartReducer = (
  state: number,
  action: ProductActions | ShoppingCartActions
) => {
  switch (action.type) {
    case Types.Add:
      return state + 1;
    default:
      return state;
  }
};
