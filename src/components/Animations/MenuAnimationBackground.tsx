import { memo } from 'react';
import { MenuAnimationBackgroundProps } from '../../interfaces';
import { tokens } from '../../styles/tokens';

function MenuAnimationBackground({
  menu,
}: MenuAnimationBackgroundProps) {
  if (!menu.value) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundColor: tokens.scrim.sheet,
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        zIndex: 3,
      }}
      onClick={() => (menu.value = null)}
    />
  );
}

export default memo(MenuAnimationBackground);
