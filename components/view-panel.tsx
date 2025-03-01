'use client';

import { useState } from 'react';
import Image from 'next/image';

const svgToDataUrl = (svg: string) =>
  `data:image/svg+xml,${encodeURIComponent(svg)}`;


const environments = [
  { id: 'bedroom', icon: '/icons/bedroom.png', image: '/bathroom.png' },
  { id: 'office', icon: '/icons/office.png', image: '/commercial_old.png' },
  { id: 'kitchen', icon: '/icons/kitchen.png', image: '/bedroom_old2.png' },
 
];

interface Props {
  currentSvg: any; // Expecting an SVG string
}

export default function EnvironmentSelector({ currentSvg }: Props) {
  const [selectedEnv, setSelectedEnv] = useState(environments[0]);
  console.log(currentSvg);
  
  return (
    <div className="flex flex-col items-center">
      {/* Environment Image */}
      <div
        className="relative w-full h-96 bg-cover bg-center bg-red-300"
        // style={{ backgroundImage: `url(${svgToDataUrl(currentSvg)})` }} // Use currentSvg from props
      >
        <Image
          src={selectedEnv.image}
          alt="Environment"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Environment Selector */}
      <div className="mt-10 flex gap-10">
        {environments.map((env) => (
          <button
            key={env.id}
            className={`p-2 border rounded ${selectedEnv.id === env.id ? 'border-black' : 'border-gray-300'
              }`}
            onClick={() => setSelectedEnv(env)}
          >
            <Image src={env.image} alt={env.id} width={40} height={40} />
          </button>
        ))}
      </div>
    </div>
  );
}
