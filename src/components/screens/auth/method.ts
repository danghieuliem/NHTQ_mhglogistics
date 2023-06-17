import _ from "lodash";
import { authenticate } from "~/api";

export const buildComplainsSystem = () => {
  const complainList = [
    // "sai hoài dị",
    // "Ok, I am fine",
    // "đùa t hả m",
    // "nhập có tí cũng sai",
    // "không giống passSSSSSSSSSSSSS",
    // "so what..",
    // "thích nhập sai không",
    // "lại sai",
    // "cạn lời",
    "không giống mật khẩu",
  ] as const;

  let lastComplain;

  const createResult = (list) => {
    const complain = list[Math.floor(Math.random() * list.length)];
    lastComplain = complain;
    return complain;
  };

  return () => {
    let _complainList = [...complainList];
    const lastComplainIndex = complainList.findIndex(
      (item) => item === lastComplain
    );

    if (lastComplain === undefined || lastComplainIndex === -1) {
      return createResult(_complainList);
    }

    _complainList.splice(lastComplainIndex, 1);

    return createResult(_complainList);
  };
};

export const createComplain = buildComplainsSystem();

export enum EUnique {
  username = 1,
  email = 2,
  phone = 3,
}

export const uniqueComplain = {
  [EUnique.username]: "Username đã có người sử dụng",
  [EUnique.email]: "Email đã có người dùng!",
  [EUnique.phone]: "Số điện thoại đã có người dùng!",
};

export const checkUnique = async (value, type: EUnique) => {
  const payload = await authenticate.checkCanUseThisName({
    name: value,
    type,
  });

  const canUseThisName = payload.Data;
  return canUseThisName || uniqueComplain[type];
};

// export const checkUnique = _.debounce(check, 300, { leading: true });

// export async function check(value, result) {
// 	const payload = await authenticate.checkCanUseThisName({
// 		name: value,
// 		type: EUnique.username
// 	});
// 	const canUseThisName = payload.Data;
// 	result.value = canUseThisName || 'đã có thằng nào sử dụng username này';
// }
