// import Particles from "../components/particles";
import Link from "next/link";

const navigation = [
  { name: "Personas", href: "/Personas" },
  { name: "Targets", href: "/Target" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-black via-zinc-600/20 to-black">
      <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      {/* <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      /> */}
      <h1 className="flex flex-col items-center z-10 animate-text-fade-in text-8xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display whitespace-nowrap bg-clip-text ">
        Skooldio's Hackathon 2023
      </h1>
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="my-16 text-center animate-fade-in">
        <h2 className="text-sm text-zinc-200">Group 2 Proudly Present</h2>
      </div>
    </div>
  );
}
