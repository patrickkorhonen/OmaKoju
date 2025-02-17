import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default async function Shop({
  params,
}: {
  params: Promise<{ shopName: string }>;
}) {
  const slug = (await params).shopName;
  const name = slug.replace("-", " ");
  return (
    <main className="min-h-screen my-4 bg-white">
      <div className="w-2/3 place-self-center">
        <div className="flex w-full h-60 place-self-center rounded-xl mb-4">
          <Image
            src={"/photos/banner.jpg"}
            alt={name}
            width={0}
            height={0}
            style={{ width: "100%", height: "auto" }}
            className="rounded-xl object-cover"
          />
        </div>
        <section className="grid grid-cols-7 gap-4 h-40 overflow-hidden">
          <div className="relative w-40 h-40">
            <Image
              src={"/photos/computer-profile.avif"}
              alt={name}
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col justify-between col-span-2">
            <p className="font-bold text-4xl">{name}</p>
            <span>
              <p className="text-slate-500">dummyemail@example.com</p>
              <p className="text-slate-500">08012345678</p>
              <p className="text-slate-500">Lagos, Nigeria</p>
            </span>
          </div>
          <div className="col-span-4 bg-slate-100 rounded-md p-4">
            <Dialog>
              <DialogTrigger className="text-left">
                <p className="line-clamp-5">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industrys
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle>Description</DialogTitle>
                  <DialogDescription>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industrys
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </div>
    </main>
  );
}
