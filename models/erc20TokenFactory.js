import { ERC20Token } from './erc20Token.js';

class ERC20TokenFactory {
    constructor() {}

    async deployToken(name, symbol, decimals, initialSupply) {
        const token = await new ERC20Token(name, symbol, decimals, initialSupply)
        return token
    }
}

export { ERC20TokenFactory }