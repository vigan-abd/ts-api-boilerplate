import User from '@models/Domain/User';

interface IUserRepository {
  create(model: User): Promise<User>

  findById(id: string): Promise<User>

  findWhere(conditions: any): Promise<User[]>

  list(page: number, conditions?: any, options?: any):
    Promise<{
      docs: User[],
      totalDocs: number,
      limit: number,
      hasPrevPage: boolean,
      hasNextPage: boolean,
      page: number | null,
      totalPages: number | null,
      prevPage: string | null,
      nextPage: string | null
    }>

  count(conditions?: any): Promise<number>

  update(id: string, fields?: any): Promise<User>

  remove(conditions?: any): Promise<boolean>
}

export default IUserRepository;