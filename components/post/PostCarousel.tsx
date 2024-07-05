"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";

export default function PostCarousel({
  images,
}: {
  images: {
    url: string;
  }[];
}) {
  const [selected, setSelected] = useState<undefined | number>();
  return (
    <>
      <Carousel>
        <CarouselContent className="mt-2">
          {images.map((image, index) => (
            <CarouselItem key={index} className="flex">
              <div
                onClick={() => setSelected(index)}
                className="rounded-md flex max-h-[500px] h-full items-center border 
                dark:bg-black object-cover flex-wrap
                hover:cursor-pointer"
              >
                <Image
                  src={image.url}
                  alt={`Post image ${index}`}
                  width={500}
                  height={500}
                  className="rounded-md"
                  onLoad={(e) => {}}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious variant="ghost" />
        <CarouselNext variant="ghost" />
      </Carousel>
      {selected !== undefined && (
        <Dialog open onOpenChange={() => setSelected(undefined)}>
          <DialogContent className="flex p-0 justify-center">
            <Image
              src={images[selected].url}
              alt={``}
              width={1000}
              height={1000}
              className="object-contain sm:max-w-[90vw] sm:max-h-[90vh] lg:max-w-[80vw] lg:max-h-[90vh] flex"
              onLoad={(e) => {}}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
