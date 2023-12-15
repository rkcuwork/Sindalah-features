import React from 'react';

const Spinner: React.FC<{
  w?: number;
  h?: number;
  color?: string
}> = ({ w=16,h=16,color="white" }) => {
  console.log(w,h);
  return (
    // <div className="flex justify-center items-center h-screen">
      <div className={`animate-spin spinner border-t-2 border-${color} border-solid rounded-full w-${w} h-${h}`}></div>
    // </div>
  );
};

export default Spinner;


