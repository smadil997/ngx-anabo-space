export interface Star {
  x: number;
  y: number;
  z: number;
  r: number;
  color: string;
  alpha: number;
  twinkle: number;
  twinkleSpeed: number;
  vx: number;
  vy: number;
  mx: number;
  my: number;
}


export interface ShootingStar {
  x: number;
  y: number;
  len: number;
  alpha: number;
  speed: number;
  angle: number;
}

export type SpaceColor =
  | 'classic'
  | 'aurora'
  | 'nebula'
  | 'galaxy'
  | 'matrix'
  | 'mars'
  | 'ocean'
  | 'blossom'
  | 'moonlight'
  | 'electric';

  
export type SpaceTheme = 'stars-lines' | 'stars-glow' | 'all';