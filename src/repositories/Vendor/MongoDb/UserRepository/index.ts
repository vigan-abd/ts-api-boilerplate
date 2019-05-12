import IUserRepository from '@repositories/Interfaces/IUserRepository';
import User from '@models/Domain/User';

class UserRepository implements IUserRepository {
  parseRecord(raw: any) {
    return new User({
      id: raw._id || null, username: raw.username || null, email: raw.email || null,
      password: raw.password || null, tokenHash: raw.tokenHash || null,
      passwordResetToken: raw.passwordResetToken || null, passwordResetSentAt: raw.passwordResetSentAt || null,
      created: raw.created || null, updated: raw.updated || null, lastLogin: raw.lastLogin || null
    });
  }

  async create(model: User) {
    const res = await User.DbQuery.create(model.toJSON());
    return this.parseRecord(res);
  }

  async findById(id: string) {
    const res = await User.DbQuery.findById(id);
    return this.parseRecord(res);
  }

  async findWhere(conditions: any) {
    const res = await User.DbQuery.find(conditions);
    return res.map(raw => this.parseRecord(raw));
  }

  async list(page: number, conditions: any = {}, options: any = {}) {
    options.page = page;
    const raw = await User.DbQuery.paginate(conditions, options);
    const res = {
      docs: raw.docs.map(doc => {
        (doc as any).id = doc._id;
        return new User(doc);
      }),
      totalDocs: raw.total,
      limit: raw.limit,
      hasPrevPage: raw.hasPrevPage ? true : false,
      hasNextPage: raw.hasNextPage ? true : false,
      page: raw.page || null,
      totalPages: raw.pages || null,
      prevPage: raw.prevPage ? (raw.prevPage.toString()) : null,
      nextPage: raw.nextPage ? (raw.nextPage.toString()) : null
    };

    return res;
  }

  async count(conditions = null) {
    return await User.DbQuery.count(conditions || {});
  }

  async update(id: string, fields: any) {
    await User.DbQuery.findByIdAndUpdate(id, fields);
    return await this.findById(id);
  }

  async remove(conditions: any) {
    await User.DbQuery.deleteMany(conditions);
    return true;
  }

  query() {
    return User.DbQuery;
  }
}

export default UserRepository;