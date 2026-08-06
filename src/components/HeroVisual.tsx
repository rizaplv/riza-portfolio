import Image from "next/image";

export default function HeroVisual() {
  return (
    <div className="relative h-[520px] w-full max-w-xl hidden lg:block ml-auto">
      <Image
        src="/hero-character.png"
        alt="3D illustration of Muhammad Riza Pahlevie"
        fill
        priority
        sizes="(max-width: 576px) 100vw, 576px"
        className="object-contain"
      />
    </div>
  );
}
