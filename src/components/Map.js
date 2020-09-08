import * as React from 'react';
import { useRef, useLayoutEffect } from 'react';
import locationLogo from '../assets/icons/locationIcon.png';
import restaurantLogo from '../assets/icons/foodIcon.png';
import barLogo from '../assets/icons/bar.png';
import selectedRestaurant from '../assets/icons/selectedRestaurantIcon.png';
import selectedBar from '../assets/icons/selectedBarIcon.png';

const mapStyles = { height: '100%', width: '100%' };

export const DisplayMapFC = ({ userLat, userLong, nearbyRestaurantData }) => {
  const mapRef = useRef(null);
  const { H } = window;

  useLayoutEffect(() => {
    const moveToUserPos = map => {
      // Create an icon, an object holding the latitude and longitude, and a marker:
      const icon = new H.map.Icon(locationLogo);
      const coords = { lat: userLat, lng: userLong };
      const marker = new H.map.Marker(coords, { icon });

      // Add the marker to the map and center the map at the location of the marker:
      map.addObject(marker);
      map.setCenter(coords);
      map.setZoom(15);
    };

    if (!mapRef.current) return;

    const platform = new H.service.Platform({
      app_id: 'tR8yKut75MCVHwRHiJW0',
      apikey: 'dc1RY_WlQ10ByLgE_hZ2I-vqDRZBLgsRnf0PP4H5I18',
    });
    const defaultLayers = platform.createDefaultLayers();
    const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: userLat, lng: userLong },
      zoom: 16,
      pixelRatio: window.devicePixelRatio || 1,
    });

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));

    const ui = H.ui.UI.createDefault(hMap, defaultLayers);

    const markerInteraction = marker => {
      const markerReference = {
        barMarker: {
          id: 'barMarkerSelected',
          icon: selectedBar,
        },
        barMarkerSelected: {
          id: 'barMarker',
          icon: barLogo,
        },
        restaurantMarker: {
          id: 'restaurantMarkerSelected',
          icon: selectedRestaurant,
        },
        restaurantMarkerSelected: {
          id: 'restaurantMarker',
          icon: restaurantLogo,
        },
      };
      marker.addEventListener(
        'tap',
        e => {
          console.log(e.target);
          const newIcon = new H.map.Icon(markerReference[e.target.id].icon);
          marker.setIcon(newIcon);
          marker.id = markerReference[e.target.id].id;
        },
        false
      );
    };

    if (userLat && userLong) {
      moveToUserPos(hMap);
    }

    window.addEventListener('resize', () => hMap.getViewPort().resize());

    if (nearbyRestaurantData.length > 0) {
      const allRestaurants = nearbyRestaurantData.map(datapoint => {
        const isBar = datapoint?.types.includes('bar');
        const icon = new H.map.Icon(isBar ? barLogo : restaurantLogo);
        const marker = new H.map.Marker(datapoint?.location, { icon });
        if (isBar) {
          marker.id = 'barMarker';
        } else {
          marker.id = 'restaurantMarker';
        }
        hMap.addObject(marker);
        markerInteraction(marker);
      });
    }

    // This will act as a cleanup to run once this hook runs again.
    // This includes when the component un-mounts
    return () => {
      hMap.dispose();
    };
  }, [
    H.Map,
    H.map.Group,
    H.map.Icon,
    H.map.Marker,
    H.mapevents.Behavior,
    H.mapevents.MapEvents,
    H.service.Platform,
    H.ui.InfoBubble,
    H.ui.UI,
    mapRef,
    nearbyRestaurantData,
    userLat,
    userLong,
  ]); // This will run this hook every time this ref is updated

  return <div className="map" ref={mapRef} style={mapStyles} />;
};
