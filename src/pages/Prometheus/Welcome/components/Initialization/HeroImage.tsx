import {
  HeroWrapper,
  HeroImg,
  HeroBottomFade,
  HeroColorWash,
} from './HeroImage.styled';

const HERO_IMAGE_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAONi9hf4E83yH07B4GIKGKxSWcfLWvTn9S_Jl-XKUvDH4bIxqvCZteTH2kWnUi8ZOQZU3odloxAHwAoBJhTDGG29A1UFJ6ZNB6YZ2Mku_Vz-WrusvCYp6vUVdToujsWse7g0KKhgtIyO59AwtWunN6O6eD7UQyaIHZgEua9jZ4YBKL96ZL5gITDbgBNNiKoXl7zYuPC4p8bB-qQanUjnI82na9OH30DIhTKwZlr5HoJALLF7kWqDM5wQcmjVt1Qo24zN8RhYdPj2I';

const HERO_ALT =
  'Abstract 3D digital visualization of dark obsidian glass shards with electric purple glowing data streams and neon green pulses';

export const HeroImage = () => {
  return (
    <HeroWrapper>
      <HeroImg src={HERO_IMAGE_URL} alt={HERO_ALT} />
      <HeroBottomFade />
      <HeroColorWash />
    </HeroWrapper>
  );
};
