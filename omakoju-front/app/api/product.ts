export async function CreateProduct(
  shopId: number,
  name: string,
  price: number,
  stock: number,
  imageUrl: string | null
) {
  try {
    const response = await fetch("http://localhost:4000/product/add", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shopId, name, price, stock, imageUrl }),
    });
    const data = await response.json();
    if (response.ok) {
      return new Response("Product successfully created.", {
        status: 200,
      });
    } else {
      console.log("Error response from server:", data.message);
      return new Response(data.message || "Error during product addition.", {
        status: response.status,
      });
    }
  } catch (err) {
    console.log("error", err);
  }
}

export async function GetProducts(shopId: string) {
  try {
    const response = await fetch(
      `http://localhost:4000/product/shop-products/${shopId}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (response.ok && data) {
      return Response.json(data);
    } else {
      return new Response("Couldn't fetch products", {
        status: 400,
      });
    }
  } catch (err) {
    console.log("error", err);
  }
}
