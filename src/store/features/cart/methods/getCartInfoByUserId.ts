import { createAsyncThunk } from "@reduxjs/toolkit";
import { orderShopTemp, orderTemp } from "~/api";

export const getCartInfoByUserId = createAsyncThunk(
  "cart/getCartInfo",
  async (uid: number) => {
    let orderShopTempData: TUserCartOrderShopTemp[] = [],
      orderTempData: TUserCartOrderTemp[] = [];
    try {
      const getAllParams = {
        UID: uid,
        PageIndex: 0,
        PageSize: 0,
        OrderBy: "Id desc",
      };

      const [orderShopTempResponse, orderTempResponse] = await Promise.all([
        orderShopTemp.getList(getAllParams),
        orderTemp.getList(getAllParams),
      ]);

      orderShopTempData = orderShopTempResponse.Data.Items;
      orderTempData = orderTempResponse.Data.Items;
    } catch (error) {
      console.log("error get cart info by UserId", error);
    }

    return { orderShopTempData, orderTempData };
  }
);
