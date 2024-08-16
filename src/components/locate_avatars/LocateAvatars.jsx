import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet'
import L from 'leaflet'
import fetchAllLocation from '../../utils/services/commonServices'

// COMPONENT: LOCATE CONTROL
const LocateControl = ({ setCenter }) => {
  const map = useMap()

  useEffect(() => {
    const fetchAllAvatarLocation = async () => {
      try {
        const res = await fetchAllLocation()
        if (res.success && res.data && res.data.length > 0) {
          // Check if data is valid before using it
          setCenter([res.data[0].lat, res.data[0].lng]) // Update center based on first location
        } else {
          console.log('No data or invalid data received')
        }
      } catch (error) {
        console.log('Error fetching locations:', error)
      }
    }

    fetchAllAvatarLocation()
    map.locate({ setView: true, maxZoom: 16 })

    map.on('locationfound', (e) => {
      setCenter([e.latlng.lat, e.latlng.lng]) // Ensure correct format
      map.setView(e.latlng, 14)
    })

    map.on('locationerror', (e) => {
      console.log('Location error:', e)
    })
  }, [map, setCenter])

  return null
}

// COMPONENT: LOCATE AVATARS
const LocateAvatars = () => {
  const [center, setCenter] = useState([30.7565665, 76.6398525]) // Default center based on sample data
  const [locations, setLocations] = useState([])
  const radius = 1000 // Radius of the circle (in meters) in which avatars will be shown

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await fetchAllLocation()
        if (res.success && Array.isArray(res.data)) {
          setLocations(res.data) // Update state with the fetched locations
          if (res.data.length > 0) {
            setCenter([res.data[0].lat, res.data[0].lng]) // Set the center to the first location
          }
        } else {
          console.log('No data or invalid data received')
        }
      } catch (error) {
        console.error('Error fetching locations:', error)
      }
    }

    fetchLocations()
  }, [])

  const isMarkerWithinRadius = (position, center, radius) => {
    const distance = L.latLng(position).distanceTo(L.latLng(center))
    return distance <= radius
  }

  const filteredMarkers = locations.filter((location) =>
    isMarkerWithinRadius([location.lat, location.lng], center, radius),
  )
  const circleOptions = { color: 'red', weight: 2 }

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: '400px', width: '100%', marginBottom: '30px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocateControl setCenter={setCenter} />
      <Circle center={center} radius={radius} pathOptions={circleOptions} />
      {filteredMarkers.length > 0 ? (
        filteredMarkers.map((location, idx) => (
          <Marker key={idx} position={[location.lat, location.lng]}>
            <Popup>
              {location.userName}<br />{location.email}
            </Popup>
          </Marker>
        ))
      ) : (
        <Marker position={center}>
          <Popup>No users found in this radius</Popup>
        </Marker>
      )}
    </MapContainer>
  )
}

export default LocateAvatars
