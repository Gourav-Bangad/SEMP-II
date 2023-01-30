// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0;

contract Carpool{

    event Adduser(uint id,string Name,string phNo,uint age);
    event AddRide(address owner,uint rideid);
    event BookRide(address user,address owner,uint rideid);
    struct person{
        uint id;
        string  Name;
        string  phNo;
        uint  age;
    }

    struct CreateRide{
        uint rideID;
        string Destination;
        string source;
        uint price;
        uint seat;
    }

    person[] public User;
    CreateRide[] public Ride;
    mapping (uint => address payable) public rideowner;
    mapping (address => person) public UserAddress;
    function addUser(string memory _Name,string memory _phNo,uint _age) public
    {
        uint Id = User.length;
        User.push(person(Id,_Name,_phNo,_age));
        UserAddress[msg.sender].id = Id;
        UserAddress[msg.sender].Name = _Name;
        UserAddress[msg.sender].phNo = _phNo;
        UserAddress[msg.sender].age = _age;
        emit Adduser(Id,_Name,_phNo,_age);
    }

    function createRide(string memory _Destination,string memory _source,
    uint price,uint seat) public
    {
        uint rideid = Ride.length;
        Ride.push(CreateRide(rideid,_Destination,_source,price,seat));
        rideowner[rideid] = payable(msg.sender);
        emit AddRide(msg.sender,rideid);
    }

    function bookRide(uint rideId,uint no_of_seat) payable public{
        require(no_of_seat*(Ride[rideId].price) == msg.value);
        rideowner[rideId].transfer(msg.value);
        Ride[rideId].seat = Ride[rideId].seat -no_of_seat;
        emit BookRide(msg.sender, rideowner[rideId], rideId);
    }
}
