import React from 'react'
import dynamic from 'next/dynamic';
const Globe = dynamic(import("react-globe.gl"), { ssr: false });
import { useEffect, useRef } from 'react'


function GlobeJS() {
  const globeEl = useRef()

  useEffect(() => {
    // Auto-rotate
    if(globeEl.current!=null){
        globeEl.current.controls().autoRotate = true;
        globeEl.current.controls().autoRotateSpeed = 1;
        globeEl.current.controls().enableZoom = false;
        globeEl.current.pointOfView({
          lat: 23.5,
          lng: 0,
          altitude: 2.5,
        })
    }
  }, [])

  return (
    <div id='about'>
      <div className="hero">
        <div className="hero--text">
          <h1>From Concept to Creation</h1>
          <h4>Bridging the Gap Between Imagination and Reality</h4>
          <div className="hero--description">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. <br></br>Voluptates reprehenderit totam delectus neque error ex numquam, sint dolorum! Aperiam, ipsum?
          </div>
        </div>

        <div className="hero--globe">
          <Globe
            ref={globeEl}
            // globeImageUrl={earthImg}
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            backgroundColor='rgba(0,0,0,0)'
            width={1150}
            height={1150}
            hexPolygonMargin={0.7}
            hexPolygonColor={() => 'rgba(255, 255, 255, 1)'}

          />

        </div>
      </div>
    </div>
  )
}

export default GlobeJS