import Link from "next/link";

export default function Button({
    text,
    color,
    type = "button",
}: {
    text: string;
    color: string;
    type?: "submit" | "reset" | "button";
}) {
    return (
        <button
            type={type}
            className={`bg-blue-600 hover:bg-blue-700 active:scale-[.98] py-4 px-16 rounded-md text-white shadow-md focus:border-0`}
        >
            {text}
        </button>
    );
}

export function LinkButton({ text, color, dest }: { text: string; color: string; dest: string }) {
    return (
        <Link href={dest}>
            <Button text={text} color={color} />
        </Link>
    );
}
