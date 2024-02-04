import express from 'express'
import bodyParser from 'body-parser'
import { WalletConnect } from './models/walletConnect.js';
import { ERC20TokenFactory } from './models/erc20TokenFactory.js';
import { PaymentServiceManager } from './models/paymentServiceManager.js';

const erc20TokenFactory = new ERC20TokenFactory
var wallet = null
var rewardToken = null
var paymentService = null

const app = express();
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.render('index', {wallet: wallet});
});

// CONNECT WALLET
app.post('/connect', async (req, res) => {
    wallet = new WalletConnect()
    await wallet.getAddress()

    res.redirect('back')
});

// REWARD TOKEN
app.get('/rewardToken', (req, res) => {
    res.render('rewardToken', {wallet: wallet, rewardToken: rewardToken});
});

app.post('/createRewardToken', async (req, res) => {
    rewardToken = await erc20TokenFactory.deployToken(
        req.body.tokenName,
        req.body.tokenSymbol,
        req.body.tokenDecimals,
        req.body.tokenInitialSupply)

    res.redirect('/rewardToken')
});

// PAYMENT SERVICE
app.get('/paymentService', (req, res) => {
    res.render('paymentService', {wallet: wallet, rewardToken: rewardToken, paymentService: paymentService});
});

app.post('/createPaymentService', async (req, res) => {
    paymentService = await new PaymentServiceManager(
        req.body.paymentTokenName,
        req.body.paymentTokenSymbol,
        req.body.paymentTokenAddress,
        req.body.rewardMultiplier)

    res.redirect('/paymentService')
});


app.listen(3000);
