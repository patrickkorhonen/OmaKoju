"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import Image from "next/image";
import Cropper from "react-easy-crop";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import { Point, Area } from "react-easy-crop";
import getCroppedImgBanner from "@/app/components/cropImageBanner";
import { Input } from "@/components/ui/input";
import { BsUpload } from "react-icons/bs";

interface bannerInterface {
  banner: string;
  handleNewBanner: (banner: string) => void;
}

export default function BannerDialog({
  banner,
  handleNewBanner,
}: bannerInterface) {
  const [newBanner, setNewBanner] = useState<string>();
  const [cropBanner, setCropBanner] = useState<Point>({ x: 0, y: 0 });
  const [zoomBanner, setZoomBanner] = useState(1);
  const [pixBanner, setPixBanner] = useState<Area>();
  const [croppedBanner, setCroppedBanner] = useState<string | null>(null);

  const onCropChangeBanner = (crop: Point) => {
    setCropBanner(crop);
  };

  const onCropCompleteBanner = (croppedArea: Area, croppedAreaPixels: Area) => {
    setPixBanner(croppedAreaPixels);
  };
  const onZoomChangeBanner = (zoom: number) => {
    setZoomBanner(zoom);
  };

  const setCroppedImageBanner = async () => {
    try {
      const croppedImage = await getCroppedImgBanner(newBanner, pixBanner);
      setCroppedBanner(croppedImage);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Dialog>
      <DialogTrigger className="col-span-3">
        <Image
          className="border rounded-xl"
          src={banner || "/photos/default_banner.png"}
          alt={"banner"}
          width={0}
          height={0}
          style={{ width: "100%", height: "auto" }}
        />
      </DialogTrigger>
      <DialogContent className="bg-white max-h-[600px] col-span-3 overflow-y-scroll">
        <div className="max-h-full flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Change the banner of your shop.</DialogTitle>
          </DialogHeader>
          <p>Your current banner</p>
          <div className="flex flex-col gap-4 items-center">
            <Image
              className="border"
              src={banner || "/photos/default_banner.png"}
              alt={"banner"}
              width={0}
              height={0}
              style={{ width: "100%", height: "auto" }}
            />
            <label
              htmlFor="banner"
              className="text-sm font-medium flex items-center gap-4 p-4 w-max justify-center rounded-md cursor-pointer border text-gray-700 border-gray-300 hover:bg-gray-100"
            >
              <BsUpload className="hidden sm:block" />
              Upload New Banner
            </label>
            <Input
              type="file"
              accept=".jpg, .jpeg, .png, .avif"
              className="hidden"
              name="banner"
              id="banner"
              //className="p-4 w-full border border-gray-300 focus:border-black outline-none rounded-md"
              onChange={(e) => {
                if (e.target.files) {
                  setNewBanner(URL.createObjectURL(e.target.files[0]));
                }
              }}
            />
          </div>
          {newBanner && (
            <div>
              <div className="relative w-full h-40">
                <div className="">
                  <Cropper
                    image={newBanner}
                    crop={cropBanner}
                    zoom={zoomBanner}
                    aspect={10 / 2}
                    showGrid={false}
                    onCropChange={onCropChangeBanner}
                    onCropComplete={onCropCompleteBanner}
                    onZoomChange={onZoomChangeBanner}
                  />
                </div>
              </div>
              <div className="-mt-10 px-4">
                <Slider
                  value={zoomBanner}
                  min={1}
                  max={3}
                  step={0.01}
                  aria-labelledby="Zoom"
                  onChange={(e, zoom) => setZoomBanner(Number(zoom))}
                  classes={{ root: "slider" }}
                  className="mt-10"
                />
              </div>
              <button
                onClick={setCroppedImageBanner}
                className="flex place-self-end rounded bg-blue-500 text-white font-bold px-4 py-2 mb-4"
              >
                Apply
              </button>
              {croppedBanner && (
                <Image
                  className="flex place-self-center mb-4"
                  src={croppedBanner}
                  width={0}
                  height={0}
                  style={{ width: "100%", height: "auto" }}
                  alt="banner"
                />
              )}
            </div>
          )}
          <DialogFooter>
            <div className="flex justify-between w-full">
              <DialogClose>
                <div className="bg-red-600 text-white p-2 rounded font-bold">
                  Cancel
                </div>
              </DialogClose>
              {croppedBanner && (
                <DialogClose
                  onClick={() => handleNewBanner(croppedBanner)}
                  className="bg-green-600 text-white p-2 rounded font-bold"
                >
                  Apply banner
                </DialogClose>
              )}
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
