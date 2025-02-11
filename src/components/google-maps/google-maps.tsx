import { useState } from 'react';

import { GMAP_API_KEY } from '@/config/env';
import { GoogleMap, Libraries, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import { Button, Row, Space, Spin, notification } from 'antd';
import { useTranslation } from 'react-i18next';

import { FormField } from '../forms/form-field/form-field';

const gmapDefaultCenter = { lat: -6.914744, lng: 107.609810 };
const gmapDefaultZoom = 12;
const gmapLibraries: Libraries = ['core', 'geocoding', 'marker'];
const containerStyle = { width: '100%', height: '400px' };

type PositionType = { lat: number, lng: number };

interface GoogleMapsProps {
  initialQuery?: string | PositionType
  //
  isEditable: boolean;
  onSubmit?: (value: any) => void;
  onCancel?: () => void;
}

export const GoogleMaps = (props: GoogleMapsProps) => {
  const { isEditable } = props;

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GMAP_API_KEY,
    libraries: gmapLibraries
  });
  const [notificationAPI, contextHolder] = notification.useNotification();
  const { t } = useTranslation();

  const [map, setMap] = useState<any>();
  const [geo, setGeo] = useState<google.maps.Geocoder>();
  const [pos, setPos] = useState<any>();
  const [reverseGeoData, setReverseGeoData] = useState<any>(null);
  const [search, setSearch] = useState<string>();

  function mapLoadInitialQuery(geoRef: google.maps.Geocoder, mapRef: google.maps.Map, initialQuery: string | PositionType | undefined) {
    if (!initialQuery) return;

    let payload: google.maps.GeocoderRequest = {};

    if (typeof initialQuery === 'string') {
      payload = { address: initialQuery, componentRestrictions: { country: 'ID' } };
    }
    else {
      payload = { location: initialQuery };
    }

    geoRef
      ?.geocode(payload)
      ?.then(({ results }) => {
        const res = results?.[0];
        // if (res && res?.geometry?.location_type !== 'APPROXIMATE') {
        if (res) {
          setPos(res.geometry.location);
          mapRef?.panTo(res.geometry.location);
          setReverseGeoData(res);
        }
      });
  }

  function onLoad(nMap: google.maps.Map) {
    const nGeo = new window.google.maps.Geocoder();
    setMap(nMap);
    setGeo(nGeo);

    mapLoadInitialQuery(nGeo, nMap, props?.initialQuery);
  }

  function onUnmount() {
    console.log('Component unmounting...');
    setMap(undefined);
    setGeo(undefined);
  }

  function onPinMovement(e: google.maps.MapMouseEvent) {
    if (isEditable) {
      const newPos = e.latLng;
      setPos(newPos);
      map?.panTo(newPos);

      geo
        ?.geocode({ location: newPos })
        ?.then(({ results }) => {
          if (results?.[0]) {
            setReverseGeoData(results?.[0]);
          }
        });
    }
  }

  function onSubmitForm() {
    if (reverseGeoData) {
      props?.onSubmit && props?.onSubmit(reverseGeoData);
    }
    else {
      // TODO:i18n no pin error
      notificationAPI['error']({
        message: t('gmaps:no_pin.message'),
        description: t('gmaps:no_pin.description'),
      });
    }
  }

  function searchByText(query: string) {
    try {
      geo
        ?.geocode({ address: query, componentRestrictions: { country: 'ID' } })
        ?.then(({ results }) => {
          if (results?.[0]) {
            if (results?.[0]?.geometry?.location_type === 'APPROXIMATE') {
              notification.warning({
                message: t('gmaps:approximate.message'),
                description: t('gmaps:approximate.description'),
              });
            }
            const res = results[0];
            setPos(res.geometry.location);
            map?.panTo(res.geometry.location);
            setReverseGeoData(res);
          } else {
            notification.error({
              message: t('gmaps:not_found.message'),
              description: t('gmaps:not_found.description'),
            });
          }
        });
    } catch (e) {
      console.error(e);
    }
  }

  function renderMap(isLibLoaded: boolean) {
    if (isLibLoaded) {
      return (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={gmapDefaultCenter}
          zoom={gmapDefaultZoom}
          onClick={onPinMovement}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <MarkerF
            position={pos}
            onDragEnd={onPinMovement}
            draggable={isEditable}
          />
        </GoogleMap>
      );
    } else {
      return (
        <div style={containerStyle}>
          <Spin />
        </div>
      );
    }
  }

  return (
    <div>
      {contextHolder}
      {
        isEditable && (
          <FormField
            id="search"
            name='search'
            component='search'
            style={{ width: '85%' }}
            componentProps={{
              value: search,
              onChange: (e) => { setSearch(e.target.value); },
              onSearch: (e) => { searchByText(e); },
            }}
          />
        )
      }
      {renderMap(isLoaded)}
      {
        isEditable && (
          <Row justify='center' style={{ marginTop: '.5rem' }}>
            <Space>
              <Button onClick={props?.onCancel} type='primary' danger> Batalkan </Button>
              <Button
                onClick={() => onSubmitForm()}
                type='primary'
                title='Primary'
              > Simpan </Button>
            </Space>
          </Row>
        )
      }
    </div>
  );
};