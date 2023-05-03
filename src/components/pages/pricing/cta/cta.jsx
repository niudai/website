'use client';

import { Alignment, Fit, Layout, useRive } from '@rive-app/react-canvas';
import Image from 'next/image';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import Button from 'components/shared/button';
import Container from 'components/shared/container';
import Heading from 'components/shared/heading';
import links from 'constants/links';
import lines from 'images/pages/pricing/green-lines-small.svg';

const CTA = () => {
  const [contentRef, isContentInView] = useInView({ rootMargin: '50px 0px', triggerOnce: true });
  const {
    rive,
    RiveComponent,
    setContainerRef: setRiveRef,
  } = useRive({
    src: '/animations/pages/pricing/flip-numbers.riv',
    autoplay: false,
    stateMachines: 'SM',
    layout: new Layout({
      fit: Fit.FitWidth,
      alignment: Alignment.Center,
    }),
    onLoad: () => {
      rive?.resizeDrawingSurfaceToCanvas();
    },
  });

  useEffect(() => {
    if (rive && isContentInView) {
      rive.play();
    }
  }, [rive, isContentInView]);

  return (
    <section className="safe-paddings pt-16">
      <Container className="grid grid-cols-12 items-center gap-4" size="md">
        <div className="z-10 col-span-4 col-start-2 mb-24 xl:col-span-5 xl:col-start-1 lg:mb-8 md:col-span-full">
          <Heading className="whitespace-nowrap md:text-center" tag="h2" size="2sm">
            Still have a <span className="text-pricing-primary-1">question?</span>
          </Heading>
          <p className="mt-4 text-lg font-light leading-snug xl:text-base md:mx-auto md:max-w-[570px] md:text-center">
            Interested in increasing your free tier limits or learning about pricing? Complete the
            form below to get in touch with our Sales team
          </p>
          <p className="relative mt-8 inline-flex justify-center md:mx-auto md:mt-6 md:flex md:w-44">
            <Button
              className="relative z-20 !py-5 !px-14 !text-lg tracking-tight"
              theme="primary"
              to={links.contactSales}
              size="sm"
            >
              Talk to sales
            </Button>
            <img
              className="pointer-events-none absolute -top-7 left-1/2 z-10 min-w-[130%] -translate-x-1/2"
              src={lines}
              width={267}
              height={140}
              alt=""
            />
          </p>
        </div>
        <div className="relative col-span-7 col-start-6 md:col-span-full" ref={contentRef}>
          <Image
            className="mx-auto min-h-[345px] md:min-h-0"
            src="/images/pages/pricing/cta.jpg"
            width={842}
            height={538}
            alt=""
          />
          <div ref={setRiveRef}>
            {isContentInView ? (
              <RiveComponent
                className="absolute top-[184px] left-1/2 h-[140px] w-[89px] -translate-x-1/2 2xl:top-[142px] 2xl:h-[140px] 2xl:w-[74px] xl:top-[124px] xl:h-[78px] xl:w-[58px] md:hidden"
                width={74}
                height={140}
                aria-hidden
              />
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CTA;
