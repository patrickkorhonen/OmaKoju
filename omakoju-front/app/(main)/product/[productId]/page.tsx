import ProductComponent from "../components/productComponent";

export default async function Product({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const slug = (await params).productId;


    return (
      <ProductComponent id={slug}/>
    );
}
