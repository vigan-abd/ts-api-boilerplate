import { expect } from 'chai'; // We use expect to determine case results
import { AwilixContainer } from 'awilix';
import TestHelper from '@helpers/TestHelper';
import User from '@models/Domain/User';
import UserService from '@services/UserService';
import AuthenticationAPIController from '../index';

// Mockups
const seed = {
  email: "test@gmail.com",
  password: "abcd1234",
  username: "test"
};
let user: User;

module.exports = (container: AwilixContainer) => {
  const service: UserService = container.resolve('userService');
  const controller: AuthenticationAPIController = container.resolve('authenticationAPIController');

  before(async () => {
    // Prepare environment
    await service.deleteUsers({});
    const { req } = TestHelper.createExpressMocks({ body: seed });
    const auth = await service.signup(req);
    user = await service.getUser(auth.userId);
  });

  it("Test successfull password update case", async () => {
    // Create a mockup request where we try to change passowrd
    const { req, res, next } = TestHelper.createExpressMocks({
      currentUser: user,
      body: {
        password: "abcd1234",
        newPassword: "abcd12345",
        confirmPassword: "abcd12345"
      }
    });

    // Simulate
    await controller.updatePassword(req, res, next);

    // We expect to get json response
    const data = JSON.parse(res._getData());
    return expect(data).to.exist;
  });

  it("Test current password mismatch case", async () => {
    // Create a mockup request that has incorrect current password
    const { req, res, next } = TestHelper.createExpressMocks({
      currentUser: user,
      body: {
        password: "abcd123424",
        newPassword: "abcd12345",
        confirmPassword: "abcd12345"
      }
    });

    // Simulate
    await controller.updatePassword(req, res, next);

    // Expected behavior would be to call the next function inside controller due to failure,
    // With this we assure that error is handled properly
    return expect(next.calledOnce).to.be.true;
  });

  it("Test invalid new password case", async () => {
    // Create a mockup request that has a new password that doesn't pass validation rules
    const { req, res, next } = TestHelper.createExpressMocks({
      currentUser: user,
      body: {
        password: "abcd1234",
        newPassword: "abcd12345@",
        confirmPassword: "abcd12345@"
      }
    });

    // Simulate
    await controller.updatePassword(req, res, next);

    // Expected behavior would be to call the next function inside controller due to failure,
    // With this we assure that error is handled properly
    return expect(next.calledOnce).to.be.true;
  });

  it("Test new password and confirm password mismatch case", async () => {
    // Create a mockup request that has password mismatch in new password and confirm new password
    const { req, res, next } = TestHelper.createExpressMocks({
      currentUser: user,
      body: {
        password: "abcd1234",
        newPassword: "abcd12345",
        confirmPassword: "abcd1234"
      }
    });

    // Simulate
    await controller.updatePassword(req, res, next);

    // Expected behavior would be to call the next function inside controller due to failure,
    // With this we assure that error is handled properly
    return expect(next.calledOnce).to.be.true;
  });

  after(async () => {
    // Clear the database mess that we caused :)
    await service.deleteUsers({});
  });
};
