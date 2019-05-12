import dbAdapter from '@helpers/DbAdapter';

class StringHelper {
  static strToObjectId(id: string) {
    return dbAdapter.Types.ObjectId(id);
  }
}

export default StringHelper;