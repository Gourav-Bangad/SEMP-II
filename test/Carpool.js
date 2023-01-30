const { expect } = require("chai");
const { solidity, ethers } = require("hardhat");

describe("Carpool", function () {
  let Carpool;
  let userAddress;

  beforeEach(async function () {
    Carpool = await ethers.getContractFactory("Carpool");
    userAddress = await ethers.getSigners();
  });

  it("Add a user", async function () {
    const instance = await Carpool.deploy();
    await instance.addUser("Gourav Bangad", "1234567890", 20);

    const user = await instance.User(0);
    expect(user.Name).to.equal("Gourav Bangad");
    expect(user.phNo).to.equal("1234567890");
    expect(user.age).to.equal(20);
  });

  it("Create a ride", async function () {
    const instance = await Carpool.deploy();
    await instance.createRide("Mumbai", "Delhi", 100, 4);

    const ride = await instance.Ride(0);
    expect(ride.Destination).to.equal("Mumbai");
    expect(ride.source).to.equal("Delhi");
    expect(ride.price).to.equal(100);
    expect(ride.seat).to.equal(4);
  });

  it("Book a ride", async function () {
    const instance = await Carpool.deploy();
    await instance.createRide("Mumbai", "Delhi", 100, 4);
    await instance.bookRide(0, 2, { value: 200 });

    const ride = await instance.Ride(0);
    expect(ride.seat).to.equal(2);
  });
});
