import * as Joi from 'joi';

abstract class ModelBase {
  protected rules: Joi.ObjectSchema;
  protected excludedProps: string[];

  constructor() {
    this.rules = Joi.object();
    this.excludedProps = [];
  }

  validate() {
    return Joi.validate(this.toJSON(), this.rules);
  }

  static get DbQuery(): any {
    throw new Error('Method not implemented');
  }

  toJSON() {
    const fields: { [key: string]: any } = {};
    Object.keys(this).filter(x => !this.excludedProps.includes(x))
      .filter(x => !['rules', 'excludedProps'].includes(x))
      .forEach(x => fields[x] = (<any>this)[x]);

    return fields;
  }
}

export default ModelBase;