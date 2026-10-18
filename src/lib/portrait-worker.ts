import data from '../generated/portrait-vectors.json';
import { createPortraitRenderer } from './portrait-renderer';

const scope = self as unknown as {
  onmessage:
    | ((
        event: MessageEvent<{
          id: number;
          ms: number;
          fixed: boolean;
          aimAngle: number;
        }>,
      ) => void)
    | null;
  postMessage: (message: unknown, transfer?: Transferable[]) => void;
};
try {
  const canvas = new OffscreenCanvas(640, 640);
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Canvas unavailable');
  const draw = createPortraitRenderer(context, data);
  scope.onmessage = ({ data: { id, ms, fixed, aimAngle } }) => {
    try {
      draw(ms, fixed, aimAngle);
      const bitmap = canvas.transferToImageBitmap();
      scope.postMessage({ type: 'frame', id, bitmap }, [bitmap]);
    } catch {
      scope.postMessage({ type: 'error' });
    }
  };
  scope.postMessage({ type: 'ready' });
} catch {
  scope.postMessage({ type: 'error' });
}
