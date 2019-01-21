import middleware from '../middleware';
import mockExpress from 'jest-mock-express';
import language from '../middleware/language';

let res = null;
let next = null;
describe('Payload Middleware', () => {
  beforeEach(() => {
    res = mockExpress.response();
    next = jest.fn();
  });


  describe('Payload Role Middleware', () => {
    it('Exact role - authorized', () => {
      const req = {
        user: {
          role: 'user'
        }
      };

      middleware.role('user')(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(res.status).not.toHaveBeenCalled();
    });

    it('Exact role - unauthorized', () => {
      const req = {
        user: {
          role: 'user'
        }
      };

      middleware.role('admin')(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalled();
      expect(res.send).toHaveBeenCalled();
    });

  });

  describe('Payload Language Middleware', () => {

    let req, localization;

    beforeEach(() => {
      req = {
        query: {},
        headers: {}
      };
      localization = {
        languages: ['en', 'es'],
        defaultLanguage: 'en'
      };

    });

    it('Supports query params', () => {
      req.query.lang = 'es';

      language(localization)(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(req.language).toEqual(req.query.lang);
    });

    it('Supports query param fallback to default', () => {
      req.query.lang = 'pt';

      language(localization)(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(req.language).toEqual(localization.defaultLanguage);
    });

    it('Supports accept language header', () => {
      req.headers['accept-language'] = 'es,fr;';

      language(localization)(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(req.language).toEqual('es');
    });

    it('Supports accept language header fallback', () => {
      req.query.lang = 'pt';
      req.headers['accept-language'] = 'fr;';

      language(localization)(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(req.language).toEqual(localization.defaultLanguage);
    });

    it('Query param takes precedence over header', () => {
      req.query.lang = 'es';
      req.headers['accept-language'] = 'en;';

      language(localization)(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(req.language).toEqual('es');
    });

    it('Supports default language', () => {
      language(localization)(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(req.language).toEqual(localization.defaultLanguage);
    });

    it('Supports language all', () => {
      req.query.lang = 'all';
      language(localization)(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(req.language).toBeUndefined();
    });
  });
});