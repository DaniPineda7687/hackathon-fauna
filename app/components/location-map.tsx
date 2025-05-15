// components/LocationMap.tsx
"use client";

import { useRef, useEffect, JSX } from "react";
import mapboxgl, { Map, Marker } from "mapbox-gl";
import { Button } from "@/components/ui/button";

export default function LocationMap(): JSX.Element {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  const markerRef = useRef<Marker | null>(null);

  useEffect(() => {
    const container = mapContainer.current;
    if (!container) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

    const map = new mapboxgl.Map({
      container,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.1139695, 4.5480881],
      zoom: 2,
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  const handleLocate = (): void => {
    if (!navigator.geolocation || !mapRef.current) {
      alert("Tu navegador no soporta geolocalización.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;
        // Centrar mapa en la ubicación del usuario
        mapRef.current!.flyTo({ center: [longitude, latitude], zoom: 14 });

        // Eliminar marcador anterior si existe
        if (markerRef.current) {
          markerRef.current.remove();
        }

        // Crear y añadir nuevo marcador
        markerRef.current = new mapboxgl.Marker({ color: "red" })
          .setLngLat([longitude, latitude])
          .addTo(mapRef.current!);
      },
      (err) => {
        let msg = "";
        switch (err.code) {
          case err.PERMISSION_DENIED:
            msg = "Permiso denegado para acceder a la ubicación.";
            break;
          case err.POSITION_UNAVAILABLE:
            msg =
              "No se pudo determinar tu posición. Intenta moverte a un lugar con mejor cobertura.";
            break;
          case err.TIMEOUT:
            msg = "La petición tardó demasiado. Intenta de nuevo.";
            break;
          default:
            msg = "Error desconocido al obtener la ubicación.";
        }
        console.log(msg);
      },
      { enableHighAccuracy: true, timeout: 10_000, maximumAge: 0 }
    );
  };

  return (
    <div>
      <div
        ref={mapContainer}
        style={{ width: "100%", height: "300px", borderRadius: "8px" }}
      />
      <div className="mt-4 flex justify-center">
        <Button onClick={handleLocate}>Ubicación actual</Button>
      </div>
    </div>
  );
}
