import * as React from 'react';
import { useRef, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import locationLogo from '../assets/icons/locationIcon.png';
import restaurantLogo from '../assets/icons/foodIcon.png';
import barLogo from '../assets/icons/bar.png';
import selectedRestaurantLogo from '../assets/icons/selectedRestaurantIcon.png';
import selectedBar from '../assets/icons/selectedBarIcon.png';

const mapStyles = { height: '100%', width: '100%' };

const DisplayMapFC = ({ dispatch, nearbyRestaurantData, userLocation }) => {
  const { latitude: userLat, longitude: userLong } = userLocation;
  const mapRef = useRef(null);
  const { H } = window;

  function removeOtherSelectedIcons(element) {
    const { id } = element;
    const regex = /Selected/g;
    return id.replace(regex, '');
  }

  useLayoutEffect(() => {
    const moveToUserPos = map => {
      // Create an icon, an object holding the latitude and longitude, and a marker:
      const icon = new H.map.Icon(locationLogo);
      const coords = { lat: userLat, lng: userLong };
      const userPos = new H.map.Marker(coords, { icon });
      userPos.id = 'userPosition';

      // Add the marker to the map and center the map at the location of the marker:
      map.addObject(userPos);
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
          icon: selectedRestaurantLogo,
        },
        restaurantMarkerSelected: {
          id: 'restaurantMarker',
          icon: restaurantLogo,
        },
      };
      marker.addEventListener(
        'tap',
        e => {
          const newIcon = new H.map.Icon(markerReference[e.target.id].icon);
          marker.setIcon(newIcon);
          marker.id = markerReference[e.target.id].id;
          const mapObjects = hMap.getObjects();
          dispatch({
            type: 'SET_SELECTED_RESTSURANT',
            payload: nearbyRestaurantData[e.target.Di],
          });

          const userPositionMarker = mapObjects.find(
            mark => mark.id === 'userPosition'
          );

          const distance = e.target.b.distance(userPositionMarker.b);

          dispatch({
            type: 'SET_DISTANCE',
            payload: `${Math.floor(distance) / 100}km`,
          });

          const found = mapObjects.find(el => {
            const isSelected =
              el.id === 'restaurantMarkerSelected' ||
              el.id === 'barMarkerSelected';
            if (el.icon.uid !== e.target.icon.uid && isSelected) {
              return el;
            }
          });
          if (found) {
            const foundIcon = new H.map.Icon(markerReference[found.id].icon);
            found.setIcon(foundIcon);
            found.id = removeOtherSelectedIcons(found);
          }
        },
        false
      );
    };

    if (userLat && userLong) {
      moveToUserPos(hMap);
    }

    window.addEventListener('resize', () => hMap.getViewPort().resize());

    if (nearbyRestaurantData.length > 0) {
      nearbyRestaurantData.map(datapoint => {
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
    dispatch,
    mapRef,
    nearbyRestaurantData,
    userLat,
    userLong,
  ]); // This will run this hook every time this ref is updated

  return <div className="map" ref={mapRef} style={mapStyles} />;
};

const mapStateToProps = state => ({
  nearbyRestaurantData: state.nearbyRestaurantData,
  userLocation: state.userLocation,
});

export default connect(mapStateToProps)(DisplayMapFC);
