
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
    if (response.ok) {
      console.log(data);
      return Response.json(data);
    }
  } catch (err) {
    console.log(err);
    return new Response("error", {
      status: 400,
    });
  }
}
