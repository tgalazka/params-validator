/**
 * Dependencies
 */

var Validator = require('../../params-validator');

/**
 * Test - Present
 */

describe("When using #present", function() {
  var Present = Validator.present;

  it("should throw error with no callback", function(done) {
    var err = null;
    try {
      Present();
    } catch(ex) {
      err = ex;
    } finally {
      expect(err).to.not.be(null);
      expect(err.message).to.equal('No callback function supplied!');
      done();
    }
  });

  it("should throw error with null callback", function(done) {
    var err = null;
    try {
      Present(null, null, null);
    } catch(ex) {
      err = ex;
    } finally {
      expect(err).to.not.be(null);
      expect(err.message).to.equal('No callback function supplied!');
      done();
    }
  });

  it("should pass with no required or params", function(done) {
    var required = [];
    var params = {};
    Present(function(err, result, keys) {
      expect(err).to.be(null);
      expect(result).to.eql(params);
      expect(keys).to.eql(required);
      done();
    });
  });

  it("should pass with assumed required and no params", function(done) {
    var required = [];
    var params = {};
    Present([], function(err, result, keys) {
      expect(err).to.be(null);
      expect(result).to.eql(params);
      expect(keys).to.eql(required);
      done();
    });
  });

  it("should pass with assumed params and no required", function(done) {
    var required = [];
    var params = {};
    Present({}, function(err, result, keys) {
      expect(err).to.be(null);
      expect(result).to.eql(params);
      expect(keys).to.eql(required);
      done();
    });
  });

  it("should pass with assumed required and no params", function(done) {
    var required = [];
    var params = {};
    Present(required, function(err, result, keys) {
      expect(err).to.be(null);
      expect(result).to.eql(params);
      expect(keys).to.eql(required);
      done();
    });
  });

  it("should fail with null required and null params", function(done) {
    var required = null;
    var params = null;
    Present(required, params, function(err, result, keys) {
      expect(err).to.not.be(null);
      expect(err.message).to.equal('Supplied params is not an object!');
      done();
    });
  });

  it("should pass with null required and empty params", function(done) {
    var required = null;
    var params = {};
    Present(required, params, function(err, result, keys) {
      expect(err).to.be(null);
      expect(result).to.eql(params);
      expect(keys).to.eql([]);
      done();
    });
  });

  it("should pass with empty required and empty params", function(done) {
    var required = [];
    var params = {};
    Present(required, params, function(err, result, keys) {
      expect(err).to.be(null);
      expect(result).to.eql(params);
      expect(keys).to.eql(required);
      done();
    });
  });

  it("should fail missing required key", function(done) {
    var required = ['key'];
    var params = {};
    Present(required, params, function(err, result, keys) {
      expect(err).to.not.be(null);
      expect(err.message).to.equal('Missing required parameters: key');
      expect(result).to.eql(params);
      expect(keys).to.eql(required);
      done();
    });
  });

  it("should pass finding the required keys", function(done) {
    var required = ['key', 'another'];
    var params = { key: 'value', another: 123 };
    Present(required, params, function(err, result, keys) {
      expect(err).to.be(null);
      expect(result).to.eql(params);
      expect(keys).to.eql(required);
      done();
    });
  });

  it("should pass finding the required key", function(done) {
    var required = 'another';
    var params = { key: 'value', another: 123 };
    Present(required, params, function(err, result, keys) {
      expect(err).to.be(null);
      expect(result).to.eql(params);
      expect(keys).to.eql([required]);
      done();
    });
  });

  it("should pass finding the required keys present, even with falsy values", function(done) {
    var required = ['string', 'nully', 'undef', 'zero', 'zeroStr', 'negative'];
    var params = { 
      string: '', 
      nully: null,
      undef: undefined,
      zero: 0,
      zeroStr: '0',
      negative: -1
    };
    Present(required, params, function(err, result, keys) {
      expect(err).to.be(null);
      expect(result).to.eql(params);
      expect(keys).to.eql(required);
      done();
    });
  });
});
