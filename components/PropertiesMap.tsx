'use client';

import { useEffect, useRef, useState } from 'react';
import type { Property } from '@/lib/properties';

declare global {
  interface Window {
    google: any;
    __aaMapReady?: boolean;
    __aaMapPromise?: Promise<void>;
  }
}

const KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

function loadMaps(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.google?.maps) return Promise.resolve();
  if (window.__aaMapPromise) return window.__aaMapPromise;
  window.__aaMapPromise = new Promise((resolve, reject) => {
    const cbName = '__aaMapInit_' + Math.random().toString(36).slice(2, 8);
    (window as any)[cbName] = () => { delete (window as any)[cbName]; resolve(); };
    const s = document.createElement('script');
    s.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(KEY)}&v=weekly&libraries=marker&loading=async&callback=${cbName}`;
    s.async = true;
    s.defer = true;
    s.onerror = () => { delete (window as any)[cbName]; reject(new Error('Maps failed to load')); };
    document.head.appendChild(s);
  });
  return window.__aaMapPromise;
}

function priceLabel(p: Property): string {
  const v = Number(p.price) || 0;
  const base = v >= 1e6 ? 'AED ' + (v / 1e6).toFixed(2).replace(/\.?0+$/, '') + 'M' : 'AED ' + Math.round(v / 1000) + 'K';
  if (p.offering_type !== 'RR') return base;
  return base + ((p.rental_period || 'yearly').toLowerCase() === 'monthly' ? '/mo' : '/yr');
}

function buildCard(p: Property): string {
  const img = p.photo?.url?.[0]?._ || '/images/placeholder.jpg';
  const type = (p.property_type || 'Property').replace(/\b\w/g, (c) => c.toUpperCase());
  const ref = p.reference_number || '';
  const href = ref ? `/property/${encodeURIComponent(ref)}` : '#';
  const beds = p.bedroom || 0;
  const sqft = Math.round(p.size || 0);
  const where = [p.sub_community, p.community].filter(Boolean).join(', ');
  const desc = `${beds === 0 ? 'Studio' : beds + ' BR'} ${type}${sqft ? ' · ' + sqft.toLocaleString() + ' sqft' : ''}${where ? ' · ' + where : ''}`;

  return `
    <a class="map-card" href="${href}" style="text-decoration:none;color:inherit;display:block;">
      <div class="map-card-img">
        <img src="${img.replace(/"/g, '&quot;')}" alt="${(p.title || 'Property').replace(/"/g, '&quot;')}" />
        <span class="map-card-pill">${type}</span>
      </div>
      <div class="map-card-body">
        <div class="map-card-title">${(p.title || 'Untitled property').replace(/</g, '&lt;')}</div>
        <div class="map-card-desc">${desc.replace(/</g, '&lt;')}</div>
        <div class="map-card-foot">
          <span class="map-card-price">${priceLabel(p)}</span>
          <span class="map-card-cta">View &rarr;</span>
        </div>
      </div>
    </a>`;
}

export default function PropertiesMap({ properties }: { properties: Property[] }) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInst = useRef<any>(null);
  const markers = useRef<any[]>([]);
  const infoWindow = useRef<any>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pinned = useRef<boolean>(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let cancelled = false;
    if (!KEY) return;
    const onGmError = (e: ErrorEvent) => {
      if (e.message && /Google Maps|maps\.googleapis/i.test(e.message)) {
        setError(e.message);
      }
    };
    window.addEventListener('error', onGmError);

    const isLight = typeof document !== 'undefined' && document.body.classList.contains('light');
    const darkStyles = [
      { elementType: 'geometry', stylers: [{ color: '#1a1a1f' }] },
      { elementType: 'labels.text.stroke', stylers: [{ color: '#1a1a1f' }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#a0a0aa' }] },
      { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0a0a0b' }] },
      { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#2a2a32' }] },
      { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#a0a0aa' }] },
      { featureType: 'poi', stylers: [{ visibility: 'off' }] },
      { featureType: 'transit', stylers: [{ visibility: 'off' }] },
    ];

    loadMaps().then(() => {
      if (cancelled || !mapRef.current || !window.google?.maps) return;
      mapInst.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: 25.0772, lng: 55.139 },
        zoom: 11,
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        clickableIcons: false,
        gestureHandling: 'greedy',
        styles: isLight ? [] : darkStyles,
      });

      mapInst.current.addListener('click', () => {
        pinned.current = false;
        if (infoWindow.current) infoWindow.current.close();
      });
      setReady(true);
    }).catch((e) => { console.warn('[map]', e); setError(String(e?.message || e)); });

    return () => { cancelled = true; window.removeEventListener('error', onGmError); };
  }, []);

  // Re-render markers when properties change
  useEffect(() => {
    if (!ready || !mapInst.current || !window.google?.maps) return;
    // Clear old markers
    markers.current.forEach((m) => m.setMap(null));
    markers.current = [];
    pinned.current = false;
    if (infoWindow.current) infoWindow.current.close();

    const bounds = new window.google.maps.LatLngBounds();

    properties.forEach((p) => {
      const lat = Number(p.lat) || 0;
      const lng = Number(p.lng) || 0;
      if (!lat || !lng) return;
      const pos = { lat, lng };
      const dotSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="11" r="8" fill="#c4f542" stroke="#0a0a0b" stroke-width="2"/></svg>`;
      const marker = new window.google.maps.Marker({
        position: pos,
        map: mapInst.current,
        title: p.title || '',
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(dotSvg),
          scaledSize: new window.google.maps.Size(22, 22),
          anchor: new window.google.maps.Point(11, 11),
        },
        optimized: false,
      });
      function open(p2: Property, isPinned: boolean) {
        if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
        if (infoWindow.current) infoWindow.current.close();
        infoWindow.current = new window.google.maps.InfoWindow({
          content: buildCard(p2),
          disableAutoPan: !isPinned,
          pixelOffset: new window.google.maps.Size(0, -6),
        });
        infoWindow.current.open(mapInst.current, marker);
        if (isPinned) pinned.current = true;
      }
      marker.addListener('mouseover', () => open(p, false));
      marker.addListener('mouseout', () => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        closeTimer.current = setTimeout(() => {
          if (pinned.current) return;
          if (infoWindow.current) infoWindow.current.close();
        }, 220);
      });
      marker.addListener('click', () => open(p, true));
      markers.current.push(marker);
      bounds.extend(pos);
    });

    if (markers.current.length > 0) {
      mapInst.current.fitBounds(bounds);
      if (markers.current.length === 1) mapInst.current.setZoom(14);
    }
  }, [ready, properties]);

  if (!KEY) {
    return (
      <div className="listing-map-wrap" style={{ display: 'grid', placeItems: 'center', padding: 24, textAlign: 'center', color: 'var(--text-3)' }}>
        Map unavailable — set <code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> in .env.local
      </div>
    );
  }

  return (
    <div className="listing-map-wrap">
      <div ref={mapRef} id="listingMap" />
      {error && (
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', padding: 16, textAlign: 'center', color: 'var(--text-3)', background: 'var(--bg-2)', fontSize: 12 }}>
          Map failed to load: {error}
          <br />
          <span style={{ color: 'var(--text-3)', fontSize: 11, marginTop: 8 }}>
            Check that <code>localhost:3001</code> is whitelisted in your Google Cloud key referrer restrictions.
          </span>
        </div>
      )}
    </div>
  );
}
