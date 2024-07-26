// This is a mostly pointless test that simply checks stubs are called, but
// it's here to ensure that the testing environment is set up correctly

describe('server.js exists and can be called from tests', () => {
  let hofStub;
  let useStub;
  let behavioursClearSessionStub;
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = reqres.req();
    req.session = {};
    req.body = {
      appName: 'testApp',
      sessionProperties: {
        testProp1: 'test',
        testProp2: 'test'
      }
    };

    res = reqres.res();
    res.send = sinon.stub();
    next = sinon.stub();
    hofStub = sinon.stub();
    useStub = sinon.stub();
    behavioursClearSessionStub = sinon.stub();
    req.get.withArgs('host').returns('localhost');

    useStub.onCall(0).yields(req, res, next);
    hofStub.returns({ use: useStub });

    proxyquire('../server', {
      hof: hofStub,
      'hof/components/clear-session': behavioursClearSessionStub,
      './config': { env: 'test' }
    });
  });

  describe('Setup HOF Configuration', () => {
    it('calls hof with a suitable config', () => {
      hofStub.should.have.been.calledOnce.calledWith(sinon.match({
        appName: sinon.match.string,
        theme: sinon.match.string,
        routes: sinon.match.array,
        behaviours: sinon.match.array,
        session: sinon.match.object
      }));
    });
  });
});
