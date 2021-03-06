var worker = require('../../../lib/worker');
var expect = require('chai').expect;
var sinon = require('sinon');
var clone = require('clone');

describe('Each of lib/worker/compress and lib/worker/compile', function () {

  it('throws compressors not found', function () {
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

  it('catches the tools\' error', function () {
    var sampleError = {
      file: 'stdin',
      line: 23,
      column: 7
    };

    var sampleErrorWithMessage = clone(sampleError);
    sampleErrorWithMessage.message = 'a sample message';
    var sampleErrorWithMsg = clone(sampleError);
    sampleErrorWithMsg.msg = 'a sample msg';

    var log = require('../../../lib/log');
    sinon.stub(log, 'warn');
    sinon.stub(worker.tools.compressors, 'js').throws(sampleErrorWithMsg);
    sinon.stub(worker.tools.compilers, 'scss').throws(sampleErrorWithMessage);
    sinon.stub(worker.hands, 'write');

    expect(function () {
      worker.perform({
        'behavior': 'compress',
        'args': {
          'type': 'js'
        },
        'files': ['./runtime/src/a.js']
      });
      worker.perform({
        'behavior': 'compile',
        'files': ['./runtime/src/b/b.scss']
      });
    }).to.not.throw();
    expect(log.warn.callCount).to.equal(2);
    expect(log.warn.calledWith('[%s:%d,%d] %s', sampleError.file, sampleError.line, sampleError.column, sampleErrorWithMessage.message)).to.equal(true);
    expect(log.warn.calledWith('[%s:%d,%d] %s', sampleError.file, sampleError.line, sampleError.column, sampleErrorWithMsg.msg)).to.equal(true);

    log.warn.restore();
    worker.tools.compressors.js.restore();
    worker.tools.compilers.scss.restore();
    worker.hands.write.restore();
  });

});
