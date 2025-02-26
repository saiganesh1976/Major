import React, { useEffect, useRef, useState } from 'react';
import './NearestRationShops.css';

const NearestRationShops = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
        script.async = true;
        script.onload = initializeMap;
        document.body.appendChild(script);
      } else {
        initializeMap();
      }
    };

    const initializeMap = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        const mapInstance = new window.google.maps.Map(mapRef.current, {
          center: userLocation,
          zoom: 14,
        });

        setMap(mapInstance);

        const service = new window.google.maps.places.PlacesService(mapInstance);
        service.nearbySearch(
          {
            location: userLocation,
            radius: 5000,
            type: ['grocery_or_supermarket'], // Closest category to ration shops
            keyword: 'PDS shop'
          },
          (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              setShops(results);
              results.forEach((shop) => {
                new window.google.maps.Marker({
                  position: shop.geometry.location,
                  map: mapInstance,
                  title: shop.name,
                });
              });
            }
          }
        );
      });
    };

    loadGoogleMaps();
  }, []);

  return (
    <div className="NearestRationShops">
      <h1>Nearest Ration Shops</h1>
      <div ref={mapRef} className="map" />
    </div>
  );
};

export default NearestRationShops;
