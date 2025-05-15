'use client'    // necesario si estás usando el App Router; si usas Pages Router puedes omitirlo

import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'

export default function Map({ longitude = -74, latitude = 4, zoom = 10, style = 'mapbox://styles/mapbox/streets-v11' }) {
  const mapContainer = useRef(null)

  useEffect(() => {
    if (!mapContainer.current) return

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style,
      center: [longitude, latitude],
      zoom,
    })

    return () => map.remove()
  }, [longitude, latitude, zoom, style])

  return (
    <div
      ref={mapContainer}
      style={{ width: '100%', height: '100vh', borderRadius: '8px', overflow: 'hidden' }}
    />
  )
}