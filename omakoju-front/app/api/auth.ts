export async function LogIn(email: string, password: string) {
        try {
          const response = await fetch("http://localhost:4000/auth/login", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });
          return response
        } catch (error) {
          console.error(error);
        }
}

export async function SignUp(email: string, password: string, name: string) {
    try {
      const response = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });
      return response
    } catch (error) {
      console.error(error);
    }
}