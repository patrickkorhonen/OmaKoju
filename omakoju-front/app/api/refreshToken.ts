

const refreshToken = async (token: string) => {
    try {
        const response = await fetch("http://localhost:4000/auth/refresh", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          });

        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to refresh token');
        }
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw error;
    }
};

export default refreshToken;