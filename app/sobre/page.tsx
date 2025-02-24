import { LinkButton } from "@/components/Button";

export default function Page() {
    return (
        <div className="flex flex-col justify-center items-center flex-1">
            <div className="w-full sobre-pic-1 shadow-2xl">
                <div className="min-h-[250px] backdrop-blur-md bg-black/30 flex justify-center items-center">
                    <h1 className="text-amber-500 text-4xl sm:text-7xl">NAVALHA REAL</h1>
                </div>
            </div>
            <div className="p-4 lg:p-10 flex flex-col gap-16 xl:gap-36 items-center container lg:text-xl">
                <p className="text-justify">
                    No Navalha Real, acreditamos que um bom corte de cabelo vai além da estética – ele é uma expressão
                    de identidade, confiança e poder. Com anos de experiência no mercado da beleza masculina e um
                    compromisso inabalável com a qualidade, nos tornamos referência para homens que buscam não apenas um
                    corte, mas uma verdadeira experiência de cuidado e sofisticação. Nosso ambiente foi pensado para
                    proporcionar conforto e exclusividade, garantindo que cada cliente se sinta especial desde o momento
                    em que entra pela porta. Oferecemos cortes clássicos e modernos, modelagem de barba com acabamento
                    impecável, tratamentos capilares para a saúde dos fios e coloração masculina para quem deseja
                    renovar o visual com naturalidade. Trabalhamos com produtos de alta qualidade e profissionais
                    capacitados, sempre alinhados às últimas tendências da barbearia. Seja para um corte clássico, um
                    estilo moderno ou um ritual completo de barbear, aqui você encontra um serviço de alto nível, feito
                    com atenção aos detalhes e dedicação. Venha viver a experiência Navalha Real. Seu estilo, nossa
                    missão.
                </p>
                <LinkButton text="Fazer um agendamento" color="blue" dest="/agendar" />
            </div>
        </div>
    );
}
