import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const LandingContent = () => {
  return (
    <section className="flex flex-wrap items-center justify-center px-6 py-12 bg-white">
      {/* Left: Image Grid */}
      <div className="grid grid-cols-2 gap-4 w-full md:w-1/2">
        <Card className="overflow-hidden">
          <img
            src="/images/landing-section-1.png"
            alt="Dish 1"
            className="w-full h-48 object-cover"
          />
        </Card>
        <Card className="overflow-hidden">
          <img
            src="/images/landing-section-2.jpg"
            alt="Dish 2"
            className="w-full h-48 object-cover"
          />
        </Card>
        <Card className="overflow-hidden">
          <img
            src="/images/landing-section-3.jpg"
            alt="Dish 3"
            className="w-full h-48 object-cover"
          />
        </Card>
        <Card className="overflow-hidden">
          <img
            src="/images/landing-section-4.jpg"
            alt="Dish 4"
            className="w-full h-48 object-cover"
          />
        </Card>
      </div>

      {/* Right: Text and Button */}
      <div className="w-full md:w-1/2 px-6 mt-8 md:mt-0 text-center md:text-left">
        <h2 className="text-4xl font-bold mb-4">Explore a world of flavors</h2>
        <p className="text-muted-foreground text-lg mb-6">
          Our platform brings the world of flavors directly to your door,
          offering a wide range of culinary experiences waiting to be
          discovered, satisfy your
          cravings with just a few clicks.
        </p>
        <Button variant="default" className="bg-primary text-white hover:bg-red-700">
          <Link href="/menu">See our menu</Link>
        </Button>
      </div>
    </section>
  );
};
