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
    <section id="testimonials" className="py-24 bg-[var(--bg-secondary)] overflow-hidden">
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
            className="testimonial-swiper !pb-16"
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.id} className="!w-full max-w-[450px]">
                <div className="glass p-8 md:p-12 rounded-[40px] border border-[var(--border)] relative group hover:border-primary transition-all duration-500 h-full flex flex-col">
                  {/* Quote Icon */}
                  <div className="absolute top-10 right-10 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500">
                    <Quote size={80} className="text-primary fill-primary" />
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-8">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={18} className="text-amber-500 fill-amber-500" />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-lg md:text-xl text-[var(--text-primary)] italic mb-10 leading-relaxed relative z-10">
                    "{item.text}"
                  </p>

                  {/* Author */}
                  <div className="mt-auto flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-primary/20">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{item.name}</h4>
                      <p className="text-sm text-[var(--text-muted)] font-medium">
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
          width: 12px;
          height: 12px;
          background: var(--primary);
          opacity: 0.3;
          transition: all 0.3s;
        }
        .testimonial-swiper .swiper-pagination-bullet-active {
          width: 30px;
          border-radius: 6px;
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
