"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function PostCarousel({
  images,
}: {
  images: {
    url: string;
  }[];
}) {
  return (
    <Carousel>
      <CarouselContent className="mt-2">
        {images.map((image, index) => (
          <CarouselItem key={index} className="">
            <div className="rounded-md flex max-h-[500px] h-full items-center border">
              <Image
                src={image.url}
                alt={`Post image ${index}`}
                width={1000}
                height={1000}
                className="rounded-md"
                onLoad={(e) => {
                  console.log(e.target.height);
                }}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious variant="ghost" />
      <CarouselNext variant="ghost" />
    </Carousel>
  );
}
