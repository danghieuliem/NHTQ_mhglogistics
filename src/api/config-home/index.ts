import BaseAPI from "../methods";

const { get, globalCRUD } = new BaseAPI<TReport>("menu");

const configHomeData = {
  ...globalCRUD,
  get: () => get("/config?id=1"),
};

export default configHomeData;
