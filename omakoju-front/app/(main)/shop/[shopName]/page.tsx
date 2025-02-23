import ShopComponent from "@/app/components/shopComponent";

export default async function Shop({
  params,
}: {
  params: Promise<{ shopName: string }>;
}) {
  const slug = (await params).shopName;

  return (
    <ShopComponent id={slug}/>
  );
}
