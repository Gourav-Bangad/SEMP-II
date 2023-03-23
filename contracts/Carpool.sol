// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0;
import "hardhat/console.sol";

contract Carpool {
    event AddUser(uint id, string name, string phNo, uint age);
    event AddRide(uint rideId, string destination, string source, uint price, uint seat);
    event BookRide(address user, address owner, uint rideId);

    struct Person {
        uint id;
        string name;
        string phNo;
        uint age;
    }

    struct CreateRide {
        uint rideId;
        string destination;
        string source;
        uint price;
        uint seat;
    }

    Person[] public users;
    CreateRide[] public rides;
    mapping(uint => address payable) public rideOwner;
    mapping(address => Person) public userAddress;

    uint rideIdCounter;

    function addUser(string memory name, string memory phNo, uint age) public {
        uint id = users.length;
        users.push(Person(id, name, phNo, age));
        userAddress[msg.sender].id = id;
        userAddress[msg.sender].name = name;
        userAddress[msg.sender].phNo = phNo;
        userAddress[msg.sender].age = age;
        emit AddUser(id, name, phNo, age);
    }

    function createRide(string memory destination, string memory source, uint price, uint seat) public {
        uint rideId = rideIdCounter++;
        rides.push(CreateRide(rideId, destination, source, price, seat));
        rideOwner[rideId] = payable(msg.sender);
        emit AddRide(rideId, destination, source, price, seat);
    }

    function bookRide(uint rideId, uint no_of_seat) payable public {
        require(no_of_seat * rides[rideId].price == msg.value);
        rideOwner[rideId].transfer(msg.value);
        rides[rideId].seat = rides[rideId].seat - no_of_seat;
        emit BookRide(msg.sender, rideOwner[rideId], rideId);
    }

    function getRideDetails(uint rideId) public view returns (string memory, string memory, uint, uint) {
        return (rides[rideId].destination, rides[rideId].source, rides[rideId].price, rides[rideId].seat);
    }

    function getAllRides() public view returns (CreateRide[] memory) {
    return rides;
    }
}
