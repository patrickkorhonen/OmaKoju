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
      return Response.json(data);
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

export async function GetProduct(id: string) {
  try {
    const response = await fetch(
      `http://localhost:4000/product/${id}`,
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
      return new Response("Couldn't fetch product", {
        status: 400,
      });
    }
  } catch (err) {
    console.log("error", err);
  }
}

export async function DeleteProduct(shopId: number, id: number) {
  try {
    const response = await fetch(
      `http://localhost:4000/product/delete`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shopId, id }),
      }
    )
    if (response.ok) {
      return new Response("deleted", {
        status: 200,
      });
    } else {
      return new Response("Delete failed", {
        status: 404,
      });
    }
  } catch (err) {
    console.log("error", err)
    return new Response("error", {
      status: 400,
    });
  }
}
