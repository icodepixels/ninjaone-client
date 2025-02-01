import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '@/styles/SvgIcon.css';
const SvgIcon = ({ name, className = '', width = 16, height = 16 }) => {
  const [svgContent, setSvgContent] = useState('');

  useEffect(() => {
    const loadSvg = async () => {
      try {
        // Dynamic import of SVG file
        const response = await fetch(`/src/assets/svg/${name}.svg`);
        const text = await response.text();
        setSvgContent(text);
      } catch (error) {
        console.error(`Failed to load SVG: ${name}`, error);
      }
    };

    loadSvg();
  }, [name]);

  return (
    <div
      className={`${className} svg-container`}
      style={{ width, height }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

SvgIcon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  variant: PropTypes.string,
};

export default SvgIcon;
