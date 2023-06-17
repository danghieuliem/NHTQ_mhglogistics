import { Modal } from "antd";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import configHomeData from "~/api/config-home";
import styles from "./index.module.css";
import { RootState } from "~/store";
import { useSelector } from "react-redux";

export const PopupNoti = () => {
  const notiShow = useRef(false);
  const [openModal, setOpenModal] = useState(notiShow.current);
  const dataGlobal: any = useSelector((state: RootState) => state.dataGlobal);

  useEffect(() => {
    if (dataGlobal) {
      const showNoti = JSON.parse(localStorage.getItem("showNoti"));

      if (
        dataGlobal?.NotiPopupTitle &&
        showNoti !== undefined &&
        showNoti !== false
      ) {
        localStorage.setItem("showNoti", JSON.stringify(true));
        setOpenModal(true);
      }

      if (!dataGlobal?.NotiPopupTitle) {
        localStorage.setItem("showNoti", JSON.stringify(false));
        setOpenModal(false);
      } else {
        localStorage.setItem("showNoti", JSON.stringify(true));
        setOpenModal(true);
      }
    }
  }, [dataGlobal]);

  return (
    <Modal
      visible={openModal}
      closeIcon={false}
      footer={false}
      className="homePopupNoti"
    >
      <div className={styles.popupNoti}>
        <div className={styles.head}>
          <h1>{dataGlobal?.CompanyLongName}</h1>
        </div>
        <div className={styles.content}>
          <h3>{dataGlobal?.NotiPopupTitle}</h3>
          <div
          dangerouslySetInnerHTML={{ __html: dataGlobal?.NotiPopup }}
          ></div>
        </div>
        <div className={styles.foot}>
          <button
            className={`${styles.btn} ${styles.btn1}`}
            onClick={() => {
              setOpenModal(!openModal);
              localStorage.setItem("showNoti", JSON.stringify(false));
              notiShow.current = false;
            }}
          >
            Đóng và không hiện lại
          </button>
          <button
            className={`${styles.btn} ${styles.btn2}`}
            onClick={() => setOpenModal(!openModal)}
          >
            Đóng
          </button>
        </div>
        <div className={styles.contact}>
          <a href={`mailto:${dataGlobal?.NotiPopupEmail}`}>
            {dataGlobal?.NotiPopupEmail || dataGlobal?.EmailContact}
          </a>
          <span className="text-white">||</span>
          <a href={`tel:${dataGlobal?.Hotline}`}>{dataGlobal?.Hotline}</a>
        </div>
      </div>
    </Modal>
  );
};
