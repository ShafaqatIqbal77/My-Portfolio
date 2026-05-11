import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const TypingEffect = ({ strings }) => {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: strings,
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      cursorChar: '|',
    });

    return () => {
      typed.destroy();
    };
  }, [strings]);

  return <span ref={el} className="text-primary" />;
};

export default TypingEffect;
