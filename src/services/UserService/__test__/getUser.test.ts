import { expect } from 'chai'; // We use expect to determine case results
import { AwilixContainer } from "awilix";
import UserService from "../index";
import IUserRepository from "@repositories/Interfaces/IUserRepository";
import UserRepository from '@repositories/Vendor/Test/UserRepository';


module.exports = (container: AwilixContainer) => {
  const service: UserService = container.resolve('userService');
  const repository: IUserRepository = container.resolve('iuserRepository');

  before(() => {
    // Replace real repository with mockup repository so we speed up testing
    // Real repository performs calls against db, mockup against memory so it's faster and our focus is in service behavior,
    // not repository behavior
    service.iuserRepository = new UserRepository();
  })

  it("Test success getUser case", async () => {
    // Test case when we get existing user (see seed.js in repository/Vendor/Test/UserRepository) for dataset
    const user = await service.getUser("5c085c669b12c7002a8321eb");
    return expect(user.id).to.exist;
  });

  after(() => {
    // Replace repository mockup with real one once we finish
    service.iuserRepository = repository;
  });
};
