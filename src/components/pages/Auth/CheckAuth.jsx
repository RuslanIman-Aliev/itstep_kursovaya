export const checkAuth = async () => {
    try {
        console.log("Sending check-auth request...");
        console.log(document.cookie);
        const response = await fetch("https://localhost:7152/api/user/check-auth", {
            method: "GET",
            credentials: "include",
        });

        if (response.ok) return true;
        console.log(document.cookie);
        if (response.status === 401) {
            console.log("Sending refresh-token request...");
            console.log(document.cookie);
            const refreshResponse = await fetch("https://localhost:7152/api/user/refresh-token", {
                method: "POST",
                credentials: "include",
            });

            if (refreshResponse.ok) {
                console.log("Tokens refreshed successfully!");
                return true;
            }
        }

        return false;
    } catch (error) {
        console.error("Auth check failed:", error);
        return false;
    }
};
