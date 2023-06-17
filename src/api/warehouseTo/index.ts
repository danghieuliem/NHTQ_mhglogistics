import BaseAPI from "../methods";

const {globalCRUD} = new BaseAPI<TTariffTQVN>("warehouse");

export const warehouseTo = globalCRUD;
