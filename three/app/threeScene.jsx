'use client'; // Active le rendu côté client pour Next.js

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import './styles.css';

// Composant pour la scène 3D
function Box(props) {
  // Référence pour avoir un accès direct au mesh
  const meshRef = useRef();
  // État pour gérer le survol et l'activation
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotation du mesh à chaque frame
  useFrame((state, delta) => (meshRef.current.rotation.x += delta));
  

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[2, 4, 3]} />
      <meshStandardMaterial color={hovered ? 'purple' : 'pink'} />
    </mesh>
    
  );
}



// Composant principal de la scène 3D
export default function ThreeScene() {
  return (
    <Canvas>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[20, 0, 3]} angle={0.50} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Box position={[3.2, -3, 0]} />
      <Box position={[3.2, 0, 0]} />
      <Box position={[-2, 0, 0]} />
  
    </Canvas>
  );
}
