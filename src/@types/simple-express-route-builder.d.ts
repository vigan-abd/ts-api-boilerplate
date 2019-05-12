import { Router } from "express";

declare namespace RouteBuilder {
  class Action {
    // new Action('GET', ACTION)
    constructor(method: string, action: Function)
    // new Action('GET', MIDDLEWARE, ACTION)
    constructor(method: string, middleware: Function, action: Function)
    constructor(method: string, middleware: Function[], action: Function)
    // new Action('GET', ':/job_id', ACTION)
    constructor(method: string, path: string, action: Function)
    // new Action('GET', ':/job_id', MIDDLEWARE, ACTION)
    constructor(method: string, path: string, middleware: Function, action: Function)
    constructor(method: string, path: string, middleware: Function[], action: Function)
  }

  class Group {
    // new Group(':/job_id', CHILDREN|[CHILDREN])
    constructor(path: string, children: Group | Action)
    constructor(path: string, children: (Group | Action)[])
    // new Group(':/job_id', MIDDLEWARES|[MIDDLEWARES], CHILDREN|[CHILDREN])
    constructor(path: string, middlewares: Function, children: Group | Action)
    constructor(path: string, middlewares: Function, children: (Group | Action)[])
    constructor(path: string, middlewares: Function[], children: Group | Action)
    constructor(path: string, middlewares: Function[], children: (Group | Action)[])
    // new Group(MIDDLEWARES|[MIDDLEWARES], CHILDREN|[CHILDREN])
    constructor(middlewares: Function, children: Group | Action)
    constructor(middlewares: Function, children: (Group | Action)[])
    constructor(middlewares: Function[], children: Group | Action)
    constructor(middlewares: Function[], children: (Group | Action)[])
  }
}

declare class RouteBuilder {
  constructor(router: Router)
  constructor(basePath: string, router: Router)

  private applyMiddleware(path: string, middlewares: Function[]): void;
  private applyMiddleware(path: string, middlewares: Function[], children: (RouteBuilder.Group | RouteBuilder.Action)[]): void;

  private applyGroup(group: RouteBuilder.Group);

  public use(router: (
    group: (
      pathOrMiddlewares: String | Function | Function[],
      middlewaresOrChildren: Function | Function[] | RouteBuilder.Group | RouteBuilder.Action | (RouteBuilder.Group | RouteBuilder.Action)[],
      children?: RouteBuilder.Group | RouteBuilder.Action | (RouteBuilder.Group | RouteBuilder.Action)[]
    ) => RouteBuilder.Group,
    action: (
      method: string,
      pathOrMiddlewareOrAction: string | Function[] | Function,
      middlewareOrAction?: Function[] | Function,
      action?: Function
    ) => RouteBuilder.Action
  ) => any): any

  // new Action('GET', ACTION)
  // new Action('GET', MIDDLEWARE, ACTION)
  // new Action('GET', ':/job_id', ACTION)
  // new Action('GET', ':/job_id', MIDDLEWARE, ACTION)
  static action(method: string, action: Function): RouteBuilder.Action
  static action(method: string, middleware: Function, action: Function): RouteBuilder.Action
  static action(method: string, middleware: Function[], action: Function): RouteBuilder.Action
  static action(method: string, path: string, action: Function): RouteBuilder.Action
  static action(method: string, path: string, middleware: Function, action: Function): RouteBuilder.Action
  static action(method: string, path: string, middleware: Function[], action: Function): RouteBuilder.Action

  private action(method: string, action: Function): RouteBuilder.Action
  private action(method: string, middleware: Function, action: Function): RouteBuilder.Action
  private action(method: string, middleware: Function[], action: Function): RouteBuilder.Action
  private action(method: string, path: string, action: Function): RouteBuilder.Action
  private action(method: string, path: string, middleware: Function, action: Function): RouteBuilder.Action
  private action(method: string, path: string, middleware: Function[], action: Function): RouteBuilder.Action


  // new Group(':/job_id', CHILDREN|[CHILDREN])
  // new Group(':/job_id', MIDDLEWARES|[MIDDLEWARES], CHILDREN|[CHILDREN])
  // new Group(MIDDLEWARES|[MIDDLEWARES], CHILDREN|[CHILDREN])
  static group(path: string, children: RouteBuilder.Group | RouteBuilder.Action): RouteBuilder.Group
  static group(path: string, children: (RouteBuilder.Group | RouteBuilder.Action)[]): RouteBuilder.Group
  static group(path: string, middlewares: Function, children: RouteBuilder.Group | RouteBuilder.Action): RouteBuilder.Group
  static group(path: string, middlewares: Function, children: (RouteBuilder.Group | RouteBuilder.Action)[]): RouteBuilder.Group
  static group(path: string, middlewares: Function[], children: RouteBuilder.Group | RouteBuilder.Action): RouteBuilder.Group
  static group(path: string, middlewares: Function[], children: (RouteBuilder.Group | RouteBuilder.Action)[]): RouteBuilder.Group
  static group(middlewares: Function, children: RouteBuilder.Group | RouteBuilder.Action): RouteBuilder.Group
  static group(middlewares: Function, children: (RouteBuilder.Group | RouteBuilder.Action)[]): RouteBuilder.Group
  static group(middlewares: Function[], children: RouteBuilder.Group | RouteBuilder.Action): RouteBuilder.Group
  static group(middlewares: Function[], children: (RouteBuilder.Group | RouteBuilder.Action)[]): RouteBuilder.Group

  private group(path: string, children: RouteBuilder.Group | RouteBuilder.Action): RouteBuilder.Group
  private group(path: string, children: (RouteBuilder.Group | RouteBuilder.Action)[]): RouteBuilder.Group
  private group(path: string, middlewares: Function, children: RouteBuilder.Group | RouteBuilder.Action): RouteBuilder.Group
  private group(path: string, middlewares: Function, children: (RouteBuilder.Group | RouteBuilder.Action)[]): RouteBuilder.Group
  private group(path: string, middlewares: Function[], children: RouteBuilder.Group | RouteBuilder.Action): RouteBuilder.Group
  private group(path: string, middlewares: Function[], children: (RouteBuilder.Group | RouteBuilder.Action)[]): RouteBuilder.Group
  private group(middlewares: Function, children: RouteBuilder.Group | RouteBuilder.Action): RouteBuilder.Group
  private group(middlewares: Function, children: (RouteBuilder.Group | RouteBuilder.Action)[]): RouteBuilder.Group
  private group(middlewares: Function[], children: RouteBuilder.Group | RouteBuilder.Action): RouteBuilder.Group
  private group(middlewares: Function[], children: (RouteBuilder.Group | RouteBuilder.Action)[]): RouteBuilder.Group
}

export = RouteBuilder;