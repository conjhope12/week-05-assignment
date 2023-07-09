    //Conrad Hope: Week 05 Object Orientation Programming Assignment

    // This first class is the parent class because the following objects and classes will be using the data from "Player".

class Player {
    constructor(name, position) {
        this.name = name;
        this.position = position;
    }
    
    describe() {
        return `${this.name} plays ${this.position}.`;
    }
}

    // The "Team" class is crucial for creating the drop down menu because it allows to orginize the "player" object by counting how many players are on that team.
    // Arrays are crucial for adding and updating multiple arguements.

class Team {
    constructor(name) {
        this.name = name;
        this.players = [];
    }
    
    // An "instanceof" operator provides a method to make sure someone can't pass in by adding a random  string or number to the array.
    // This operator will help us add a player to the array. So it won't allow random junk to be plugged in. 

    addPlayer(player) {
        if (player instanceof Player) {
            this.players.push(player);
        } else {
            throw new Error(`You can only add an instance of a Player. Argument is not a player: ${player}`);
        }
    }
    
    describe() {
        return `${this.name} has ${this.players.length} players.`;
    }
}

    // Null will basically mean that no teams are selected in the moment.
    // This class will be the main body for creating a functional drop down menu.
    // >> This class will use the classes above to assign the obects to preform different tasks in the drop down menu.

class Menu {
    constructor() {
        this.teams = [];
        this.selectedTeam = null;
    }
    
    // "Start" will be the back bone to accessing all of the different pop ups.

    start() {
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createTeam();
                    break;
                case '2':
                    this.viewTeam();
                    break;
                case '3':
                    this.deleteTeam();
                    break;
                case '4':
                    this.displayTeams();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert('Goodbye!');
    }
    
    // This will be the menu to appear after refreshing the html page.

    showMainMenuOptions() {
        return prompt(`
        0) exit
        1) create new team 
        2) view team
        3) delete team
        4) display all teams
        `);
    }
    
    // This menu is special to the "this.viewTeam" function.
    // New player names of the specific team can be added and deleted below the line.

    showTeamMenuOptions(teamInfo) {
        return prompt(`
        0) back
        1) create player
        2) delete player
        ---------------------
        ${teamInfo}
        `);
    }

    // This code will allow us to dispaly all teams that have been created in the menu.
    // The "for" loop is crucial for adding multiple elements from different arrays.

    displayTeams() {
        let teamString = '';
        for (let i = 0; i < this.teams.length; i++) {
            teamString += i + ') ' + this.teams[i].name + '\n';
        }
        alert(teamString);
    }
    
    // This code simply adds more teams to the "displayTeams" code.
    // >> This is done by using ".push" to add more elemnts to an existing array.

    createTeam() {
        let name = prompt('Enter name for new team:');
        this.teams.push(new Team(name));
    }

    // This code is by far the most complex. This can add and delete players to teams.
    // >> Loops were used to help create a new menu and were used for adding/deleting players to specific teams.
    // >>> "i" and "players" made it possible to add more elements within existing arrays.
    // >> An "if" function was used to make sure users could not add random numbers below or equal to -1 ...
    // because those numbers are not possible to index from the display menu, and so forth.

    viewTeam() {
        let index = prompt('Enter the index of the team you wish to view:');
        if (index > -1 && index < this.teams.length) {
            this.selectedTeam = this.teams[index];
            let description = 'Team Name: ' + this.selectedTeam.name + '\n';

            for (let i = 0; i < this.selectedTeam.players.length; i++) {
                description += i + ') ' + this.selectedTeam.players[i].name + ' - ' + this.selectedTeam.players[i].position + '\n';
            }

            let selection = this.showTeamMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createPlayer();
                    break;
                case '2':
                    this.deletePlayer();
            }
        }
    }
    
    // This code was made to simpy delete teams from the displayTeams section.
    // ".splice" can be used to remove elements from arrays by selecting a specific variable and removing an element from a certain position.

    deleteTeam() {
        let index = prompt('Enter the index of the team you would like to delete:'); 
        if (index > -1 && index < this.teams.length) {
            this.teams.splice(index, 1);
        }
    }
    
    // This code falls under the "veiwTeams" section, and includes ".push" to add players to a specific team.

    createPlayer() {
        let name = prompt('Enter name for new player:');
        let position = prompt('Enter position for new player:');
        this.selectedTeam.players.push(new Player(name, position));
    }

    // This code falls under the "veiwTeams" section, and includes ".splice" to remove players from a specific team.

    deletePlayer() {
        let index = prompt('Enter the index of the player you would like to delete:');
        if (index > -1 && index < this.selectedTeam.players.length);
            this.selectedTeam.players.splice(index, 1);
    }
}

    // "menu.start" activates the "Menu" class.
    // All of the sections below "start()" are activated based on their case location and what indexes are plugged into the drop down menu.
    
let menu = new Menu();
menu.start();