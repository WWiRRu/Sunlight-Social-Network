import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import api from "../services/api.js";
import { redirect } from "react-router-dom";
import {useCookies} from "react-cookie";

export const profileLoader = async ({ params, request }) => {
    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
        const [key, value] = cookie.split('=');
        acc[key.trim()] = decodeURIComponent(value);
        return acc;
    }, {});
    const token = cookies.token;
    const userId = params.id;
    if (!token) {
        return redirect("/login");
    }

    if (!userId) {
        throw new Response("ID utilisateur non valide", { status: 400 });
    }
    try {
        const userProfile = await api.get("/user/" + userId, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const userFollowing = await api.get("/user/following/" + userId, {
            headers: {Authorization: `Bearer ${token}` },
        })
        return {
            profileUser: userProfile.data,
            isFollowing: userFollowing.data.isFollowing,
        };
    } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur :", error);
        throw new Response("Erreur lors de la récupération des données", { status: 500 });
    }
};

function ProfilePage() {
    const { id } = useParams();
    const [cookies] = useCookies(["token"]);
    const [user, setUser] = useState(null);
    const { profileUser, isFollowing: initialIsFollowing } = useLoaderData();
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
    const navigate = useNavigate();

    const fetchUser = async (authToken) => {
        try {
            const response = await api.get("/user", {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            setUser(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des données utilisateur :", error);
            navigate("/login");
        }
    };
    fetchUser(cookies.token);

    const handleFollow = async () => {
        try {
            await api.post(`/user/follow/${id}`, {}, {
                headers: { Authorization: `Bearer ${cookies.token}` },
            });
            setIsFollowing(true);
        } catch (err) {
            console.error("Erreur lors du suivi de l'utilisateur.");
        }
    };

    const handleUnfollow = async () => {
        try {
            await api.delete(`/user/unfollow/${id}`, {
                headers: { Authorization: `Bearer ${cookies.token}` },
            });
            setIsFollowing(false);
        } catch (err) {
            console.error("Erreur lors de l'annulation du suivi de l'utilisateur.");
        }
    };

    return (
        <section className="mt-20">
            {user && user.id === profileUser.id ? (
                <>
                    {user.profile_picture ? <img
                            src={`https://play.godmoon.fr:27205/profile-picture/$file_picture}`}
                            alt={`Image de ${user?.username}`}
                            className="w-32 h-32 rounded-full"
                        /> :
                        <img
                            src="../assets/default_image.png"
                            alt={`Default user image`}
                            className="w-32 h-32 rounded-full"
                        />}
                    <h5 className="text-lg font-bold mt-4">{user?.username}</h5>
                    {user.bio ? (<p>{user.bio}</p>) : null}
                </>
            ) : (
                <>
                    {profileUser.profile_picture ? <img
                            src={`https://play.godmoon.fr:27205/profile-picture/${profileUser.profile_picture}`}
                            alt={`Image de ${user?.username}`}
                            className="w-32 h-32 rounded-full"
                        /> :
                        <img
                            src="../assets/default_image.png"
                            alt={`Default user image`}
                            className="w-32 h-32 rounded-full"
                        />}
                    <h5 className="text-lg font-bold mt-4">{profileUser?.username}</h5>
                    {profileUser.bio ? (<p>{profileUser.bio}</p>) : null}
                    {isFollowing ? (
                        <button
                            onClick={handleUnfollow}
                            className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
                        >
                            Se désabonner
                        </button>
                    ) : (
                        <button
                            onClick={handleFollow}
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                        >
                            Suivre
                        </button>
                    )}
                </>
            )}
        </section>
    );
}

export default ProfilePage;
