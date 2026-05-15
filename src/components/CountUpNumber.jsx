import { useCountUp, useIntersectionObserver } from '../hooks/useCountUp';

export default function CountUpNumber({ target, suffix = '', prefix = '', duration = 2000 }) {
  const [ref, isVisible] = useIntersectionObserver();
  const count = useCountUp(target, duration, isVisible);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString('fr-FR')}{suffix}
    </span>
  );
}
