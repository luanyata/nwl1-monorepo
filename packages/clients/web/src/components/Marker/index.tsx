import React from 'react';
import { MdBeenhere } from 'react-icons/md';

interface IPoint {
  description?: string;
  lat: number;
  lng: number;
}

const Marker: React.FC<IPoint> = ({ description }: IPoint) => {
  return (
    <MdBeenhere
      size={30}
      style={{
        position: 'absolute',
        transform: 'translate(-50%, -100%)',
        color: '#6AD7A2',
      }}
      name={description}
    />
  );
};

export default Marker;
