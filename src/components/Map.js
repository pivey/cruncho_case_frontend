import * as React from 'react';
import { useRef, useLayoutEffect } from 'react';
import locationLogo from '../assets/icons/locationIcon.png';

export const DisplayMapFC = ({ userLat, userLong }) => {
  // // Create a reference to the HTML element we want to put the map on
  const mapRef = useRef(null);

  useLayoutEffect(() => {
    const { H } = window;
    const moveToUserPos = map => {
      // Create an icon, an object holding the latitude and longitude, and a marker:
      const icon = new H.map.Icon(locationLogo);
      const coords = { lat: userLat, lng: userLong };
      const marker = new H.map.Marker(coords, { icon });

      // Add the marker to the map and center the map at the location of the marker:
      map.addObject(marker);
      map.setCenter(coords);
      map.setCenter({ lat: userLat, lng: userLong });
      map.setZoom(14);
    };

    // `mapRef.current` will be `undefined` when this hook first runs; edge case that
    if (!mapRef.current) return;

    const platform = new H.service.Platform({
      apikey: 'dc1RY_WlQ10ByLgE_hZ2I-vqDRZBLgsRnf0PP4H5I18',
    });
    const defaultLayers = platform.createDefaultLayers();
    const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: 50, lng: 5 },
      zoom: 6,
      pixelRatio: window.devicePixelRatio || 1,
    });

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));

    const ui = H.ui.UI.createDefault(hMap, defaultLayers);

    if (userLat && userLong) {
      moveToUserPos(hMap);
    }

    window.addEventListener('resize', () => hMap.getViewPort().resize());

    // This will act as a cleanup to run once this hook runs again.
    // This includes when the component un-mounts
    return () => {
      hMap.dispose();
    };
  }, [mapRef, userLat, userLong]); // This will run this hook every time this ref is updated

  return (
    <div
      className="map"
      ref={mapRef}
      style={{ height: '100%', width: '100%' }}
    />
  );
};
