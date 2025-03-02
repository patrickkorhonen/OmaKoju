"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { useState, SetStateAction, Dispatch } from "react";
import Switch from "react-switch";
import LogoDialog from "./logoDialog";
import BannerDialog from "./bannerDialog";
import { Shop } from "@/interface";
import { UpdateShop } from "@/app/api/shop";

interface modifyShopInterface {
  shop: Shop;
  userShops: Shop[];
  setUserShops: Dispatch<SetStateAction<Shop[]>>;
}

export default function ModifyShopDialog({
  shop,
  userShops,
  setUserShops,
}: 
modifyShopInterface) {
  const [newName, setNewName] = useState<string>();
  const [newDescription, setNewDescription] = useState<string>();
  const [newActive, setNewActive] = useState<boolean>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [newLogo, setNewLogo] = useState<string>();
  const [newBanner, setNewBanner] = useState<string>();

  const handleUpdate = async (shop: Shop) => {
    if (shop.id && newName && newDescription && newLogo && newBanner) {
      let bannerUpdate = null;
      if (
        shop.bannerPicture != newBanner &&
        "/photos/default_banner.png" != newBanner
      ) {
        bannerUpdate = newBanner;
      }
      const response = await UpdateShop(
        shop.id,
        newName,
        newDescription,
        newActive!,
        newLogo === shop.logoPicture ? null : newLogo!,
        bannerUpdate
      );
      console.log(response);
      if (response.ok) {
        shop.shopName = newName;
        shop.description = newDescription;
        shop.isActive = newActive!;
        shop.logoPicture = newLogo!;
        shop.bannerPicture = newBanner!;
        setUserShops([...userShops]);
      } else {
        setErrorMessage("Shop with this name already exists");
      }
    }
  };

  const handleActive = () => {
    if (newActive) {
      setNewActive(false);
    } else {
      setNewActive(true);
    }
  };

  const handleNewLogo = (logo: string) => {
    setNewLogo(logo);
  };

  const handleNewBanner = (banner: string) => {
    setNewBanner(banner);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          onClick={() => {
            setNewName(shop.shopName);
            setNewDescription(shop.description);
            setNewActive(shop.isActive);
            setErrorMessage("");
            setNewLogo(shop.logoPicture);
            setNewBanner(
              shop.bannerPicture
                ? shop.bannerPicture
                : "/photos/default_banner.png"
            );
          }}
        >
          <Pencil size={20} />
        </button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Edit shop</DialogTitle>
          <DialogDescription>Make changes to your shop here.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">
              Shop name
            </label>
            <span className="flex flex-col col-span-3">
              <input
                id="name"
                className="p-2 border rounded"
                value={newName}
                onChange={(e) => {
                  setNewName(e.target.value);
                  setErrorMessage("");
                }}
              />
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </span>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="description" className="text-right">
              Description
            </label>
            <textarea
              id="description"
              className="col-span-3 max-h-80 border rounded p-2"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="active" className="text-right">
              active
            </label>
            <Switch
              id="active"
              onChange={() => handleActive()}
              checked={newActive!}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="logo" className="text-right">
              logo
            </label>
            <LogoDialog logo={newLogo!} handleNewLogo={handleNewLogo} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="banner" className="text-right">
              banner
            </label>
            <BannerDialog
              banner={newBanner!}
              handleNewBanner={handleNewBanner}
            />
          </div>
        </div>
        <DialogFooter>
          <div className="flex justify-between w-full">
            <DialogClose>
              <div className="bg-red-600 text-white p-2 rounded font-bold">
                Cancel
              </div>
            </DialogClose>
            <button
              onClick={() => handleUpdate(shop)}
              className="bg-green-600 text-white p-2 rounded font-bold"
            >
              Save changes
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
