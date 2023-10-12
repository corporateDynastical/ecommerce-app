"use client"

import { Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import Image from 'next/image';

const SwiperImage = [
    {
        src: '/offer02.jpg',
    },
    {
        src: '/offer01.jpg',
    },
    {
        src: '/offer03.jpg',
    },
]

const Carousel = () => {
    return (
        <>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectCoverflow]}
                effect='coverflow'
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false
                }}
                speed={1200}
                pagination={{ clickable: true }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {SwiperImage.map((item, index) => (
                    <SwiperSlide>
                        <div className='w-[100vw] h-[60vh] sm:h-[85vh] relative'>
                            <Image src={item.src} alt='offer-image' fill />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export default Carousel