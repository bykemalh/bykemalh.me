import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck, Database } from "lucide-react";
import { FloatingDock } from "@/components/floating-dock";
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiSharp,
  SiKotlin,
  SiReact,
  SiNextdotjs,
  SiRemix,
  SiNodedotjs,
  SiFlask,
  SiFastapi,
  SiDotnet,
  SiPostgresql,
  SiMysql,
  SiFlutter,
  SiPytorch,
  SiTensorflow,
  SiOpencv,
  SiReactrouter
} from "react-icons/si";
import { PageTransition } from "@/components/page-transition";
import { generateSEO, generateBreadcrumbSchema, generateJsonLd, generatePersonSchema, generateWebsiteSchema } from "@/lib/seo";
import type { Route } from "./+types/home";

export function headers() {
  return {
    // Home page is mostly static - CDN caches for 1 hour
    "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
  };
}

export function meta({ }: Route.MetaArgs) {
  return generateSEO({
    title: "Full Stack Developer & AI Engineer",
    description: "Kemal Hafızoğlu's portfolio showcasing expertise in full-stack web development, AI/ML engineering, and innovative software solutions. Creator of FytureAI, Sakus Bus Tracking, Robotek AI Competition Winner, and more. Specialized in React Router, Python, Node.js, PyTorch, and AI chatbots.",
    keywords: [
      "Kemal Hafızoğlu",
      "Full Stack Developer",
      "AI Engineer",
      "Web Developer",
      "Machine Learning",
      "React Router",
      "React",
      "Node.js",
      "Python",
      "PyTorch",
      "Portfolio",
      "Software Engineer",
      "Sakarya Developer",
      // Project Names
      "Hempy",
      "Sakus",
      "ArzAuto",
      "Seyfi",
      "SUBU Turnuva",
      "PingATAR",
      "Robotek",
      "FytureAI",
      "AI bykemalh.me",
      "Psikolog Tugba Yıldırım",
      "ColdDown",
      "FriendlyAI",
      // Technologies & Skills
      "E-commerce Development",
      "Real-time Tracking",
      "Socket.io",
      "API Integration",
      "Shopier Integration",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "Prisma ORM",
      "Python Flask",
      "C# WinForms",
      "Network Programming",
      "TensorFlow",
      "OpenCV",
      "Voice Recognition",
      "Image Matching",
      "AI Chatbot",
      "RAG Technology",
      "OpenAI",
      "Next.js",
      "Flutter",
      "Firebase",
      "Vercel AI SDK",
      "JWT Authentication",
      "Payment Gateway",
      "Sakarya Metropolitan Municipality",
      "SUBU Competition Winner",
      "Kemal H.",
      "bykemalh.me",
      "KemalH Developer",
      "KemalH AI",
      "KemalH Portfolio",
      "KemalH Projects",
      "KemalH Blog",
      "KemalH Tech Blog",
      "KemalH Web Development",
      "KemalH Machine Learning",
      "KemalH Software Engineering",
      "Kemal Hafızoğlu Portfolio",
      "Kemal Hafız",
      "KemalH Full Stack",
      "Kemal Hafızoğlu AI",
      "Kemal Hafızoğlu Web Development",
      "Kemal Hafızoğlu Machine Learning",
      "Kemal Hafızoğlu Software Engineering",
      "bykemalh Projects",
      "bykemalh Portfolio",
      "bykemalh Tech Blog",
      "bykemalh Web Development",
      "bykemalh Machine Learning",
      "bykemalh Software Engineering",
      "bykemalh AI Engineer",
      "bykemalh Full Stack Developer",
      "bykemalh.me Portfolio",
      "bykemalh.me Projects",
      "bykemalh.me Tech Blog",
      "bykemalh.me Web Development",
      "bykemalh.me Machine Learning",
      "bykemalh.me Software Engineering",
      "bykemalh.me AI Engineer",
      "bykemalh.me Full Stack Developer",
      "KemalH AI Engineer",
    ],
    url: "/",
    type: "profile",
  });
}

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
]);

const personSchema = generatePersonSchema();
const websiteSchema = generateWebsiteSchema();

