import hardhat from 'hardhat';

const {ethers} = hardhat;
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
    const [owner] = await ethers.getSigners();
    
    const receiverAddress = "0xF10887dDB67085A20A272507ddD95D6b4Fd20e09"
    // const receiverAddress = "INSERT ADDRESS HERE";
    console.log("Receiver address: " + receiverAddress);

    const usdcToken = process.env.USDC_ADDR;
    const usdtToken = process.env.USDT_ADDR;
    if (!usdcToken) {
        throw new Error("USDC token address is not defined in the environment variables");
    }
    if (!usdtToken) {
        throw new Error("USDT token address is not defined in the environment variables");
    }
    const usdcTokenAddress = await ethers.getContractAt("USDCMock", usdcToken);
    const usdtTokenAddress = await ethers.getContractAt("USDCMock", usdtToken);

    console.log("Transfering USDC to tokenservice...");
    await usdcTokenAddress.transfer(receiverAddress, 5000000);
    console.log("USDC transferred successfully!!!");

    console.log("Transfering USDT to tokenservice...");
    await usdtTokenAddress.transfer(receiverAddress, 5000000);
    console.log("USDT transferred successfully!!!");

    console.log("Transfering ETH to tokenservice...");
    await owner.sendTransaction({
        to: receiverAddress,
        value: ethers.parseEther("0.001")
      });

    console.log("ETH transferred successfully!!!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});