import { useState, useEffect } from 'react';
import { UpOutlined } from '@ant-design/icons';
import { Button } from 'antd';

function scrollToTop() {
  document.documentElement.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

type Props = {
  scrollToVisible?: number;
};

export default function ScrollUpButton({ scrollToVisible = 1280 }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY >= scrollToVisible) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <Button
      icon={<UpOutlined />}
      style={{
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
        zIndex: 3,
        display: isVisible ? 'inline-block' : 'none',
      }}
      onClick={scrollToTop}
    />
  );
}
