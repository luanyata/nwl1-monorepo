import React, { useCallback, useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from '../Marker';

interface IPosition {
  lat: number;
  lng: number;
}

interface IProps {
  position: { lat: number; lng: number };
  setPosition({ lat, lng }: { lat: number; lng: number }): void;
}

const Maps: React.FC<IProps> = ({ position, setPosition }: IProps) => {
  const [initialPosition, setInitialPosition] = useState<IPosition>({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(location => {
      const { latitude, longitude } = location.coords;
      setInitialPosition({ lat: latitude, lng: longitude });
    });
  }, []);

  const onChildClick = useCallback(
    ({ lat, lng }: IPosition) => {
      setPosition({ lat, lng });
    },
    [setPosition],
  );

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_KEY || '' }}
      center={{
        lat: initialPosition.lat,
        lng: initialPosition.lng,
      }}
      onClick={onChildClick}
      defaultZoom={15}
    >
      <Marker lat={position.lat} lng={position.lng} />
    </GoogleMapReact>
  );
};

export default Maps;
