import ThreeApp from '../components/threejs/ThreeApp';
import { useThree } from '../hooks/useThree';

export default function Sola() {
  const canvas = useThree(ThreeApp);

  return (
    <>
      <div ref={canvas} style={{ height: '100%', width: '100%' }} />
    </>
  );
}
