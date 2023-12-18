// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserProfile {
    uint256 constant caloriesNeededPerDayByHour = 120/5;

    struct Game {
        uint256 score;
        string day;
    }

    struct Profile {
        address walletAddress;
        string imageName;
        string petName;
        uint256 caloriesGranted;
        uint256 availableCalories;
        uint256 caloriesNeededPerDay;
        mapping(uint256 => Game) gamesPlayed;
        uint256 numberOfGamesPlayed;
        uint256 timeLeft;
    }

    event PetDied(address indexed petOwner, string message);

    mapping(address => Profile) public profiles;

    function createProfile(
        address _walletAddress,
        string memory _imageName,
        string memory _petName
    ) external {
        Profile storage user = profiles[_walletAddress];
        require(user.walletAddress == address(0), "Profile already exists");

        user.walletAddress = _walletAddress;
        user.imageName = _imageName;
        user.petName = _petName;
        user.caloriesGranted =60;
        user.availableCalories =60;
        user.caloriesNeededPerDay = caloriesNeededPerDayByHour;
        user.timeLeft = calculateTimeInSeconds(60); // Assuming starting with 20 calories
    }

    function calculateTimeInSeconds(uint256 currentCalories) internal view returns (uint256) {
        // Assuming a consumption rate of 5 calories per hour
        uint256 caloriesPerHour = 5;

        // Calculate time block in seconds
        uint256 timeBlock = currentCalories / caloriesPerHour * 1 hours;

        return block.timestamp + timeBlock;
    }

    // function calculateTimeLeft(uint256 currentCalories, uint256 hours, uint256 minutes) internal view returns (uint256) {
    //     // Calculate time left based on calories needed per day and available calories
    //     uint256 timeBlock = (currentCalories * (hours * 60 + minutes) * 60) / caloriesNeededPerDay;
    //     return block.timestamp + timeBlock;
    // }

    function checkPetLife(address _walletAddress) external {
        Profile storage user = profiles[_walletAddress];
        require(user.walletAddress != address(0), "Profile does not exist");

        if (block.timestamp > user.timeLeft) {
            // Pet has died due to insufficient calories
            emit PetDied(_walletAddress, "Your pet has died due to insufficient calories");
            // Additional actions when the pet dies can be added here
        }
    }

    function numberOfGamesPlayed(address _walletAddress) external view returns (uint256) {
        return profiles[_walletAddress].numberOfGamesPlayed;
    }

    function saveGamePlayed(address _walletAddress, uint256 _score, string memory _day) external returns (Game memory) {
        Profile storage user = profiles[_walletAddress];
        Game memory newGame = Game(_score, _day);
        user.gamesPlayed[user.numberOfGamesPlayed] = newGame;
        user.availableCalories = user.availableCalories + _score;
        user.numberOfGamesPlayed++;

        // Recalculate time left after saving the game
        user.timeLeft = calculateTimeInSeconds(user.availableCalories);

        return newGame;
    }

    function saveScore(address _walletAddress, uint256 _score) external {
        Profile storage user = profiles[_walletAddress];
        // require(user.availableCalories >= _score, "Not enough available calories");

        user.availableCalories -= _score;

        // Recalculate time left after saving the score
        user.timeLeft = calculateTimeInSeconds(user.availableCalories);
    }
}




// contract UserProfile {
//     uint256 constant caloriesNeededPerDay = 120;

//     struct Game {
//         uint256 score;
//         string day;
//     }

//     struct Profile {
//         address walletAddress;
//         string imageName;
//         string petName;
//         uint256 caloriesGranted;
//         uint256 availableCalories;
//         uint256 caloriesNeededPerDay;
//         mapping(uint256 => Game) gamesPlayed;
//         uint256 numberOfGamesPlayed;
//         uint256 timeLeft;
//     }

//     mapping(address => Profile) public profiles;

//     function createProfile(
//         address _walletAddress,
//         string memory _imageName,
//         string memory _petName
//     ) external {
//         Profile storage user = profiles[_walletAddress];
//         require(user.walletAddress == address(0), "Profile already exists");

//         user.walletAddress = _walletAddress;
//         user.imageName = _imageName;
//         user.petName = _petName;
//         user.caloriesGranted = 20;
//         user.availableCalories = 20;
//         user.caloriesNeededPerDay = caloriesNeededPerDay;
//         user.timeLeft = 120;
//     }


//     function calculateTimeLeft(uint256 currentCalories) internal view returns (uint256) {
//         // Calculate time left based on calories needed per day and available calories
//         uint256 timeBlock = (currentCalories * 1 minutes) / caloriesNeededPerDay;
//         return block.timestamp + timeBlock;
//     }


//     function numberOfGamesPlayed(address _walletAddress) external view returns (uint256) {
//         return profiles[_walletAddress].numberOfGamesPlayed;
//     }

//     function saveGamePlayed(address _walletAddress, uint256 _score, string memory _day) external returns (Game memory) {
//         Profile storage user = profiles[_walletAddress];
//         Game memory newGame = Game(_score, _day);
//         user.gamesPlayed[user.numberOfGamesPlayed] = newGame;
//         user.availableCalories = user.availableCalories + _score;
//         user.numberOfGamesPlayed++;

//         return newGame;
//     }

//     function saveScore(address _walletAddress, uint256 _score) external {
//         Profile storage user = profiles[_walletAddress];
//         require(user.availableCalories >= _score, "Not enough available calories");

//         user.availableCalories -= _score;
//     }
// }

