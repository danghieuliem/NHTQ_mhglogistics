import BaseAPI from "../methods";

const { get } = new BaseAPI<any>("search");

export const searchProduct = {
  get: (params: { url: string }) => get("/get-full-link", { params }),
};
