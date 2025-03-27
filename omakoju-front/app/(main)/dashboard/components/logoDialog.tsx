"use client"
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
import getCroppedImgLogo from "@/app/components/cropImageLogo";
import { Input } from "@/components/ui/input";

interface logoInterface {
  logo: string;
  handleNewLogo: (logo: string) => void;
}

export default function LogoDialog({ logo, handleNewLogo }: logoInterface) {
  const [newLogo, setNewLogo] = useState<string>();
  const [cropLogo, setCropLogo] = useState<Point>({ x: 0, y: 0 });
  const [zoomLogo, setZoomLogo] = useState(1);
  const [pixLogo, setPixLogo] = useState<Area>();
  const [croppedLogo, setCroppedLogo] = useState<string | null>(null);

  const onCropChangeLogo = (crop: Point) => {
    setCropLogo(crop);
  };

  const onCropCompleteLogo = (croppedArea: Area, croppedAreaPixels: Area) => {
    setPixLogo(croppedAreaPixels);
  };
  const onZoomChangeLogo = (zoom: number) => {
    setZoomLogo(zoom);
  };

  const setCroppedImageLogo = async () => {
    try {
      const croppedImage = await getCroppedImgLogo(newLogo, pixLogo);
      setCroppedLogo(croppedImage);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Image
          className="border rounded-full"
          src={logo || "/photos/computer-profile.avif"}
          alt={"logo"}
          width={0}
          height={0}
          style={{ width: "80%", height: "auto" }}
        />
      </DialogTrigger>
      <DialogContent className="bg-white max-h-[600px] overflow-y-scroll">
        <div className="max-h-full flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Change the logo of your shop.</DialogTitle>
          </DialogHeader>
          <p>Your current logo</p>
          <div className="flex gap-4 items-center">
            <Image
              className="border rounded-full"
              src={logo || "/photos/computer-profile.avif"}
              alt={"logo"}
              width={0}
              height={0}
              style={{ width: "30%", height: "auto" }}
            />
            <Input
              type="file"
              accept=".jpg, .jpeg, .png, .avif"
              name="logo"
              id="logo"
              //className="p-4 w-full border border-gray-300 focus:border-black outline-none rounded-md"
              onChange={(e) => {
                if (e.target.files) {
                  setNewLogo(URL.createObjectURL(e.target.files[0]));
                }
              }}
            />
          </div>
          {newLogo && (
            <div>
              <div className="relative w-full h-40">
                <div className="">
                  <Cropper
                    image={newLogo}
                    crop={cropLogo}
                    zoom={zoomLogo}
                    aspect={1}
                    cropShape="round"
                    showGrid={false}
                    onCropChange={onCropChangeLogo}
                    onCropComplete={onCropCompleteLogo}
                    onZoomChange={onZoomChangeLogo}
                  />
                </div>
              </div>
              <div className="-mt-10 px-4">
                <Slider
                  value={zoomLogo}
                  min={1}
                  max={3}
                  step={0.01}
                  aria-labelledby="Zoom"
                  onChange={(e, zoom) => setZoomLogo(Number(zoom))}
                  classes={{ root: "slider" }}
                  className="mt-10"
                />
              </div>
              <button
                onClick={setCroppedImageLogo}
                className="flex place-self-end rounded bg-blue-500 text-white font-bold px-4 py-2 mb-4"
              >
                Apply
              </button>
              {croppedLogo && (
                <Image
                  className="flex place-self-center border rounded-full"
                  src={croppedLogo}
                  width={150}
                  height={150}
                  alt="logo"
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
              {croppedLogo && (
                <DialogClose
                  onClick={() => handleNewLogo(croppedLogo)}
                  className="bg-green-600 text-white p-2 rounded font-bold"
                >
                  Apply logo
                </DialogClose>
              )}
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
