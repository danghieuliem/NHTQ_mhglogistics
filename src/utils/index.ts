import { SorterResult } from "antd/lib/table/interface";
import jwt_decode from "jwt-decode";
import moment from "moment";
import { NextRouter } from "next/router";
import { baseFile } from "~/api";
import { toast } from "~/components";
import { firstPageDirect } from "~/configs";
export * from "./dom";

class Format {
  // format date
  getVNDate = (date: Date, format: string = "DD/MM/YYYY - HH:mm:ss") => {
    if (!date) return "--";
    return moment(date).format(format);
  };

  getShortVNDate = (date: Date) => {
    if (!date) return "--";
    return moment(date).format("DD/MM/YYYY");
  };

  getTime = (date: Date) => {
    if (!date) return "--";
    return moment(date).format("hh:mm:ss A");
  };

  // lấy thông tin từ token
  getJWTDecode = (
    token: string
  ): {
    exp: number;
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata": string;
    iat: number;
    nbf: number;
  } => jwt_decode(token);

  // upload hình ảnh
  getBase64 = (img, callback) => {
    if (img) {
      const reader = new FileReader();
      reader.addEventListener("load", () => callback(reader.result));
      reader.readAsDataURL(img);
    }
  };

  beforeUpload = (
    file,
    fileType: string | string[],
    mb: number = 2,
    messsageFileType: string = "Đây không là hình ảnh",
    messsageFileMB: string = "Hình ảnh phải nhỏ hơn 2mb, bạn không thể upload hình này!"
  ): boolean => {
    let isJpgOrPng = false;
    if (typeof fileType === "string") {
      isJpgOrPng = file.type === fileType;
    } else {
      isJpgOrPng = fileType.some((i) => i === file.type);
    }
    if (!isJpgOrPng) {
      toast.error({ title: "Lỗi upload file", message: messsageFileType });
    }
    const isLt2M = file.size / 1024 / 1024 < mb;
    if (!isLt2M) {
      toast.error({ title: "Lỗi upload file", message: messsageFileMB });
    }
    return isJpgOrPng && isLt2M;
  };

  previewImage = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  formatAfterUploadImage = async (
    defaultImage?: string,
    uploadedImage?: any
  ) => {
    // trường họp có chọn hình khác
    // TODO: nếu không upload được trên server thì báo lỗi
    if (!!uploadedImage) {
      defaultImage = await (await baseFile.uploadFile(uploadedImage)).Data;
    }
    // trường hợp có hình trước đó + xoá hình
    else if (!!defaultImage && !uploadedImage) {
      defaultImage = null;
    }

    return defaultImage;
  };

  addUrlForImage = (imageName?: string) =>
    !imageName ? imageName : process.env.NEXT_PUBLIC_IMAGE_URL + imageName;

  getNameImage = (url?: string): string | undefined => url?.split("/Temp/")[1];

  // kiểm tra có phải là số hay không
  isNumber = (val: string) => {
    if (val.match(/^-?[0-9]\d*([,.]\d+)?$/)) return true;
    return false;
  };

  // format currency of china
  getYuan = (price: number, suffix: string = " ¥") => {
    if (price === null || price === undefined) return "--";
    if (Number(price) && !price) return 0;
    if (Number.isInteger(price)) {
      return (
        (price?.toString() || "0").replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
        suffix
      );
    }

    return (
      (price > 0
        ? price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        : price) + suffix
    );
  };

  // format tiền việt nam
  getVND = (price: number, suffix: string = " VNĐ") => {
    if (price === null || price === undefined) return "--";
    if (Number(price) && !price) return 0;
    if (Number.isInteger(price)) {
      return (
        (price?.toString() || "0").replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
        suffix
      );
    }
    return (
      (price > 0
        ? price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        : price) + suffix
    );
  };

  // format phần trăm
  getPercent = (price: number, suffix: string = " %") =>
    (price?.toString() || "0") + suffix;

