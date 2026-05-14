
const gsa = (n: number) => {
    return "["+(Array.from({length: n }, () => Math.floor(Math.random() * (15 - 1 + 1) + 1))).toString() + "]";
}

export const generateValues = () => {
    const n = Math.floor(Math.random() * (12 - 4 + 1) + 4);
    const vs = gsa(n);
    const ws = gsa(n);
    const W = (Math.floor(Math.random() * (22 - 5 + 1) + 5)).toString();

    return {vs, ws, W};
}