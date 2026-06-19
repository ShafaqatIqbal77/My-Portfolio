import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules';
import { Quote, Star } from 'lucide-react';
import { testimonials } from '../../data/testimonials';
import SectionHeading from '../ui/SectionHeading';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-[var(--bg-secondary)] overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionHeading 
          subtitle="Testimonials"
          title="What Clients Say"
          description="Feedback from colleagues and clients I've worked with on various projects."
          center
        />

        <div className="max-w-6xl mx-auto">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination, EffectCoverflow]}
            className="testimonial-swiper !pb-12 sm:!pb-16"
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.id} className="!w-full sm:!w-[400px] md:!w-[450px]">
                <div className="glass p-6 sm:p-8 md:p-12 rounded-[30px] sm:rounded-[40px] border border-[var(--border)] relative group hover:border-primary transition-all duration-500 h-full flex flex-col mx-2 sm:mx-0">
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 sm:top-10 sm:right-10 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500">
                    <Quote size={60} className="sm:w-20 sm:h-20 text-primary fill-primary" />
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-6 sm:mb-8">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={16} className="sm:w-[18px] sm:h-[18px] text-amber-500 fill-amber-500" />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-base sm:text-lg md:text-xl text-[var(--text-primary)] italic mb-8 sm:mb-10 leading-relaxed relative z-10">
                    "{item.text}"
                  </p>

                  {/* Author */}
                  <div className="mt-auto flex items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-primary/20 shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-base sm:text-lg truncate">{item.name}</h4>
                      <p className="text-xs sm:text-sm text-[var(--text-muted)] font-medium truncate">
                        {item.position} @ <span className="text-primary">{item.company}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      
      <style>{`
        .testimonial-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: var(--primary);
          opacity: 0.3;
          transition: all 0.3s;
        }
        @media (min-width: 640px) {
          .testimonial-swiper .swiper-pagination-bullet {
            width: 12px;
            height: 12px;
          }
        }
        .testimonial-swiper .swiper-pagination-bullet-active {
          width: 20px;
          border-radius: 6px;
          opacity: 1;
        }
        @media (min-width: 640px) {
          .testimonial-swiper .swiper-pagination-bullet-active {
            width: 30px;
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
