import React, { useEffect, useState } from 'react';

const ScrollTopBtn = () => {
  const [showBtn, setShowBtn] = useState<boolean>(false);

  useEffect(() => {
    const handleShowBtn = () => {
      window.scrollY > 500 ? setShowBtn(true) : setShowBtn(false);
    };

    //Add EventListener
    window.addEventListener('scroll', handleShowBtn);
    //Clean up EventListener
    return () => {
      window.removeEventListener('scroll', handleShowBtn);
    };
  });

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return showBtn ? (
    <button
      className="btn btn-circle fixed right-[5%] bottom-[5%] z-50 bg-blue-900"
      onClick={scrollTop}
    >
      Top
    </button>
  ) : null;
};

export default ScrollTopBtn;
