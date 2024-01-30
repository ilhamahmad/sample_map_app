import React, { useEffect, useRef } from 'react'
import { initialize } from './mapOperations';

export default function ArcgisMap() {

    const mapRef = useRef(null);

    useEffect(() => {
        initialize(mapRef.current);
    }, [])

    return (
        <div ref={mapRef} className='flex w-screen h-screen' />
    )
}
