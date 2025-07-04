"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Footer } from "@/components/marketing/Footer";

// Optional but still safe to keep
export const dynamic = "force-dynamic";

const projects = [
  { src: "/crm.png", alt: "CRM Project", category: "Website" },
  { src: "/serene.png", alt: "Serene Project", category: "Website" },
  { src: "/finc.png", alt: "Finc Project", category: "Website" },
  { src: "/emailai.png", alt: "Email AI Project", category: "Product Design" },
  { src: "/horoscope.PNG", alt: "Horoscope Project", category: "Mobile App" },
  { src: "/nurodeep.png", alt: "Nurodeep Project", category: "Product Design" },
  { src: "/outreach.png", alt: "Outreach Project", category: "Website" },
  { src: "/Phantom.png", alt: "Phantom Project", category: "Website" },
  { src: "/projectsync.JPG", alt: "Project Sync Project", category: "Product Design" },
  { src: "/VorkelAI Snap.png", alt: "Vorkel AI Snap Project", category: "Website" },
  { src: "/demage.jpeg", alt: "Demage Project", category: "Website" },
  { src: "/nexar.png", alt: "Nexar Project", category: "Product Design" },
  { src: "/blique.jpeg", alt: "Blique Project", category: "Website" },
  { src: "/brands/imetly.png", alt: "Imetly Brand", category: "Branding" },
  { src: "/brands/nurodeeplogo.png", alt: "Nurodeep Logo", category: "Branding" },
  { src: "/brands/vorkellogo.png", alt: "Vorkel Logo", category: "Branding" },
];

const categories = ["All", "Website", "Mobile App", "Product Design", "Branding"];

function WorkPageContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam && categories.includes(categoryParam)) {
      setActiveTab(categoryParam);
    }
  }, [searchParams]);

  const filteredProjects = activeTab === "All"
    ? projects
    : projects.filter((p) => p.category === activeTab);

  return (
    <div className="bg-black text-white min-h-screen py-20 md:py-24 pt-32 md:pt-40">
      <div className="max-w-2xl mx-auto px-4 md:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-normal tracking-tighter text-white">
          Let My{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            Work Speak
          </span>
        </h1>
      </div>

      <div className="max-w-7xl mx-auto mt-12 px-4 md:px-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-center items-center">
            <div className="flex justify-center w-full max-w-lg md:max-w-2xl overflow-x-auto">
              <TabsList className="bg-transparent border border-neutral-800 rounded-full p-1.5 w-max">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="data-[state=active]:bg-white data-[state=active]:text-black text-neutral-400 rounded-full px-3 md:px-4 py-1.5 text-xs md:text-sm font-medium transition-colors whitespace-nowrap"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </div>

          <TabsContent value={activeTab} className="mt-8">
            <div className="grid grid-cols-1 gap-8 md:max-w-4xl mx-auto">
              {filteredProjects.map((project, index) => (
                <div key={index} className="rounded-lg overflow-hidden border border-neutral-800">
                  <div className="relative w-full aspect-video bg-black">
                    <Image
                      src={project.src}
                      alt={project.alt}
                      layout="fill"
                      objectFit="contain"
                      className="transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer showViewWork={false} />
    </div>
  );
}

export default function WorkPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-black text-white min-h-screen flex items-center justify-center">
          <div className="text-xl">Loading...</div>
        </div>
      }
    >
      <WorkPageContent />
    </Suspense>
  );
}
