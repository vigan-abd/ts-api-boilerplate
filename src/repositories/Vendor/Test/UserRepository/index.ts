import seed from './seed';
import IUserRepository from '@repositories/Interfaces/IUserRepository';
import UserDefinedException from "@models/Business/Exeption/UserDefinedException";
import User from '@models/Domain/User';

let users = seed(); // Generate seeds

/**
 * This class is a mockup UserRepository, it can be used to perform fast calls instead of making calls to db
 * It's mostly useful to speed up testing since we read/write from memory here. 
 * E.g. it can be used in unit tests in service layer
 *
 * @class UserRepository
 * @extends {IUserRepository}
 */
class UserRepository implements IUserRepository {

  async create(model: User) {
    // Simulate immediate async
    await Promise.resolve();
    model.id = (users.length + 1).toString(); // Simulate id generator
    users.push(model);
    return model;
  }

  async findById(id: string) {
    // Implement full behavior of real repository
    await Promise.resolve();
    const user = users.find(x => x.id == id);
    if (!user) throw new UserDefinedException("User doesn't exist", 404);
    return user;
  }

  async findWhere(conditions: any) {
    // Simply return all users
    await Promise.resolve()
    return users;
  }

  async list(page: number, conditions: any = {}, options: any = {}) {
    // Create exact model as in pagination model
    await Promise.resolve();
    return {
      docs: users,
      totalDocs: users.length,
      limit: users.length,
      hasPrevPage: false,
      hasNextPage: false,
      page: 1,
      totalPages: 1,
      prevPage: null,
      nextPage: null
    }
  }

  async count(conditions: any = null) {
    // Simulate db count behavior
    await Promise.resolve();
    return users.length;
  }

  async update(id: string, fields: any) {
    // Simulate update against data that is stored in memory
    await Promise.resolve();
    const index = users.findIndex(x => x.id == id);
    if (index < 0) throw new UserDefinedException("User doesn't exist", 404);
    for (const key in fields) {
      (users as any)[index][key] = fields[key];
    }
    return users[index];
  }

  async remove(conditions: any) {
    // Simply remove last item
    await Promise.resolve();
    users.pop();
    return true;
  }

  reset() {
    users = seed();
  }
}

export default UserRepository;