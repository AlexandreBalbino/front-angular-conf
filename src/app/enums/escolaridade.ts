
export enum Escolaridade {
    Infantil,
    Fundamental,
    Medio,
    Superior
}

export class EscolaridadeHelper {
    private descricoes = new Map<number, string>([
        [Escolaridade.Infantil, "Infantil"],
        [Escolaridade.Fundamental, "Fundamental"],
        [Escolaridade.Medio, "Médio"],
        [Escolaridade.Superior, "Superior"],
    ]);

    obtemDescricaoEnum = (escolaridade: Escolaridade) => {
        return this.descricoes.get(escolaridade);
    }

    obtemEnum = () => [Escolaridade.Infantil,
    Escolaridade.Fundamental,
    Escolaridade.Medio,
    Escolaridade.Superior];
}

