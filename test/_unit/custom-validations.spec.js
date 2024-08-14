const { URNValidator } = require('../../apps/evisa/fields/index.js');

describe('Custom Validators', () => {
  describe('URNValidator', () => {
    it('Returns true for valid URN with optional - or /', () => {
      expect(URNValidator('1111-2222-3333-4444')).to.equal(true);
      expect(URNValidator('1111/2222/3333/4444')).to.equal(true);
      expect(URNValidator('1234567890123456')).to.equal(true);
    });

    it('Returns false for invalid URN strings', () => {
      expect(URNValidator('')).to.equal(false);
      expect(URNValidator('111-2222-3333-4444')).to.equal(false);
      expect(URNValidator('1111/2222/3333/444')).to.equal(false);
      expect(URNValidator('123456789012345')).to.equal(false);
      expect(URNValidator('123456789012345X')).to.equal(false);
      expect(URNValidator('12345678901234567')).to.equal(false);
      expect(URNValidator('nonedigitsnother')).to.equal(false);
      expect(URNValidator('specialsno!"£$*=')).to.equal(false);
    });
  });
});