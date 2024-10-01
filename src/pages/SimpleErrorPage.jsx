import {Link, useRouteError} from "react-router-dom";

const SimpleErrorPage = () => {
    const errorResponse = useRouteError();
    console.error(errorResponse);
    if (errorResponse.status === 404) {
        return (
            <div
                className="bg-white text-lightmode dark:text-darkmode dark:bg-gray-800 grid h-screen place-content-center px-4">
                <div className="text-center">
                    <h1 className="text-9xl font-black text-gray-200">404</h1>

                    <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</p>

                    <p className="mt-4 text-gray-500">Cette page est introuvable...</p>

                    <Link
                        to={"/"}
                        className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
                    >
                        Retour
                    </Link>
                </div>
            </div>
        );
    } else {
        return (
            <div
                className="bg-white text-lightmode dark:text-darkmode dark:bg-gray-800 grid h-screen place-content-center px-4">
                <div className="text-center">
                    <h1 className="text-9xl font-black text-gray-200">{errorResponse.status}</h1>

                    <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Une erreur est
                        survenue!</p>

                    <p className="mt-4 text-gray-500">{errorResponse.statusText}</p>

                    <Link
                        to={"/"}
                        className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
                    >
                        Retour
                    </Link>
                </div>
            </div>
        );
    }
}
export default SimpleErrorPage;