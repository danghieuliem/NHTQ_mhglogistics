import BaseAPI from "../methods";

const {globalCRUD} = new BaseAPI<{}>("contact-us");

export const ContactUs = {
	...globalCRUD,
};
