import { LinkButton } from "@/components/Button";

export default function Page() {
    return (
        <div className="flex flex-col justify-center items-center my-28 gap-14 flex-1">
            <div className="flex items-center justify-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24">
                    <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 7v4a1 1 0 0 0 1 1h3m0-5v10m3-7v6a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2m0-4V8a1 1 0 0 0-1-1h-2m6 0v4a1 1 0 0 0 1 1h3m0-5v10M3 3l18 18"
                    />
                </svg>
                <span className="text-xl underline">Página não econtrada</span>
            </div>
            <LinkButton text="Voltar à página inicial" color="blue" dest="/" />
        </div>
    );
}
