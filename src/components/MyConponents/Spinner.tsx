import React from 'react';

const Spinner: React.FC<{
  w?: number;
  h?: number;
}> = ({ w=16,h=16 }) => {
  return (
    <div className="flex items-center justify-center">
      <img src="assets/icons/loader.svg" alt="loader" className={`w-${w} h-${h} rounded-full mb-4`} />
    </div>
  );
};

export default Spinner;


