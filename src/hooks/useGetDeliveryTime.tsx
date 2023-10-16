import {useEstimateDeliveryTime} from '@api/location';
import {useUserStore} from '@store/UserStore';
import {useEffect, useState} from 'react';

interface IUseGetDeliveryTime {
  latitude: string;
  longitude: string;
}

const useGetDeliveryTime = () => {
  const [currentLocation] = useUserStore(state => [state.user.currentLocation]);
  const {mutate, isLoading} = useEstimateDeliveryTime();
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleGetDeliveryTime = () => {
    if (currentLocation) {
      const parsedCurrentLocation = JSON.parse(currentLocation);
      return mutate(
        {
          shippingAddress: {
            latitude: parsedCurrentLocation?.latitude,
            longitude: parsedCurrentLocation?.longitude,
          },
        },
        {
          onSuccess: data => {
            const {delivery} = data?.data;
            setDistance(delivery?.distance);
            setDuration(delivery?.duration);
          },
        },
      );
    }
  };

  useEffect(() => {
    return handleGetDeliveryTime();
  }, [currentLocation]);
  return {
    duration,
    distance,
    isLoading,
  };
};

export default useGetDeliveryTime;
