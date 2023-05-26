export const FourStarDamage = [0, 10, 20, 30];
export const FiveStarDamage = [0, 30, 50, 100];
export const ElementsDamage = [0, 0, 10, 20, 30, 40];
export const DarkLightDamage = [0, 0, 20, 40];
export const CriticalDamage = [0, 1.2, 1.5, 2];
export const CriticalPercent = [0, 0.1, 0.15, 0.25];
export const skillMax = {
  damage: 1,
  fourStar: 3,
  fiveStar: 3,
  fire: 5,
  water: 5,
  wind: 5,
  light: 3,
  dark: 3,
  luck: 3,
  power: 3,
};
const Skills = {
  SD5: FiveStarDamage,
  SD4: FourStarDamage,
  ED: ElementsDamage,
  DLD: DarkLightDamage,
  CRD: CriticalDamage,
  CRP: CriticalPercent,
};

export default Skills;
