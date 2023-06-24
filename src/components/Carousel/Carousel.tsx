'use client'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'

export default function Carousel(){
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div className="w-full">
      <Slider {...settings}>
        <div>
          <img src="https://bkdelivery.co.id/media/slider_image/2023/6/22/2e4he5ucwuax66ccggfyca.jpg" alt="bk-promo" loading="lazy"/>
        </div>
        <div>
          <img src="https://bkdelivery.co.id/media/slider_image/2023/3/17/qynkz9qeqbjjlvaoh4afgz.jpg" alt="bk-promo" loading="lazy"/>
        </div>
        <div>
          <img src="https://bkdelivery.co.id/media/slider_image/2023/5/15/8wjfofeq3vtqmpshlrw3h2.jpg" alt="bk=promo" loading="lazy"/>
        </div>
        <div>
          <img src="https://bkdelivery.co.id/media/slider_image/2023/4/11/thdwthzgzwu7notfqr5xnc.jpg" alt="bk-promo" loading="lazy" />
        </div>
      </Slider>
    </div>
  );
}