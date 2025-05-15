'use client'

import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import mockSightings from '../data/sightingsMock'

export default function Map({
  longitude = -73.6921033,
  latitude = 3.9147878,
  zoom = 12,
  style = 'mapbox://styles/mapbox/streets-v11',
}) {
  const mapContainer = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!mapContainer.current) return
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style,
      center: [longitude, latitude],
      zoom,
    })

    map.on('load', () => {
      // 1) Fuente GeoJSON
      map.addSource('sightings', {
        type: 'geojson',
        data: mockSightings,
      })

      // 2) Capa de heatmap
      map.addLayer({
        id: 'sightings-heat',
        type: 'heatmap',
        source: 'sightings',
        maxzoom: 15,
        paint: {
          'heatmap-weight': [
            'interpolate',
            ['linear'],
            ['get', 'count'],
            0, 0,
            10, 1,
          ],
          'heatmap-intensity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0, 1,
            15, 3,
          ],
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, 'rgba(0, 0, 255, 0)',
            0.2, 'royalblue',
            0.4, 'cyan',
            0.6, 'lime',
            0.8, 'yellow',
            1, 'red',
          ],
          'heatmap-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0, 2,
            15, 20,
          ],
          'heatmap-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            7, 1,
            15, 0,
          ],
        },
      })

      // 3) Puntos circulares al hacer zoom
      map.addLayer({
        id: 'sightings-point',
        type: 'circle',
        source: 'sightings',
        minzoom: 14,
        paint: {
          'circle-radius': 4,
          'circle-color': [
            'interpolate',
            ['linear'],
            ['get', 'count'],
            1, 'blue',
            5, 'cyan',
            10, 'red',
          ],
          'circle-stroke-color': 'white',
          'circle-stroke-width': 1,
        },
      })
    })

    return () => {
      map.remove()
    }
  }, [longitude, latitude, zoom, style])

  return (
    <div
      ref={mapContainer}
      style={{
        width: '100%',
        height: '100dvh',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    />
  )
}