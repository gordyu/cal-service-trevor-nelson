const frisby = require('frisby');
const Joi = frisby.Joi;

describe('TEST THE API', () => {
  it('should have a JSON Content-Type header', function () {
    return frisby.get('http://localhost:3004/homes')
      .expect('header', 'Content-Type', 'application/json; charset=utf-8');
  });

  it('should respond with a status of 200', () => {
    return frisby.get('http://localhost:3004/homes')
      .expect('status', 200);
  });

  it('should NOT respond with an error', () => {
    return frisby.get('http://localhost:3004/homes')
      .expectNot('json', { result: 'error' });
  });

  it('should respond with the correct prop & propType', () => {
    return frisby.get('http://localhost:3004/homes')
      .expect('jsonTypes', '*', {
        propertyId: Joi.number().required(),
        imageId: Joi.number().required(),
        description: Joi.string().required()
      });
  });

});