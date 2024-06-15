/* eslint-disable react/no-array-index-key */
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, Pagination, Zoom, Controller } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';
import 'swiper/css/pagination';
import './MySwiper.css';
import { useState } from 'react';
import productStore from '../../store/product-store';
import loadFailedImg from '../../assets/images/load_failed.webp';

export default function ProductSwiper() {
  const [thumbSwiper, setThumbSwiper] = useState<SwiperType | null>(null);
  return (
    <>
      <Swiper
        spaceBetween={16}
        navigation
        longSwipesMs={512}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          728: {
            spaceBetween: 8,
            pagination: false,
          },
        }}
        thumbs={{ swiper: thumbSwiper && !thumbSwiper.destroyed ? thumbSwiper : null }}
        modules={[FreeMode, Navigation, Thumbs, Zoom, Pagination, Controller]}
        className="mySwiper2"
        zoom
      >
        {productStore.product?.gallery && productStore.product.gallery.length > 0 ? (
          productStore.product?.gallery?.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="swiper-zoom-container">
                <img src={`data:image/png;base64,${img}`} alt={`${index}`} />
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <img src={loadFailedImg} alt="failed load resource" />
          </SwiperSlide>
        )}
      </Swiper>
      <Swiper
        spaceBetween={16}
        slidesPerView={4}
        freeMode
        watchSlidesProgress
        onSwiper={setThumbSwiper}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {productStore.product?.thumbs && productStore.product.thumbs.length > 0 ? (
          productStore.product?.thumbs?.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="swiper-zoom-container">
                <img src={`data:image/png;base64,${img}`} alt={`${index}`} />
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <img src={loadFailedImg} alt="failed load resource" />
          </SwiperSlide>
        )}
      </Swiper>
    </>
  );
}
