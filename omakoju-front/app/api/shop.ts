
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

export async function CreateShop(shopName: string, description: string) {
  console.log('sit täällä', shopName, description);
  try {    
    const response = await fetch("http://localhost:4000/shop/create", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shopName, description }),
    });
    const data = await response.json();
    console.log("kauppadata", data);
    if (response.ok) {
      return new Response("Shop successfully created.", {
        status: 200,
      });
    }
  } catch (err) {
    console.log(err);
    return new Response("error", {
      status: 400,
    });
  }
}
