// src/pages/Home.js
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import SearchIcon from '@mui/icons-material/Search';
import { EffectFade, Scrollbar, Pagination, Keyboard, Autoplay } from 'swiper/modules';
import './stayle.css'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';
import Card1 from '../../components/card1/card1'; // Adjust the path if needed

export default function Home() {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    const encodedCategory = encodeURIComponent(category);
    navigate(`/products?categori1=${encodedCategory}`);
    console.log('Category clicked:', category);
  };

  return (
    <div>
      {/* Swiper component visible only on larger screens */}
      <div className="lg:block hidden mt-[-245px] w-[99%]">
        <Swiper
          spaceBetween={30}
          direction="vertical"
          effect="fade"
          scrollbar={{ draggable: true }}
          autoplay={{ delay: 6000 }}
          modules={[EffectFade, Scrollbar, Pagination, Keyboard, Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src="https://img04.rl0.ru/afisha/1064x1064i/s2.afisha.ru/mediastorage/31/46/51ce1f9487004b19b68f63124631.jpg" alt="Nature 1" />
            <div className="overlay-top"></div>
            <div className="overlay-bottom"></div>
            <div className="slide-content">
              <h1 className="font-bold">Там, где вкусно, тепло и уютно</h1>
              <button className="slide-btn" onClick={() => handleCategoryClick('Рестораны')}>
                <SearchIcon /> Рестораны
              </button>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://riavrn.ru/media/archive/image/2022/07/C1kcq1dk1qOAbv9buPwmzy1WRpzY3NI4.jpg" alt="Nature 2" />
            <div className="overlay-top"></div>
            <div className="overlay-bottom"></div>
            <div className="slide-content">
              <h1 className="font-bold">Позволь себе больше стиля</h1>
              <button className="slide-btn" onClick={() => handleCategoryClick('Одежда и обувь')}>
                <SearchIcon /> Одежда и обувь
              </button>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://tochkafamily.ru/sites/default/files/tochkapfull/styles/point_slide_2020/public/1_0.jpeg.webp?itok=yk53fsyi" alt="" />
            <div className="overlay-top"></div>
            <div className="overlay-bottom"></div>
            <div className="slide-content">
              <h1 className="font-bold">Совершенство доступно</h1>
              <button className="slide-btn" onClick={() => handleCategoryClick('Салоны красоты')}>
                <SearchIcon /> Салоны красоты
              </button>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://p0.zoon.ru/preview/cK_V9Uf8iAemRceekq-aTQ/640x427x85/1/9/a/original_53f6a6e840c0882c3b8b4592_6171e2cad49fb.jpg" alt="Nature 4" />
            <div className="overlay-top"></div>
            <div className="overlay-bottom"></div>
            <div className="slide-content">
              <h1 className="font-bold">Подарит детям радость знаний</h1>
              <button className="slide-btn" onClick={() => handleCategoryClick('Дошкольное образование')}>
                <SearchIcon /> Дошкольное образование
              </button>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Card section, visible on all screen sizes */}
      <div className='w-[60%] m-auto mt-[400px] mr-[360px] mb-[400px] grid grid-cols-6 sm:grid-cols-2 lg:grid-cols-3 gap-28'>
        <Card1
          onClick={() => handleCategoryClick('Рестораны')}
          img="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRhzpnokPrJ2L020rTh3koJESxFBj79HYnuWAq0qTT4kgn-F-IV"
          h1="Поесть"
        />
        <Card1
          onClick={() => handleCategoryClick('Магазины')}
          img="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQs9F_hdrOLfhPxdFm4d0qXxceUMO9p97CVCKsMBBnk_wzDsqoV"
          h1="Магазины"
        />
        <Card1
          onClick={() => handleCategoryClick('Красота и СПА')}
          img="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQZlKnLdx8xKv5Q6-AsZuAsbFw6Qu6zFrK3pxYU63Ua12OjlTR-"
          h1="Красота и СПА"
        />
        <Card1
          onClick={() => handleCategoryClick('Развлечения')}
          img="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRaoi8u6QLZGS0mr4vbx55cQJk5Bl7LFW7ByOkwVX07fhj26D_i"
          h1="Развлечения"
        />
        <Card1
          onClick={() => handleCategoryClick('Для детей')}
          img="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRe6LgQkgNAzfhc0n_SnPnVPmm11A3QyZMOZZD_8DCUAcEIBXeJ"
          h1="Для детей"
        />
        <Card1
          onClick={() => handleCategoryClick('Услуги')}
          img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScPN0B-pc0M5yuI2lQd7c90SbivL8Akt90R2YJCYTwrCUuOQCI"
          h1="Услуги"
        />
      </div>
    </div>
  );
}
