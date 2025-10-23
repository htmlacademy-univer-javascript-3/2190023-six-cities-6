import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Offer } from '../mocks/offers';

type MapProps = {
  offers: Offer[];
  className?: string;
};

export const Map: React.FC<MapProps> = ({ offers, className = '' }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Инициализация карты
    if (!leafletMapRef.current) {
      leafletMapRef.current = L.map(mapRef.current, {
        center: [52.37454, 4.897976],
        zoom: 12,
        scrollWheelZoom: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(leafletMapRef.current);
    }

    // Удаление старых маркеров
    leafletMapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        leafletMapRef.current?.removeLayer(layer);
      }
    });

    // Добавление новых маркеров
    offers.forEach((offer) => {
      L.marker([offer.location.latitude, offer.location.longitude]).addTo(leafletMapRef.current!);
    });

    // Очистка карты при размонтировании (чтобы не было утечек памяти)
    return () => {
      leafletMapRef.current?.remove();
      leafletMapRef.current = null;
    };
  }, [offers]);

  return (
    <section
      ref={mapRef}
      className={`map ${className}`}
      style={{ height: '100%', width: '100%' }}
      id="cities__leaflet-map-wrapper"
    />
  );
};