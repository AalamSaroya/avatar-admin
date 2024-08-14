import { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet'
import L from 'leaflet'

// COMPONENT: LOCATE CONTROL
const LocateControl = ({ setCenter }) => {
  const map = useMap()

  useEffect(() => {
    map.locate({ setView: true, maxZoom: 16 })

    map.on('locationfound', (e) => {
      setCenter(e.latlng)
      map.setView(e.latlng, 14)
    })

    map.on('locationerror', (e) => {
      alert('Location access denied.')
    })
  }, [map, setCenter])

  return null
}

// COMPONENT: LOCATE AVATARS
const LocateAvatars = () => {
  const [center, setCenter] = useState([51.505, -0.09]) // Default center (London)
  const radius = 1000 // Radius of the circle (in meters) in which avatars will be shown

  const markers = [
    { id: 1, position: [51.505, -0.09], text: 'Marker 1' },
    { id: 2, position: [51.51, -0.1], text: 'Marker 2' },
    { id: 3, position: [51.51, -0.12], text: 'Marker 3' },
    { id: 4, position: [51.515, -0.07], text: 'Marker 4' }, // This marker is outside the defined bounds
  ]

  const isMarkerWithinRadius = (position, center, radius) => {
    const distance = L.latLng(position).distanceTo(L.latLng(center))
    return distance <= radius
  }

  const filteredMarkers = markers.filter((marker) =>
    isMarkerWithinRadius(marker.position, center, radius),
  )
  const circleOptions = { color: 'red', weight: 2 }

  return (
    <MapContainer center={center} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocateControl setCenter={setCenter} />
      <Circle center={center} radius={radius} pathOptions={circleOptions} />
      {filteredMarkers.map((marker, idx) => (
        <Marker key={idx} position={marker.position}>
          <Popup>{marker.text}</Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default LocateAvatars
