import BaseAPI from "../methods";

const {globalCRUD} = new BaseAPI<TService>("service");

export const service = globalCRUD;
