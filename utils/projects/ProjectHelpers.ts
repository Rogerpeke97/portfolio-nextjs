export interface PROJECT {
  preview: { name: string; alt: string };
  title: string;
  description: string;
  github: Array<{ link: string }>;
  site: string;
  technologies: Array<string>;
}

export const PROJECTS: Array<PROJECT> = [
  {
    preview: {
      name: "/projects/shader_toy_ray_sphere.png",
      alt: "Ray Traced Sphere",
    },
    title: "Ray Traced Sphere",
    description: `A little ray tracing example I created in GLSL while learning about it.`,
    github: [{ link: "https://www.shadertoy.com/view/dttfzX" }],
    site: "https://www.shadertoy.com/view/dttfzX",
    technologies: ["GLSL"],
  },
  {
    preview: { name: "/projects/old-xenta.png", alt: "xenta game" },
    title: "Xenta",
    description: `This website is basically an "infinite" (If you don't die that is) game where you are given the sensation
    that you are moving forward but in reality the character is just orbiting around the surface of the sphere.
    This was achieved using Trigonometry which was also applied to the movement of the trees and grass as time passes.
    You have a score, which is saved if your performance was better than your previous best score and a set amount of lives
    that decrease as you hit the trees. This website uses JWT to authenticate users with the Spring Boot Backend.`,
    github: [
      { link: "https://github.com/Rogerpeke97/FrontendAPI" },
      { link: "https://github.com/Rogerpeke97/APISpring" },
    ],
    site: "https://xenta.netlify.app/",
    technologies: [
      "React",
      "NodeJS",
      "PostgreSQL",
      "ThreeJS",
      "NextJS",
      "TailwindCSS",
      "TypeScript",
    ],
  },
  {
    preview: {
      name: "/projects/face-recognition.png",
      alt: "Face Recognition",
    },
    title: "Face Recognition",
    description:
      "A minimalistic face recognition system that uses a neural network to recognize faces.",
    github: [{ link: "https://github.com/Rogerpeke97/Face-Recognition" }],
    site: "https://github.com/Rogerpeke97/Face-Recognition",
    technologies: ["C++", "SDL2", "ImGui"],
  },
  {
    preview: { name: "/projects/old-portfolio.png", alt: "Old portfolio" },
    title: "Old portfolio",
    description:
      "This is the old portfolio that I made before I started working on this website.",
    github: [{ link: "https://github.com/Rogerpeke97/portfolio" }],
    site: "https://ignaciodiaz.netlify.app/",
    technologies: ["React", "ThreeJS", "TailwindCSS", "TypeScript"],
  },
];
