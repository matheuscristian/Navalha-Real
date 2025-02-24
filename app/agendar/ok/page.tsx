import { LinkButton } from "@/components/Button";

export default function Page() {
    return (
        <div className="flex flex-col justify-center items-center my-28 gap-14 flex-1">
            <div className="flex items-center justify-center gap-3">
                <h1>Agendamento feito!</h1>
            </div>
            <LinkButton text="Voltar à página de agendamento" color="blue" dest="/agendar" />
        </div>
    );
}
