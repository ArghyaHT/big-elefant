import { sanityClient } from "./sanityClient";

    export const refreshLoggedInUser = async (email, setloggedInuser) => {
    try {
        const updatedUser = await sanityClient.fetch(
            `*[_type == "customer" && email == $email][0]`,
            { email }
        );

        if (updatedUser) {
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setloggedInuser(updatedUser);
        }
    } catch (error) {
        console.error("Failed to refresh user data:", error);
    }
};