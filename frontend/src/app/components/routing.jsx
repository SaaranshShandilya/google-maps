import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
});

  const Routing = ({ sourceCity, destinationCity }) => {
  const map = useMap();

  console.log(sourceCity)

    useEffect(() => {
      if (!map) return;

      if(sourceCity && destinationCity && destinationCity.length > 0) {
        const routingControl = L.Routing.control({
        waypoints: [
          L.latLng( parseFloat(sourceCity[0]), parseFloat(sourceCity[1]) ), 
          L.latLng( parseFloat(destinationCity[0]), parseFloat(destinationCity[1]) )
        ],
        routeWhileDragging: true,
        lineOptions: {
          styles: [{ color: "#6FA1EC", weight: 4 }]
        },
        show: true,
        showAlternatives: true,
        addWaypoints: true, 
        fitSelectedRoutes: true,
      }).addTo(map);
      } 

        return () => null;
      
      


    }, [map, sourceCity, destinationCity]);   

  return null;
}

export default Routing;