import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import L from 'leaflet';
import { Button } from 'react-bootstrap';

// Fix for default icon issues in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Component to update the map view when the selectedLocation changes
const UpdateMapView = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 15);
    }
  }, [position, map]);

  return null;
};

const CompanyDetails = () => {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const companyResponse = await axios.get(`http://localhost:8000/api/companies/${companyId}/`);
        setCompany(companyResponse.data);

        const locationsResponse = await axios.get(`http://localhost:8000/api/companies/${companyId}/locations/`);
        setLocations(locationsResponse.data);

        if (locationsResponse.data.length > 0) {
          setSelectedLocation(locationsResponse.data[0]); // Initialize with the first location
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching company details or locations:', error);
        setError('Failed to fetch company details');
        setLoading(false);
      }
    };

    if (companyId) {
      fetchCompanyDetails();
    }
  }, [companyId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const position = selectedLocation
    ? [parseFloat(selectedLocation.latitude), parseFloat(selectedLocation.longitude)]
    : [0, 0];

  return (
    <div className="container mt-4">
      {company && (
        <>
          <header className="hero bg-light p-4 mb-4 rounded">
            <h1 className="display-4">{company.name}</h1>
            <p className="lead">{company.address}</p>
            <Button variant="primary" as={Link} to="/" className="mt-3">Back to List</Button>
          </header>
          <main>
            <h2 className="my-4">Locations</h2>
            <ul className="list-group mb-4">
              {locations.map((location) => (
                <li
                  key={location.location_id}
                  className={`list-group-item ${selectedLocation && selectedLocation.location_id === location.location_id ? 'active' : ''}`}
                  onClick={() => setSelectedLocation(location)}
                >
                  <p><strong>{location.name}</strong></p>
                  <p>{location.address}</p>
                  <p>Lat: {location.latitude}, Lon: {location.longitude}</p>
                </li>
              ))}
            </ul>
            <h2 className="my-4">Map of Locations</h2>
            <div className="map-container mb-4">
              <MapContainer
                center={position}
                zoom={15}
                style={{ height: '400px', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <UpdateMapView position={position} />
                {selectedLocation && (
                  <Marker position={position}>
                    <Popup>
                      <h5>{selectedLocation.name}</h5>
                      <p>{selectedLocation.address}</p>
                    </Popup>
                  </Marker>
                )}
              </MapContainer>
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default CompanyDetails;

//GOOGLE MAPS - WIP

// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import { useParams, Link } from 'react-router-dom';
// import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const libraries = ['places'];

// const CompanyDetails = () => {
//   const { companyId } = useParams();
//   const [company, setCompany] = useState(null);
//   const [locations, setLocations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const mapRef = useRef(null);

//   useEffect(() => {
//     const fetchCompanyDetails = async () => {
//       try {
//         const companyResponse = await axios.get(`http://localhost:8000/api/companies/${companyId}/`);
//         setCompany(companyResponse.data);

//         const locationsResponse = await axios.get(`http://localhost:8000/api/companies/${companyId}/locations/`);
//         setLocations(locationsResponse.data);

//         if (locationsResponse.data.length > 0) {
//           setSelectedLocation(locationsResponse.data[0]); // Initialize with the first location
//         }

//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching company details or locations:', error);
//         setError('Failed to fetch company details');
//         setLoading(false);
//       }
//     };

//     if (companyId) {
//       fetchCompanyDetails();
//     }
//   }, [companyId]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   const mapCenter = {
//     lat: selectedLocation ? parseFloat(selectedLocation.latitude) : 0,
//     lng: selectedLocation ? parseFloat(selectedLocation.longitude) : 0,
//   };

//   const handleLocationClick = (location) => {
//     setSelectedLocation(location);
//     if (mapRef.current) {
//       mapRef.current.panTo({ lat: parseFloat(location.latitude), lng: parseFloat(location.longitude) });
//       mapRef.current.setZoom(15);
//     }
//   };

//   return (
//     <div className="container">
//       {company && (
//         <>
//           <h1 className="my-4">{company.name}</h1>
//           <p>{company.address}</p>
//           <h2 className="my-4">Locations</h2>
//           <ul className="list-group mb-4">
//             {locations.map((location) => (
//               <li key={location.location_id} className="list-group-item" onClick={() => handleLocationClick(location)}>
//                 <p>{location.location_id}</p>
//                 <p><strong>{location.name}</strong></p>
//                 <p>{location.address}</p>
//                 <p>Lat: {location.latitude}, Lon: {location.longitude}</p>
//               </li>
//             ))}
//           </ul>
//           <Link to="/" className="btn btn-primary mb-4">Back to List</Link>
//         </>
//       )}
//       <h2 className="my-4">Map of Locations</h2>
//       <LoadScript
//         googleMapsApiKey="AIzaSyBkp8P0D_DgZd14wlGL390G_hD1vKUc9yU"
//         libraries={libraries}
//         loadingElement={<div>Loading Maps...</div>}
//       >
//         <GoogleMap
//           mapContainerStyle={{ height: '400px', width: '100%' }}
//           center={mapCenter}
//           zoom={15}
//           onLoad={map => mapRef.current = map}
//         >
//           {selectedLocation && (
//             <Marker
//               key={selectedLocation.location_id}
//               position={{ lat: parseFloat(selectedLocation.latitude), lng: parseFloat(selectedLocation.longitude) }}
//               onClick={() => setSelectedLocation(selectedLocation)}
//             />
//           )}
//           {selectedLocation && (
//             <InfoWindow
//               position={{ lat: parseFloat(selectedLocation.latitude), lng: parseFloat(selectedLocation.longitude) }}
//               onCloseClick={() => setSelectedLocation(null)}
//             >
//               <div>
//                 <h5>{selectedLocation.name}</h5>
//                 <p>{selectedLocation.address}</p>
//               </div>
//             </InfoWindow>
//           )}
//         </GoogleMap>
//       </LoadScript>
//     </div>
//   );
// };

// export default CompanyDetails;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, Link } from 'react-router-dom';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import L from 'leaflet';
// import { Button } from 'react-bootstrap';

// // Fix for default icon issues in Leaflet
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconUrl: require('leaflet/dist/images/marker-icon.png'),
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
// });

// const CompanyDetails = () => {
//   const { companyId } = useParams();
//   const [company, setCompany] = useState(null);
//   const [locations, setLocations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedLocation, setSelectedLocation] = useState(null);

//   useEffect(() => {
//     const fetchCompanyDetails = async () => {
//       try {
//         const companyResponse = await axios.get(`http://localhost:8000/api/companies/${companyId}/`);
//         setCompany(companyResponse.data);

//         const locationsResponse = await axios.get(`http://localhost:8000/api/companies/${companyId}/locations/`);
//         setLocations(locationsResponse.data);

//         if (locationsResponse.data.length > 0) {
//           setSelectedLocation(locationsResponse.data[0]); // Initialize with the first location
//         }

//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching company details or locations:', error);
//         setError('Failed to fetch company details');
//         setLoading(false);
//       }
//     };

//     if (companyId) {
//       fetchCompanyDetails();
//     }
//   }, [companyId]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   const position = selectedLocation
//     ? [parseFloat(selectedLocation.latitude), parseFloat(selectedLocation.longitude)]
//     : [0, 0];

//   return (
//     <div className="container mt-4">
//       {company && (
//         <>
//           <header className="hero bg-light p-4 mb-4 rounded">
//             <h1 className="display-4">{company.name}</h1>
//             <p className="lead">{company.address}</p>
//             <Button variant="primary" as={Link} to="/" className="mt-3">Back to List</Button>
//           </header>
//           <main>
//             <h2 className="my-4">Locations</h2>
//             <ul className="list-group mb-4">
//               {locations.map((location) => (
//                 <li
//                   key={location.location_id}
//                   className={`list-group-item ${selectedLocation && selectedLocation.location_id === location.location_id ? 'active' : ''}`}
//                   onClick={() => setSelectedLocation(location)}
//                 >
//                   <p><strong>{location.name}</strong></p>
//                   <p>{location.address}</p>
//                   <p>Lat: {location.latitude}, Lon: {location.longitude}</p>
//                 </li>
//               ))}
//             </ul>
//             <h2 className="my-4">Map of Locations</h2>
//             <div className="map-container mb-4">
//               <MapContainer
//                 center={position}
//                 zoom={15}
//                 style={{ height: '400px', width: '100%' }}
//               >
//                 <TileLayer
//                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 />
//                 {selectedLocation && (
//                   <Marker position={position}>
//                     <Popup>
//                       <h5>{selectedLocation.name}</h5>
//                       <p>{selectedLocation.address}</p>
//                     </Popup>
//                   </Marker>
//                 )}
//               </MapContainer>
//             </div>
//           </main>
//         </>
//       )}
//     </div>
//   );
// };

// export default CompanyDetails;