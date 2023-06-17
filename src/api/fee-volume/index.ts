import BaseAPI from "../methods";

const { globalCRUD } = new BaseAPI("volume-fee");

export const feeVolume = globalCRUD;
