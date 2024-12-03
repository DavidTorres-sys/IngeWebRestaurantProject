import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export const LandingHeader = () => {
  return (
    <div
      className="relative h-[400px] w-full bg-cover bg-center"
      style={{
        backgroundImage: `url('/images/landing-header.jpeg')`,
      }}
    >

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <Card className="absolute inset-0 flex items-center justify-center shadow-none bg-transparent">
        <CardContent className="text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold">
            Discover the Perfect Gastronomic Experience
          </h1>
          <p className="mt-4 text-sm md:text-lg">
            Step into the heart of Italy at RestoRec, where tradition meets modern culinary artistry.
            Nestled in a cozy and elegant ambiance, our restaurant offers a true taste of authentic Italian cuisine,
            crafted with passion and the finest ingredients.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

