var compressJs = require('../../../lib/worker/compress-js');

var expect = require('chai').expect;
var sinon = require('sinon');
var stub = sinon.stub;
var spy = sinon.spy;

var UglifyJS = require('uglify-js');

describe('lib/worker/compress-js', function () {

  var ast = {
    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
    figure_out_scope: spy(),
    transform: stub().returns({
      print_to_string: spy()
    })
    // jscs:enable
  };

  before(function () {
    stub(UglifyJS, 'parse').returns(ast);
    stub(UglifyJS, 'Compressor');
  });

  afterEach(function () {
    UglifyJS.parse.reset();
    UglifyJS.Compressor.reset();
  });

  after(function () {
    UglifyJS.parse.restore();
    UglifyJS.Compressor.restore();
  });

  it('does not add prefix or suffix for default', function () {
    var code = 'some clean code';
    compressJs(code, {});
    expect(UglifyJS.parse.calledWith(code)).to.equal(true);
  });

  it('supports jsPrefix and jsSuffix and prevents them from being past to compressor', function () {
    var code = 'some code that need to wrap';
    compressJs(code, {
      jsPrefix: '{',
      jsSuffix: '}',
      someOtherOption: 42
    });
    expect(UglifyJS.parse.calledWith('{' + code + '}')).to.equal(true);
    expect(UglifyJS.Compressor.calledWith({someOtherOption: 42})).to.equal(true);
  });

});
