import React from 'react';
import * as propTypes from "prop-types";

const CustomButton = ({children, onClick, isDark, isLink}) => {
   const style = {
      background: isDark ? '#007EEB' : '#F8F8F9',
      color: isDark ? '#fff' : '#23232D',
      border: !isDark && '1px solid #D1D1D7',
      padding: isLink ? '0' : '8px 20px'
   };

   return (
      <button style={style} className={`main-btn ${isDark ? 'main-btn-dark' : 'main-btn-light'}`} onClick={onClick}>
         {children}
      </button>
   )
};

CustomButton.propTypes = {
   onClick: propTypes.func,
   children: propTypes.oneOfType([
      propTypes.string,
      propTypes.element,
      propTypes.array
   ]),
};

export default CustomButton;