  // custom styles của react select
  customStyles = {
    control: (base, state) => ({
      ...base,
      "&:hover": {
        borderColor: "#40a9ff",
        borderWidth: "1px",
      },
      "& > div:last-child > div": {
        padding: "7px 0 !important",
      },
      "& > div:first-of-type": {
        padding: "0 !important",
      },
      "& > div:first-of-type > div:first-of-type": {
        marginLeft: "0 !important",
      },
      "& > div:first-of-type > div:last-child": {
        margin: "0 !important",
        padding: "0 !important",
      },
      padding: "0px 12px",
      paddingRight: 0,
      minHeight: 40,
      borderRadius: 4,
      // boxShadow: state.isFocused ? '0 0 0 2px rgba(246,67,2,.2)' : 'unset'
    }),
    menu: (base) => {
      return { ...base, zIndex: 99999 };
    },
    menuPortal: (base) => {
      return { ...base, zIndex: 99999 };
    },
  };
  customThemes = (theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      // primary25: '#40a9ff85',
      // primary: '#40a9ff'
    },
  });

  // format sorter table antd
  getCurrentSorter = <T>(sorter: SorterResult<T>) => {
    return sorter.field + " " + (sorter.order === "ascend" ? "asc" : "desc");
  };

  handleSubmit_link = (isLoad: boolean = false) => {
    const idElmLink = document.getElementById("auth-link");
    if (!idElmLink) return;

    // console.log("idElmLink: ", idElmLink);

    if (isLoad) {
      idElmLink.classList.add("submit");
    } else {
      idElmLink.classList.remove("submit");
    }

    return;
  };

  handleRemoveSpace(str: string) {
    if (typeof str !== "string") return str;
    return str.replace(/\s/g, " ");
  }

  string_chop = (str: string, size: number) => {
    if (str == null) return [];
    str = String(str);
    size = ~~size;
    return size > 0 ? str.match(new RegExp(".{1," + size + "}", "g")) : [str];
  };

  parseImageURL = (str: string) => {
    let imageURL = decodeURIComponent(decodeURIComponent(str));

    if (!imageURL.includes("https") || !imageURL.includes("http")) {
      imageURL = "https:" + imageURL;
    }

    return imageURL;
  };

  // convert money to string
  defaultNumbers = " hai ba bốn năm sáu bảy tám chín";
  dvBlock = "1 nghìn triệu tỷ".split(" ");
  chuHangDonVi = ("1 một" + this.defaultNumbers).split(" ");
  chuHangChuc = ("lẻ mười" + this.defaultNumbers).split(" ");
  chuHangTram = ("không một" + this.defaultNumbers).split(" ");

  convert_block_three = (number) => {
    if (number == "000") return "";
    let _a = number + ""; //Convert biến 'number' thành kiểu string

    //Kiểm tra độ dài của khối
    switch (_a.length) {
      case 0:
        return "";
      case 1:
        return this.chuHangDonVi[_a];
      case 2:
        return this.convert_block_two(_a);
      case 3:
        let chuc_dv = "";
        if (_a.slice(1, 3) != "00") {
          chuc_dv = this.convert_block_two(_a.slice(1, 3));
        }
        let tram = this.chuHangTram[_a[0]] + " trăm";
        return tram + " " + chuc_dv;
    }
  };

  convert_block_two = (number) => {
    let dv = this.chuHangDonVi[number[1]];
    let chuc = this.chuHangChuc[number[0]];
    let append = "";

    // Nếu chữ số hàng đơn vị là 5
    if (number[0] > 0 && number[1] == 5) {
      dv = "lăm";
    }

    // Nếu số hàng chục lớn hơn 1
    if (number[0] > 1) {
      append = " mươi";

      if (number[1] == 1) {
        dv = " mốt";
      }
    }

    return chuc + "" + append + " " + dv;
  };

  toVietnamese(number: number) {
    let str = String(number) + "";
    let i = 0;
    let arr = [];
    let index = str.length;
    let result = [];
    let rsString = "";

    if (index == 0 || str == "NaN") {
      return "";
    }

    // Chia chuỗi số thành một mảng từng khối có 3 chữ số
    while (index >= 0) {
      arr.push(str.substring(index, Math.max(index - 3, 0)));
      index -= 3;
    }

    // Lặp từng khối trong mảng trên và convert từng khối đấy ra chữ Việt Nam
    for (i = arr.length - 1; i >= 0; i--) {
      if (arr[i] != "" && arr[i] != "000") {
        result.push(this.convert_block_three(arr[i]));

        // Thêm đuôi của mỗi khối
        if (this.dvBlock[i]) {
          result.push(this.dvBlock[i]);
        }
      }
    }

    // Join mảng kết quả lại thành chuỗi string
    rsString = result.join(" ");

    // Trả về kết quả kèm xóa những ký tự thừa
    return `${rsString
      .replace(/[0-9]/g, "")
      .replace(/ /g, " ")
      .replace(/ $/, "")} việt nam đồng.`;
  }

  checkUserNameVNese(value: string) {
    const template = [
      "á",
      "à",
      "ả",
      "ã",
      "ạ",
      "â",
      "ấ",
      "ầ",
      "ẩ",
      "ẫ",
      "ậ",
      "ă",
      "ắ",
      "ằ",
      "ẳ",
      "ẵ",
      "ặ",
      "đ",
      "é",
      "è",
      "ẻ",
      "ẽ",
      "ẹ",
      "ê",
      "ế",
      "ề",
      "ể",
      "ễ",
      "ệ",
      "í",
      "ì",
      "ỉ",
      "ĩ",
      "ị",
      "ó",
      "ò",
      "ỏ",
      "õ",
      "ọ",
      "ô",
      "ố",
      "ồ",
      "ổ",
      "ỗ",
      "ộ",
      "ơ",
      "ớ",
      "ờ",
      "ở",
      "ỡ",
      "ợ",
      "ú",
      "ù",
      "ủ",
      "ũ",
      "ụ",
      "ư",
      "ứ",
      "ừ",
      "ử",
      "ữ",
      "ự",
      "ý",
      "ỳ",
      "ỷ",
      "ỹ",
      "ỵ",
    ];
    const result = template.find((item) => value.includes(item));
    return result;
  }
}

