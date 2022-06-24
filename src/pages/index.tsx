import { Canvas } from '@react-three/fiber'
import { Stage, Bounds } from '@react-three/drei'
import { Suspense } from 'react'
import { useRouter } from 'next/router'

import GLTFModel from '../components/gltf-model'

const handleOnLoaded = () => {
  console.log('Model loaded')
  window.status = 'ready'
}

export default function ViewerPage() {
  const router = useRouter()
  const { model } = router.query
  if (!model) return <>No model provided</>

  return (
    <Canvas
      gl={{ preserveDrawingBuffer: true, antialias: true, alpha: true }}
      // camera={{ fov: 35 }}
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 150], fov: 50 }}
    >
      <Suspense fallback={null}>
        <Stage
          contactShadow={{
            blur: 2,
            opacity: 0.5,
            position: [0, 0, 0],
          }}
          shadows
          adjustCamera
          intensity={0.1}
          environment="city"
          preset="rembrandt"
          shadowBias={-0.001}
        >
          <Bounds fit clip margin={1} damping={0}>
            <GLTFModel model={model as string} shadows={true} onLoaded={handleOnLoaded} />
          </Bounds>
        </Stage>
      </Suspense>
    </Canvas>
  )
}
