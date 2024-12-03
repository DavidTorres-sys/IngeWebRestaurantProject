import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LandingFooter() {
  return (
    <div className="py-10 px-6">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-5xl mx-auto">
        {/* Left Image */}
        <Card className="overflow-hidden max-w-xs">
          <img
            src="/images/landing-footer-2.png"
            alt="Delicious Food"
            className="object-cover w-full h-full"
          />
        </Card>

        {/* Center Text */}
        <div className="text-center max-w-lg">
          <h2 className="text-2xl font-bold mb-4">
            Help us Continue Discovering New Restaurants
          </h2>
          <p className="text-gray-600 mb-6">
            Do you know an amazing restaurant that isn't on yet our list? Your
            contribution will not only enrich the experience of other users, but
            also will help highlight those special places that deserve to be
            discovered.
          </p>
          <Button className="bg-red-500 text-white hover:bg-red-600">
            New restaurant
          </Button>
        </div>

        {/* Right Image */}
        <Card className="overflow-hidden max-w-xs">
          <img
            src="/images/landing-footer-2.png"
            alt="Restaurant Interior"
            className="object-cover w-full h-full"
          />
        </Card>
      </div>
    </div>
  );
}