export default function Home() {
  return (
    <>
      {/* Structured Data - Breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateJsonLd(breadcrumbSchema)}
        key="breadcrumb-jsonld"
      />

      {/* Structured Data - Person */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateJsonLd(personSchema)}
        key="person-jsonld"
      />

      {/* Structured Data - Website */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateJsonLd(websiteSchema)}
        key="website-jsonld"
      />

      {/* Floating Dock */}
      <FloatingDock />
      <PageTransition>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24">
          {/* Hero Section */}
          <div id="home" className="flex flex-col-reverse sm:flex-row gap-6 sm:gap-4">
            <div className="flex-1 flex flex-col justify-center space-y-3 sm:space-y-4 text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white">Hi , I&apos;m Kemal👋  </h1>
              <Badge variant="default" className="flex items-center gap-2 w-fit bg-blue-500 text-white mx-auto sm:mx-0">
                <BadgeCheck className="w-4 h-4" />
                Full-Stack Web Developer
              </Badge>
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300">I develop modern web applications and AI solutions.</p>
            </div>
            <img
              src="/profile.jpg"
              alt="Kemal Profile Picture"
              width={150}
              height={150}
              className="rounded-full mx-auto sm:mx-0 w-32 h-32 sm:w-36 sm:h-36 md:w-[150px] md:h-[150px]"
            />
          </div>

          {/* About Me */}
          <div id="about" className="mt-8 sm:mt-10 md:mt-12">
            <h3 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-10 md:mt-12 text-black dark:text-white">About Me</h3>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4">
              I&apos;m a full-stack developer with experience in web development since 2021, specializing in creating high-performance, user-focused applications. Skilled in frontend and backend technologies, SEO, database management, and API development. I also build machine learning models in Python using PyTorch and TensorFlow for audio recognition and image matching. Passionate about developing innovative, real-world solutions with clean and maintainable code.
            </p>
          </div>

          {/* Work Experience */}
          <div id="work">
            <h3 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-10 md:mt-12 text-black dark:text-white">Work Experience</h3>
            <Accordion type="single" collapsible className="w-full mt-4">
              <AccordionItem value="sakarya-internship">
                <AccordionTrigger>
                  <div className="flex flex-col sm:flex-row justify-between w-full items-start sm:items-center gap-2 sm:gap-4">
                    <div className="flex gap-3 sm:gap-4 items-center">
                      <img
                        src="/subu_logo.jpg"
                        alt="Sakarya University of Applied Sciences Logo"
                        width={40}
                        height={40}
                        className="rounded-full w-10 h-10"
                      />
                      <div>
                        <h4 className="font-semibold dark:text-white text-sm sm:text-base">Sakarya University of Applied Sciences</h4>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Frontend Developer</p>
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 ml-auto sm:ml-0">Jan 2025 - Aug 2025</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  I worked as a Frontend Developer under the İŞKUR Youth Program, contributing to the development of rekabest.com, the Sakarya Tournament Management System. I built the platform using Node.js and EJS, focusing on creating a user-friendly interface and optimizing overall performance.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="aris888-internship">
                <AccordionTrigger>
                  <div className="flex flex-col sm:flex-row justify-between w-full items-start sm:items-center gap-2 sm:gap-4">
                    <div className="flex gap-3 sm:gap-4 items-center">
                      <img
                        src="/aris888_logo.jpg"
                        alt="Aris888 Logo"
                        width={40}
                        height={40}
                        className="rounded-full w-10 h-10"
                      />
                      <div>
                        <h4 className="font-semibold dark:text-white text-sm sm:text-base">Aris888 Metaverse</h4>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Full Stack Web Developer</p>
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 ml-auto sm:ml-0">Sep 2024 - Jan 2025</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  Working as a full-stack developer at a company focused on metaverse and blockchain technologies. Developing Web3 integrations, NFT marketplace, and game backend systems.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="inegol-internship">
                <AccordionTrigger>
                  <div className="flex flex-col sm:flex-row justify-between w-full items-start sm:items-center gap-2 sm:gap-4">
                    <div className="flex gap-3 sm:gap-4 items-center">
                      <img
                        src="/inegol_logo.jpg"
                        alt="İnegöl Municipality Logo"
                        width={40}
                        height={40}
                        className="rounded-full w-10 h-10"
                      />
                      <div>
                        <h4 className="font-semibold dark:text-white text-sm sm:text-base">İnegöl Municipality</h4>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Intern Developer</p>
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 ml-auto sm:ml-0">Sep 2022 - Jun 2023</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  Interned at İnegöl Municipality IT Department. Developed network monitoring tools and coded the PingATAR application with C#.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Education */}
          <div>
            <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col">
              <h3 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-10 md:mt-12 text-black dark:text-white">Education</h3>
              <div className="mt-4 space-y-4">
                <div className="group flex gap-3 sm:gap-4 items-start sm:items-center py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all cursor-pointer">
                  <img
                    src="/subu_logo.jpg"
                    alt="Sakarya University Logo"
                    width={40}
                    height={40}
                    className="rounded-full w-10 h-10 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold dark:text-white text-sm sm:text-base">Sakarya University of Applied Sciences</h4>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Bachelor&apos;s in Computer Engineering</p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 transition-transform group-hover:-translate-x-4 hidden sm:block">
                      2023 - 2025
                    </span>

                    <a
                      href="https://www.subu.edu.tr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sm:opacity-0 sm:translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                    >
                      <div className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">
                        <span className="text-lg rotate-[-45deg]">→</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-4">
                <div className="group flex gap-3 sm:gap-4 items-start sm:items-center py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all cursor-pointer">
                  <img
                    src="/hsy1_logo.jpg"
                    alt="Hsy1 Logo"
                    width={40}
                    height={40}
                    className="rounded-full w-10 h-10 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold dark:text-white text-sm sm:text-base">HACI SEVİM YILDIZ-1 TECHNICAL HIGH SCHOOL</h4>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">COMPUTER SCIENCE / Web Programming</p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 transition-transform group-hover:-translate-x-4 hidden sm:block">
                      2019 - 2023
                    </span>

                    <a
                      href="https://hsy-1.meb.k12.tr/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sm:opacity-0 sm:translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                    >
                      <div className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">
                        <span className="text-lg rotate-[-45deg]">→</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="">
            <h3 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-10 md:mt-12 text-black dark:text-white">Skills</h3>
            <div className="mt-6 flex flex-wrap gap-2">
              {/* Programming Languages */}
              <Badge className="bg-yellow-400 text-black hover:bg-yellow-500 flex items-center gap-1.5 text-xs sm:text-sm">
                <SiJavascript className="w-3 h-3 sm:w-4 sm:h-4" />
                JavaScript
              </Badge>
              <Badge className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-1.5 text-xs sm:text-sm">
                <SiTypescript className="w-3 h-3 sm:w-4 sm:h-4" />
                TypeScript
              </Badge>
              <Badge className="bg-blue-500 text-white hover:bg-blue-600 flex items-center gap-1.5 text-xs sm:text-sm">
                <SiPython className="w-3 h-3 sm:w-4 sm:h-4" />
                Python
              </Badge>
              <Badge className="bg-purple-600 text-white hover:bg-purple-700 flex items-center gap-1.5 text-xs sm:text-sm">
                <SiSharp className="w-3 h-3 sm:w-4 sm:h-4" />
                C#
              </Badge>
              <Badge className="bg-purple-500 text-white hover:bg-purple-600 flex items-center gap-1.5 text-xs sm:text-sm">
                <SiKotlin className="w-3 h-3 sm:w-4 sm:h-4" />
                Kotlin
              </Badge>

              {/* Web Frameworks */}
              <Badge className="bg-cyan-500 text-white hover:bg-cyan-600 flex items-center gap-1.5 text-xs sm:text-sm">
                <SiReact className="w-3 h-3 sm:w-4 sm:h-4" />
                React
              </Badge>
              <Badge className="bg-black text-white hover:bg-gray-800 flex items-center gap-1.5 text-xs sm:text-sm">
                <SiNextdotjs className="w-3 h-3 sm:w-4 sm:h-4" />
                Next.js
              </Badge>
              <Badge className="bg-blue-400 text-white hover:bg-blue-500 flex items-center gap-1.5 text-xs sm:text-sm">
                <SiRemix className="w-3 h-3 sm:w-4 sm:h-4" />
                Remix.js
              </Badge>
              <Badge className="bg-red-800 text-white hover:bg-red-900 flex items-center gap-1.5 text-xs sm:text-sm">
                <SiReactrouter className="w-3 h-3 sm:w-4 sm:h-4 " />
                React Router
              </Badge>
              <Badge className="bg-green-600 text-white hover:bg-green-700 flex items-center gap-1.5 text-xs sm:text-sm">
                <SiNodedotjs className="w-3 h-3 sm:w-4 sm:h-4" />
                Node.js
              </Badge>
              <Badge className="bg-gray-700 text-white hover:bg-gray-800 flex items-center gap-1.5 text-xs sm:text-sm">
                <SiFlask className="w-3 h-3 sm:w-4 sm:h-4" />
                Flask
              </Badge>
              <Badge className="bg-teal-600 text-white hover:bg-teal-700 flex items-center gap-1.5 text-xs sm:text-sm">
                <SiFastapi className="w-3 h-3 sm:w-4 sm:h-4" />
                FastAPI
              </Badge>
              <Badge className="bg-indigo-600 text-white hover:bg-indigo-700 flex items-center gap-1.5 text-xs sm:text-sm">
                <SiDotnet className="w-3 h-3 sm:w-4 sm:h-4" />
                .NET MVC
              </Badge>

              {/* Database */}
              <Badge className="bg-blue-700 text-white hover:bg-blue-800 flex items-center gap-1.5 text-xs sm:text-sm">
                <SiPostgresql className="w-3 h-3 sm:w-4 sm:h-4" />
                PostgreSQL
              </Badge>
              <Badge className="bg-orange-500 text-white hover:bg-orange-600 flex items-center gap-1.5 text-xs sm:text-sm">
                <SiMysql className="w-3 h-3 sm:w-4 sm:h-4" />
                MySQL
              </Badge>
              <Badge className="bg-gray-700 text-white hover:bg-gray-800 flex items-center gap-1.5 text-xs sm:text-sm">
                <Database className="w-3 h-3 sm:w-4 sm:h-4" />
                MS SQL
              </Badge>

              {/* Mobile Development */}
              <Badge className="bg-sky-500 text-white hover:bg-sky-600 flex items-center gap-1.5 text-xs sm:text-sm">
                <SiFlutter className="w-3 h-3 sm:w-4 sm:h-4" />
                Flutter
              </Badge>
              <Badge className="bg-purple-500 text-white hover:bg-purple-600 flex items-center gap-1.5 text-xs sm:text-sm">
                <SiKotlin className="w-3 h-3 sm:w-4 sm:h-4" />
                Kotlin
              </Badge>

              {/* Desktop Development */}
              <Badge className="bg-green-700 text-white hover:bg-green-800 flex items-center gap-1.5 text-xs sm:text-sm">
                <SiPython className="w-3 h-3 sm:w-4 sm:h-4" />
                PySide 6
              </Badge>
              <Badge className="bg-purple-600 text-white hover:bg-purple-700 flex items-center gap-1.5 text-xs sm:text-sm">
                <SiSharp className="w-3 h-3 sm:w-4 sm:h-4" />
                C# WinForms
              </Badge>

              {/* Machine Learning */}
              <Badge className="bg-orange-600 text-white hover:bg-orange-700 flex items-center gap-1.5 text-xs sm:text-sm">
                <SiPytorch className="w-3 h-3 sm:w-4 sm:h-4" />
                PyTorch
              </Badge>
              <Badge className="bg-orange-500 text-white hover:bg-orange-600 flex items-center gap-1.5 text-xs sm:text-sm">
                <SiTensorflow className="w-3 h-3 sm:w-4 sm:h-4" />
                TensorFlow
              </Badge>
              <Badge className="bg-green-600 text-white hover:bg-green-700 flex items-center gap-1.5 text-xs sm:text-sm">
                <SiOpencv className="w-3 h-3 sm:w-4 sm:h-4" />
                OpenCV
              </Badge>

              {/* Spoken Languages */}
              <Badge className="bg-red-600 text-white hover:bg-red-700 text-xs sm:text-sm">
                🇹🇷 Turkish • Native
              </Badge>
              <Badge className="bg-blue-600 text-white hover:bg-blue-700 text-xs sm:text-sm">
                🇷🇺 Russian • Good
              </Badge>
              <Badge className="bg-indigo-600 text-white hover:bg-indigo-700 text-xs sm:text-sm">
                🇬🇧 English • Intermediate
              </Badge>
            </div>
          </div>

          {/* Contact */}
          <div id="contact">
            <h3 className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-10 md:mt-12 text-black dark:text-white">Contact Me</h3>
            <p className="text-sm sm:text-base">Contact me via Telegram: <a className="text-blue-500 hover:underline" href="https://t.me/bykemalh">bykemalh</a></p>
          </div>
        </div>
      </PageTransition>
    </>
  );
}
