import Image from "next/image";
import { useState } from "react";
import { CreateShop } from "../api/shop";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop";
import Slider from "@mui/material/Slider";
import getCroppedImgLogo from "./cropImageLogo";
import getCroppedImgBanner from "./cropImageBanner";

interface ShopImageFormProps {
  handleBack: () => void;
  shopName: string;
  description: string;
}

export default function ShopImageForm({
  handleBack,
  shopName,
  description,
}: ShopImageFormProps) {
  const [logo, setLogo] = useState("");
  const [banner, setBanner] = useState("");
  const [cropLogo, setCropLogo] = useState<Point>({ x: 0, y: 0 });
  const [cropBanner, setCropBanner] = useState<Point>({ x: 0, y: 0 });
  const [zoomLogo, setZoomLogo] = useState(1);
  const [zoomBanner, setZoomBanner] = useState(1);
  const [croppedLogo, setCroppedLogo] = useState<string | null>(null);
  const [croppedBanner, setCroppedBanner] = useState<string | null>(null);
  const [pixLogo, setPixLogo] = useState<Area>();
  const [pixBanner, setPixBanner] = useState<Area>();

  const onCropChangeLogo = (crop: Point) => {
    setCropLogo(crop);
  };
  const onCropChangeBanner = (crop: Point) => {
    setCropBanner(crop);
  };

  const onCropCompleteLogo = (croppedArea: Area, croppedAreaPixels: Area) => {
    setPixLogo(croppedAreaPixels);
  };

  const onCropCompleteBanner = (croppedArea: Area, croppedAreaPixels: Area) => {
    setPixBanner(croppedAreaPixels);
  };

  const onZoomChangeLogo = (zoom: number) => {
    setZoomLogo(zoom);
  };

  const onZoomChangeBanner = (zoom: number) => {
    setZoomBanner(zoom);
  };

  const setCroppedImageLogo = async () => {
    try {
      const croppedImage = await getCroppedImgLogo(logo, pixLogo);
      setCroppedLogo(croppedImage);
    } catch (e) {
      console.error(e);
    }
  };

  const setCroppedImageBanner = async () => {
    try {
      const croppedImage = await getCroppedImgBanner(banner, pixBanner);
      setCroppedBanner(croppedImage);
    } catch (e) {
      console.error(e);
    }
  };

  const createShop = async () => {
    if (shopName && description) {
      const response = await CreateShop(shopName, description, croppedLogo!, croppedBanner);
      if (response && response.ok) {
        window.location.replace("/");
      } else {
      const errorMessage = await response.text();
      alert(`Shop creation failed: ${errorMessage}`);
      }
    }
  };

  return (
    <div>
      <label htmlFor="logo" className="text-sm font-medium text-gray-700">
        Logo*
      </label>
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        name="logo"
        id="logo"
        className="p-4 mb-4 w-full border border-gray-300 focus:border-black outline-none rounded-md"
        onChange={(e) => {
          if (e.target.files) {
            setLogo(URL.createObjectURL(e.target.files[0]));
          }
        }}
      />
      {logo && (
        <div>
          <div className="relative w-full h-60">
            <div className="">
              <Cropper
                image={logo}
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
              className="flex place-self-center"
              src={croppedLogo}
              width={150}
              height={150}
              alt="logo"
            />
          )}
        </div>
      )}
      <label htmlFor="banner" className="text-sm font-medium text-gray-700">
        Banner
      </label>
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        name="banner"
        id="banner"
        className="p-4 mb-4 w-full border border-gray-300 focus:border-black outline-none rounded-md"
        onChange={(e) => {
          if (e.target.files) {
            setBanner(URL.createObjectURL(e.target.files[0]));
          }
        }}
      />
      {banner && (
        <div>
          <div className="relative w-full h-60">
            <div className="">
              <Cropper
                image={banner}
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
      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={handleBack}
          className="bg-red-500 text-white rounded font-bold p-2"
        >
          Back
        </button>
        <button
          disabled={!shopName || !description || croppedLogo === null}
          onClick={() => createShop()}
          className={
            shopName && description && croppedLogo
              ? "bg-bgGreen rounded font-bold text-white col-span-2 p-2"
              : "bg-[#617f65] rounded cursor-default font-bold text-white col-span-2 p-2"
          }
        >
          Create
        </button>
      </div>
    </div>
  );
}
