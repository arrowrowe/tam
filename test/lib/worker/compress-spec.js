var worker = require('../../../lib/worker');
var expect = require('chai').expect;
var sinon = require('sinon');

describe('Compress', function () {

  it('Compressor not found', function () {
    expect(function () {
      worker.perform({
        'behavior': 'compress',
        'args': {
          'type': 'whatever'
        }
      });
    }).to.throw('Compressor for [whatever] not found!');
    expect(function () {
      worker.perform({
        'behavior': 'compress'
      });
    }).to.throw('Compressor for [undefined] not found!');
  });

  it('catches the compressor\'s error', function () {
    var sampleError = {
      file: 'stdin',
      line: 23,
      column: 7,
      message: 'a sample error'
    };

    var log = require('../../../lib/log');
    sinon.stub(log, 'warn');
    sinon.stub(worker.tools.compressors, 'js').throws(sampleError);
    sinon.stub(worker.hands, 'write');

    expect(function () {
      worker.perform({
        'behavior': 'compress',
        'args': {
          'type': 'js'
        },
        'files': ['./runtime/src/a.js']
      });
    }).to.not.throw();
    expect(log.warn.calledWith('[%s:%d,%d] %s', sampleError.file, sampleError.line, sampleError.column, sampleError.message)).to.equal(true);

    log.warn.restore();
    worker.tools.compressors.js.restore();
    worker.hands.write.restore();
  });

});
