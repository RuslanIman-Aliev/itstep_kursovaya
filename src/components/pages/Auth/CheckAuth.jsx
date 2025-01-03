export const checkAuth = async () => {
    try {
        const response = await fetch("https://localhost:7152/api/user/check-auth", {
            method: "GET",
            credentials: "include",
        });

        if (response.ok) return true;

        if (response.status === 401) {
            const refreshResponse = await fetch("https://localhost:7152/api/user/refresh-token", {
                method: "POST",
                credentials: "include",
            });

            return refreshResponse.ok;
        }

        return false;
    } catch (error) {
        console.error("Auth check failed:", error);
        return false;
    }
};
