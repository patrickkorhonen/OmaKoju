
export async function GETshops() {
  try {    
    const response = await fetch("http://localhost:4000/shop/all", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.ok) {
      return Response.json(data);
    }
  } catch {
    return new Response("error", {
      status: 400,
    });
  }
}

export async function GETshop(id: string) {
  try {    
    const response = await fetch(`http://localhost:4000/shop/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.ok && data) {
      return Response.json(data);
    } else {
      return new Response("Couldn't find the shop.", {
        status: 400,
      });
    }
  } catch (err) {
    console.log(err);
    return new Response("error", {
      status: 400,
    });
  }
}

export async function GETuserShops() {
  try {    
    const response = await fetch(`http://localhost:4000/shop/user`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.ok && data) {
      return Response.json(data);
    } else {
      return new Response("Couldn't find any shops.", {
        status: 204,
      });
    }
  } catch (err) {
    console.log(err);
    return new Response("error", {
      status: 400,
    });
  }
}

export async function CreateShop(shopName: string, description: string, croppedLogo: string, croppedBanner: string | null) {
  try {
    const requestBody: { shopName: string; description: string; croppedLogo: string; croppedBanner?: string | null } = { shopName, description, croppedLogo };
    if (croppedBanner) {
      requestBody.croppedBanner = croppedBanner;
    }
    
    const response = await fetch("http://localhost:4000/shop/create", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    const data = await response.json();
    if (response.ok) {
      return new Response("Shop successfully created.", {
        status: 200,
      });
    } else {
      console.log("Error response from server:", data.message);
      return new Response(data.message || "Error during shop creation.", {
        status: response.status,  
      });
    }
  } catch (err) {
    console.log(err);
    return new Response("error", {
      status: 400,
    });
  }
}

export async function UpdateShop(id: string, shopName: string, description: string, isActive: boolean) {
  try {    
    const response = await fetch("http://localhost:4000/shop/update", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, shopName, description, isActive }),
    });
    if (response.ok) {
      return new Response("Shop successfully updated.", {
        status: 200,
      });
    } else {
      return new Response("Couldn't update the shop.", {
        status: 204,
      });
    }
  } catch (err) {
    console.log(err);
    return new Response("error", {
      status: 400,
    });
  }
}
