var assert = require('assert');
var jgen = require('../index');

describe('jgen', function() {
  it('should return a function', function() {
    var gen = jgen();
    
    assert(typeof gen, 'function');
  });
  
  it('should take a json schema', function() {
    var json = require('./schemas/schema');
    var gen = jgen(json);
    
    assert(typeof gen, 'function');
  })
  
  
  describe('gen', function() {
    it.only('should return a random JSON object', function() {
      var json = require('./schemas/schema');
      var gen = jgen(json);
      
      console.log(gen('transaction'))
    });
  });
});
