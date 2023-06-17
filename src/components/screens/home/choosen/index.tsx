import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./index.module.css";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const LeftSwiper = ({ data }) => {
  return (
    <Swiper
      autoplay
      speed={500}
      slidesPerView={1}
      spaceBetween={30}
      navigation={true}
      pagination={{
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
      }}
      modules={[Pagination, Navigation]}
      className={`mySwiper choosenSwiper ${styles.choosenSwiper}`}
    >
      {data?.map((item, index) => (
        <SwiperSlide key={`${item?.Code}--${index}`}>
          <div className={styles.boxSlider}>
            <div className={styles.logo}>
              <img src={item?.IMG} alt="" />
              <h3 className="secondTitle my-3">{item?.Name}</h3>
            </div>
            <div className="flex-1">
              <p className="mainDes  !text-[14px]">{item?.Description}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const RightSwiper = () => {
  return (
    <Swiper
      autoplay
      speed={1000}
      slidesPerView="auto"
      spaceBetween={40}
      centeredSlides={true}
      className={`mySwiper choosenSwiper ${styles.choosenSwiper}`}
    >
      <SwiperSlide>
        <img src="./why-choose1.png" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="./why-choose2.png" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="./benefits1.png" />
      </SwiperSlide>
    </Swiper>
  );
};

export const Choosen = ({ data }) => {
  return (
    <div className={styles.ChoosenWrapper}>
      <div className="container">
        <div className={styles.ChoosenInner}>
          <div className={styles.left}>
            <div className={styles.leftHead}>
              <h1>Tại sao bạn nên chọn chúng tôi</h1>
              {/* <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                eu ultrices cursus vitae, integer tellus aliquet pretium, dolor.
              </p> */}
            </div>
            <div className={`${styles.leftSwiper} leftSwiper`}>
              <LeftSwiper data={data} />
            </div>
          </div>
          <div className={styles.right}>
            <img src="./img-why-choose.png" alt="" />
            <div className={`${styles.rightSwiper} rightSwiper`}>
              <RightSwiper />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
