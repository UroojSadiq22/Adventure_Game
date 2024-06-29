import inquirer from "inquirer";
import chalk from "chalk";
class Player {
    name;
    fuel = 100;
    constructor(playerName) {
        this.name = playerName;
    }
    fuelIncrease() {
        this.fuel += 25;
    }
    fuelDecrease() {
        this.fuel -= 25;
    }
}
class Opponent {
    name;
    fuel = 100;
    constructor(opponentName) {
        this.name = opponentName;
    }
    fuelDecrease() {
        this.fuel -= 25;
    }
}
async function startAgain() {
    let startAgain = await inquirer.prompt({
        type: "confirm",
        name: "continue",
        message: chalk.yellowBright("Do you want to continue?"),
    });
    if (startAgain.continue) {
        await main();
    }
    else {
        process.exit();
    }
}
async function main() {
    console.log(chalk.magenta("\n Welcome to The Adventure Game \n"));
    await new Promise((resolve) => {
        setTimeout(resolve, 2000);
    });
    let userInput = await inquirer.prompt([
        {
            name: "myPlayer",
            type: "input",
            message: chalk.yellowBright("Enter the player name"),
        },
        {
            name: "opponent",
            type: "list",
            message: chalk.yellowBright("Select the opponent"),
            choices: ["Zombie", "Fortnite", "Titan"],
        },
    ]);
    let player = new Player(userInput.myPlayer);
    let opponent = new Opponent(userInput.opponent);
    while (true) {
        let matchStart = await inquirer.prompt({
            name: "operation",
            type: "list",
            message: chalk.yellowBright("Select the option"),
            choices: ["Attack", "Increase Your Fuel", "Run for Life..."],
        });
        if (matchStart.operation === "Attack") {
            let randomNumber = Math.floor(Math.random() * 2);
            if (randomNumber == 0) {
                //decrease player's fuel
                player.fuelDecrease();
                console.log(chalk.red(`\n${player.name}'s fuel is ${player.fuel}`));
                console.log(chalk.green(`${opponent.name}'s fuel is ${opponent.fuel}\n`));
            }
            if (player.fuel <= 0) {
                console.log(chalk.magenta("\nSorry! You Lost. Better Luck for Next Time\n"));
                await startAgain();
            }
            if (randomNumber == 1) {
                // decrease opponent's fuel
                opponent.fuelDecrease();
                console.log(chalk.green(`\n${player.name}'s fuel is ${player.fuel}`));
                console.log(chalk.red(`${opponent.name}'s fuel is ${opponent.fuel}\n`));
            }
            if (opponent.fuel <= 0) {
                console.log(chalk.magenta("\nCongragulations! You Win\n"));
                await startAgain();
            }
        }
        else if (matchStart.operation === "Increase Your Fuel") {
            if (player.fuel < 100) {
                player.fuelIncrease();
                console.log(chalk.green(`\nYour Fuel increases and becomes ${player.fuel}\n`));
            }
            else {
                console.log(chalk.magenta("Your fuel is already filled"));
            }
        }
        else {
            console.log(chalk.magenta("\nSorry! You Lost\n"));
            await startAgain();
        }
    }
}
main();