class FunctionHandle {
  handleCheckAccessPage(userGroupId: number, router: NextRouter) {
    const pathname = router.pathname;
    const pagePush = firstPageDirect.find((item) => item.id === userGroupId);

    if (pathname.includes("/user") || pathname.includes("/notification"))
      return;

    switch (userGroupId) {
      case 2:
        if (pagePush.allowPath[0].split("/")[1] !== pathname?.split("/")[1]) {
          router.push(pagePush.page);
        }
        break;
      case 3:
        for (let path in pagePush.denyPath) {
          if (pathname.includes(pagePush.denyPath[path])) {
            return router.push(pagePush.page);
          }
        }
        break;
      case 4:
        if (!pagePush.allowPath.find((x) => x.match(pathname))) {
          router.push(pagePush.page);
        }
        break;
      case 5:
        if (!pagePush.allowPath.find((x) => x.match(pathname))) {
          router.push(pagePush.page);
        }
        break;
      case 6:
        if (!pagePush.allowPath.find((x) => x.match(pathname))) {
          router.push(pagePush.page);
        }
        break;
      case 7:
        if (!pagePush.allowPath.find((x) => x.match(pathname))) {
          router.push(pagePush.page);
        }
        break;
      case 8:
        if (!pagePush.allowPath.find((x) => x.match(pathname))) {
          router.push(pagePush.page);
        }
        break;
      default:
        break;
    }
  }
}

export const _format = new Format();
export const _func = new FunctionHandle();
