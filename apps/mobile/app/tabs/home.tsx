import { getAccessToken } from "@/src/api/auth";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function Home (){
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        getAccessToken().then((storedToken) => {
            setToken(storedToken);
        });
    }, []);

    if (token === undefined) {
        return null;
    }
    if (!token) {
        return <Redirect href="/auth/login" />;
    }
    return (
        <div>
            <h1>Welcome to the Home Screen</h1>
            {token ? (
                <p>Logged in with token: {token}</p>
            ) : (
                <p>Not logged in</p>
            )}
        </div>
    );
}