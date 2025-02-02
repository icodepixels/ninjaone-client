import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '@/styles/SvgIcon.css';
const SvgIcon = ({ name = '', className = '', width = 16, height = 16 }) => {
  const [svgContent, setSvgContent] = useState('');

  useEffect(() => {
    const loadSvg = async () => {
      if (!name) {
        console.warn('SVG name is required');
        return;
      }

      try {
        const response = await fetch(`/src/assets/svg/${name}.svg`);
        if (!response?.ok) {
          throw new Error(`HTTP error! status: ${response?.status}`);
        }
        const text = await response.text();
        setSvgContent(text || '');
      } catch (error) {
        console.error(`Failed to load SVG: ${name}`, error);
        setSvgContent(''); // Reset to empty string on error
      }
    };

    loadSvg();
  }, [name]);

  return (
    <div
      className={`${className || ''} svg-container`}
      style={{ width: width || 16, height: height || 16 }}
      dangerouslySetInnerHTML={{ __html: svgContent || '' }}
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
