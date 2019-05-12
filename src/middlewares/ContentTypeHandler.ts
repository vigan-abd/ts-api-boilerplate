
import { Request, Response, NextFunction } from 'express';
import Serializer from '@helpers/Serializer';
import HttpNotAcceptableException from '@models/Business/Exeption/HttpNotAcceptableException';
import IChainedResponse from '@models/Business/Interface/IChainedResponse';

class ContentTypeHandler {
  handler(req: Request, res: IChainedResponse, next: NextFunction) {
    const { accept = '*/*' } = req.headers;

    if (/^\*/.test(accept) || /(json)|(javascript)/.test(accept)) {
      return res.json(res.body);
    } else if (/(xml)|(html)/.test(accept)) {
      res.set("Content-Type", 'application/xml');
      return res.send(Serializer.toXML(res.body));
    } else if (/text/.test(accept)) {
      res.set("Content-Type", 'text/plain');
      return res.send(`${Array.isArray(res.body) || typeof res.body === "object" ?
        JSON.stringify(res.body) : res.body}`);
    } else {
      res.statusCode = 406;
      res.statusMessage = 'Not Acceptable';
      return next(new HttpNotAcceptableException(accept));
    }
  }
}

export default ContentTypeHandler;