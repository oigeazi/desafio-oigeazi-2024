class RecintosZoo {

    constructor () {
        this.recintos = [
            { numero: 1, bioma: ['savana'], tamanho: 10, animais: ['macaco'], espacoOcupado: 3 },
            { numero: 2, bioma: ['floresta'], tamanho: 5, animais: [], espacoOcupado: 0 },
            { numero: 3, bioma: ['savana', 'rio'], tamanho: 7, animais: ['gazela'], espacoOcupado: 2 },
            { numero: 4, bioma: ['rio'], tamanho: 8, animais: [], espacoOcupado: 0 },
            { numero: 5, bioma: ['savana'], tamanho: 9, animais: ['leao'], espacoOcupado: 3 }
        ];

        this.animais = {
            LEAO: { tamanho: 3, biomas: ['savana'], carnivoro: true },
            LEOPARDO: { tamanho: 2, biomas: ['savana'], carnivoro: true },
            CROCODILO: { tamanho: 3, biomas: ['rio'], carnivoro: true },
            MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
            GAZELA: { tamanho: 2, biomas: ['savana'], carnivoro: false },
            HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false }
        }
    }

    verificarConforto(recinto, novoAnimal, quantidade) {
        if (novoAnimal.carnivoro) {
            if (recinto.animais.length > 0 && !recinto.animais.every(a => this.animais[a.toUpperCase()].carnivoro)) {
                return false;
            }
        } else {
            if (recinto.animais.some(a => this.animais[a.toUpperCase()].carnivoro)) {
                return false;
            }
        }

        if (novoAnimal === this.animais.HIPOPOTAMO && (!recinto.bioma.includes('savana') || !recinto.bioma.includes('rio'))) {
            return false;
        }

        if (novoAnimal === this.animais.MACACO && recinto.animais.length === 0 && quantidade <= 1) {
            return false;
        }

        const espacoNecessario = novoAnimal.tamanho * quantidade;
        const espacoDisponivel = recinto.tamanho - recinto.espacoOcupado;

        return espacoNecessario <= espacoDisponivel - this.calcularEspacoExtra(recinto, novoAnimal);
    }

    calcularEspacoExtra(recinto, novoAnimal) {
        if (recinto.animais.length > 0 && recinto.animais[0].toUpperCase() !== novoAnimal) {
            return 1;
        }

        return 0;
    }

    analisaRecintos(animal, quantidade) {
        animal = animal.toUpperCase();

        if (!this.animais[animal]) {
            return { erro: "Animal inválido" };
        }

        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: "Quantidade inválida" };
        }

        const infoAnimal = this.animais[animal];
        const recintosViaveis = [];

        for (let recinto of this.recintos) {
            const biomaValido = recinto.bioma.some(bioma => infoAnimal.biomas.includes(bioma));

            if (biomaValido) {
                if (this.verificarConforto(recinto, infoAnimal, quantidade)) {
                    const espacoNecessario = infoAnimal.tamanho * quantidade;
                    const espacoLivre = recinto.tamanho - (recinto.espacoOcupado + espacoNecessario + this.calcularEspacoExtra(recinto, animal));
                    recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanho})`);
                }
            }
        }

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        return { recintosViaveis };
    }
}

export { RecintosZoo as RecintosZoo };