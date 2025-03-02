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
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface shop {
  id: string;
  name: string;
}

export default function DeleteShopDialog({ id, name }: shop) {
  const [deleteText, setDeleteText] = useState<string>("")

  return (
    <Dialog>
      <DialogTrigger>
        <Trash2 size={20} className="text-red-500" />
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription className="text-gray-600">
            This action cannot be undone. This will permanently delete your shop
            and remove shop data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="flex text-sm">
          <p>Type</p>
          &nbsp;
          <p className="text-red-500 text-nowrap font-semibold">
            delete {name}
          </p>
          &nbsp;
          <p>to delete the shop.</p>
        </div>
        <input value={deleteText} onChange={(e) => setDeleteText(e.target.value)} className="border rounded-lg p-2 outline-0"></input>
      <DialogFooter>
        <div className="flex justify-between w-full">
          <DialogClose>
            <div className="bg-black text-white p-2 rounded font-bold">
              Cancel
            </div>
          </DialogClose>
          <DialogClose disabled={deleteText != `delete ${name}`} onClick={() => console.log("kaupan poisto", deleteText)} className={deleteText != `delete ${name}` ? "bg-red-400 text-white p-2 rounded font-bold" : "bg-red-600 text-white p-2 rounded font-bold"}>
            Delete shop
          </DialogClose>
        </div>
      </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
