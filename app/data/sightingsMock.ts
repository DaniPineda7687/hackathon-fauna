// data/sightingsMock.ts
import type { FeatureCollection, Feature, Point } from 'geojson'

const CENTER: [number, number] = [-73.6921033, 3.9147878]

/**
 * Devuelve un FeatureCollection de Points con una propiedad `count`
 */
function generateMockData(
  count: number,
  center: [number, number],
  radiusKm: number
): FeatureCollection<Point, { count: number }> {
  const [lon, lat] = center

  const features: Feature<Point, { count: number }>[] = Array.from({ length: count }).map(
    () => {
      const angle = Math.random() * 2 * Math.PI
      const rDeg = (Math.random() * radiusKm) / 111
      const dx = (rDeg * Math.cos(angle)) / Math.cos((lat * Math.PI) / 180)
      const dy = rDeg * Math.sin(angle)

      const longitude = lon + dx
      const latitude = lat + dy
      const sightings = Math.ceil(Math.random() * 10)

      // ¡Fíjate que aquí indicamos literales exactas para `type`!
      const feature: Feature<Point, { count: number }> = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [longitude, latitude] as [number, number],
        },
        properties: { count: sightings },
      }

      return feature
    }
  )

  return {
    type: 'FeatureCollection',
    features,
  }
}

const mockSightings = generateMockData(200, CENTER, 5)
export default mockSightings