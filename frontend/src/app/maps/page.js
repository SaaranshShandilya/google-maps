"use client"

import { useMemo } from 'react'
import dynamic from 'next/dynamic'

export default function page() {
  const MapWithNoSSR = dynamic(() => import("../components/maps"), {
    ssr: false
  });
  

  return (
  <div className="">
    <MapWithNoSSR/>
  </div>
  )
}


