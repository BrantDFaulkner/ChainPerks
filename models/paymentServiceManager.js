class PaymentServiceManager {
    constructor(paymentTokenName, paymentTokenSymbol, paymentTokenAddress, rewardMultiplier) {
        this.paymentTokenName = paymentTokenName
        this.paymentTokenSymbol = paymentTokenSymbol
        this.paymentTokenAddress = paymentTokenAddress
        this.rewardMultiplier = rewardMultiplier
    }
}

export { PaymentServiceManager }