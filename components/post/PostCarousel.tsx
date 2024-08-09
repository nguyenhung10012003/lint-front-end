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
import { MediaType } from "@/types/post";

export default function PostCarousel({
  medias,
}: {
  medias: {
    url: string;
    type: MediaType;
  }[];
}) {
  const [selected, setSelected] = useState<undefined | number>();
  return (
    <>
      <Carousel>
        <CarouselContent className="mt-2">
          {medias.map((item, index) => (
            <CarouselItem key={index} className="flex">
              <div
                onClick={() => setSelected(index)}
                className="rounded-md flex max-h-[500px] h-full items-center border 
                dark:bg-black object-cover flex-wrap
                hover:cursor-pointer"
              >
                {item.type === MediaType.IMAGE ? (
                  <Image
                    src={item.url}
                    alt={`Post media ${index}`}
                    width={500}
                    height={500}
                    className="rounded-md"
                    onLoad={(e) => {}}
                  />
                ) : (
                  <video
                    src={item.url}
                    controls
                    width={500}
                    height={500}
                    className="rounded-md"
                    onLoad={(e) => {}}
                  />
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious variant="ghost" />
        <CarouselNext variant="ghost" />
      </Carousel>
      {selected !== undefined && (
        <Dialog open onOpenChange={() => setSelected(undefined)}>
          <DialogContent
            className="flex p-0 justify-center min-w-0 w-0"
            includeClose={false}
            aria-describedby={undefined}
          >
            {medias[selected].type === MediaType.IMAGE ? (
              <Image
                src={medias[selected].url}
                alt={``}
                width={1000}
                height={1000}
                className="object-contain max-w-[90vw] max-h-[95vh] lg:max-w-[80vw] lg:max-h-[90vh] flex"
                onLoad={(e) => {}}
              />
            ) : (
              <video
                src={medias[selected].url}
                controls
                autoPlay
                className="object-contain max-w-[90vw] max-h-[95vh] lg:max-w-[80vw] lg:max-h-[90vh] flex"
                onLoad={(e) => {}}
              />
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
