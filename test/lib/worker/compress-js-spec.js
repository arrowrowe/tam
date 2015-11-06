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
    compute_char_frequency: spy(),
    mangle_names: spy(),
    print_to_string: spy()
    // jscs:enable
  };

  ast.transform = stub().returns(ast);

  before(function () {
    stub(UglifyJS, 'parse').returns(ast);
    stub(UglifyJS, 'Compressor');
  });

  beforeEach(function () {
    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
    ast.mangle_names.reset();
    // jscs:enable
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

  it('supports js.prefix and js.suffix and prevents them from being past to compressor', function () {
    var code = 'some code that need to wrap';
    compressJs(code, {
      prefix: '{',
      suffix: '}',
      someOtherOption: 42
    });
    expect(UglifyJS.parse.calledWith('{' + code + '}')).to.equal(true);
    expect(UglifyJS.Compressor.calledWith({someOtherOption: 42})).to.equal(true);
  });

  it('allows to turn off mangling', function () {
    compressJs('some code that should not be mangled', {
      mangle: false
    });
    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
    expect(ast.mangle_names.callCount).to.equal(0);
    // jscs:enable
  });

});
