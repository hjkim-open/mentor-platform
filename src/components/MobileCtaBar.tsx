import { useEffect, useRef, useState } from 'react';

export default function MobileCtaBar() {
  const [show, setShow] = useState(false);
  const scrolledPastRef = useRef(false);
  const contactVisibleRef = useRef(false);

  useEffect(() => {
    function updateShow() {
      setShow(scrolledPastRef.current && !contactVisibleRef.current);
    }

    const onScroll = () => {
      scrolledPastRef.current = window.scrollY > window.innerHeight * 0.8;
      updateShow();
    };

    const contactEl = document.getElementById('contact');
    const observer = contactEl
      ? new IntersectionObserver(
          ([entry]) => {
            contactVisibleRef.current = entry.isIntersecting;
            updateShow();
          },
          { threshold: 0.1 }
        )
      : null;

    if (contactEl && observer) observer.observe(contactEl);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer?.disconnect();
    };
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-transform duration-300 ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <a
        href="#contact"
        className="block w-full bg-green-500 hover:bg-indigo-500 text-white text-center font-semibold text-base py-4 transition-colors"
      >
        코칭멘토 매칭 신청하기
      </a>
    </div>
  );
}
