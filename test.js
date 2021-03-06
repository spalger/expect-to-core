/* eslint-env mocha */

import assert from 'assert'
import expect from 'expect-to'
import { not, equal, be, deepEqual, beTrue, beFalse, beTruthy, beFalsy, beUndefined, beNull, exist, beEmpty, contain, beInstanceOf, beType, match, throwError, throws } from './src'

describe('expect-to-core', () => {
  describe('not', () => {
    it('should set value of `not` in object', (done) => {
      const ensureCorrectValueOfNot = ({ not: notValue }) => {
        expect(notValue).to(equal(true))
        done()
      }

      expect('foo').to(not(ensureCorrectValueOfNot))
    })
  })

  describe('equal', () => {
    it('succeeds when strings are equal', () => {
      expect('test').to(equal('test'))
    })

    it('fails when strings are not equal', () => {
      assert.throws(
        () => expect('test').to(equal('testing')),
        (err) => err.message === 'Expected "test" to equal "testing"'
      )
    })

    it('with not succeeds when strings are not equal', () => {
      expect('test').to(not(equal('testing')))
    })

    it('with not fails when strings are equal', () => {
      assert.throws(
        () => expect('test').to(not(equal('test'))),
        (err) => err.message === 'Expected "test" not to equal "test"'
      )
    })

    it('succeeds when booleans are equal', () => {
      expect(true).to(equal(true))
    })

    it('fails when booleans are not equal', () => {
      assert.throws(
        () => expect(true).to(equal(false)),
        (err) => err.message === 'Expected true to equal false'
      )
    })

    it('succeeds when same reference', () => {
      const test = { name: 'kim' }
      expect(test).to(equal(test))
    })

    it('fails when different references', () => {
      const ref1 = { name: 'kim' }
      const ref2 = { name: 'kim' }

      assert.throws(
        () => expect(ref1).to(equal(ref2)),
        (err) => err.message === 'Expected {\n  "name": "kim"\n} to equal {\n  "name": "kim"\n}'
      )
    })
  })

  describe('be', () => {
    it('is an alias for "equal"', () => {
      expect('test').to(be('test'))
      expect(true).to(be(true))
      expect(true).to(not(be(false)))
      expect(undefined).to(be(undefined))
    })
  })

  describe('deepEqual', () => {
    it('succeeds when deeply equal', () => {
      const ref1 = { name: 'kim', arr: [1, 2, 3] }
      const ref2 = { name: 'kim', arr: [1, 2, 3] }
      expect(ref1).to(deepEqual(ref2))
    })

    it('handles regexes', () => {
      const ref1 = /test/
      const ref2 = /adsf/
      expect(ref1).to(not(deepEqual(ref2)))
    })

    it('handles arrays vs objects', () => {
      const ref1 = []
      const ref2 = {}
      expect(ref1).to(not(deepEqual(ref2)))
    })

    it('fails when not deeply equal', () => {
      const obj1 = { name: 'kim', arr: [1, 2] }
      const obj2 = { name: 'kim', arr: [1, 2, 3] }

      assert.throws(() => {
        expect(obj1).to(deepEqual(obj2))
      })
    })
  })

  describe('beTrue', () => {
    it('succeeds when true', () => {
      expect(true).to(beTrue)
    })

    it('fails when false', () => {
      assert.throws(
        () => expect(false).to(beTrue),
        (err) => err.message === 'Expected false to be true'
      )
    })
  })

  describe('beFalse', () => {
    it('succeeds when false', () => {
      expect(false).to(beFalse)
    })

    it('fails when true', () => {
      assert.throws(
        () => expect(true).to(beFalse),
        (err) => err.message === 'Expected true to be false'
      )
    })
  })

  describe('beTruthy', () => {
    it('succeeds when true', () => {
      expect(true).to(beTruthy)
    })

    it('succeeds when non-empty string', () => {
      expect('test').to(beTruthy)
    })

    it('fails when false', () => {
      assert.throws(
        () => expect(false).to(beTruthy),
        (err) => err.message === 'Expected false to be truthy'
      )
    })

    it('fails when empty string', () => {
      assert.throws(
        () => expect('').to(beTruthy),
        (err) => err.message === 'Expected "" to be truthy'
      )
    })
  })

  describe('beFalse', () => {
    it('succeeds when false', () => {
      expect(false).to(beFalsy)
    })

    it('succeeds when empty string', () => {
      expect('').to(beFalsy)
    })

    it('succeeds when null', () => {
      expect(null).to(beFalsy)
    })

    it('succeeds when undefined', () => {
      expect(undefined).to(beFalsy)
    })

    it('succeeds when number 0', () => {
      expect(0).to(beFalsy)
    })

    it('fails when true', () => {
      assert.throws(
        () => expect(true).to(beFalsy),
        (err) => err.message === 'Expected true to be falsy'
      )
    })

    it('fails when non-empty string', () => {
      assert.throws(
        () => expect('test').to(beFalsy),
        (err) => err.message === 'Expected "test" to be falsy'
      )
    })
  })

  describe('beUndefined', () => {
    it('succeeds when undefined', () => {
      expect(undefined).to(beUndefined)
    })

    it('fails when null', () => {
      assert.throws(
        () => expect(null).to(beUndefined),
        (err) => err.message === 'Expected [null] to be [undefined]'
      )
    })

    it('fails when string', () => {
      assert.throws(
        () => expect('').to(beUndefined),
        (err) => err.message === 'Expected "" to be [undefined]'
      )
    })
  })

  describe('beNull', () => {
    it('succeeds when null', () => {
      expect(null).to(beNull)
    })

    it('fails when undefined', () => {
      assert.throws(
        () => expect(undefined).to(beNull),
        (err) => err.message === 'Expected [undefined] to be [null]'
      )
    })

    it('fails when string', () => {
      assert.throws(
        () => expect('').to(beNull),
        (err) => err.message === 'Expected "" to be [null]'
      )
    })
  })

  describe('exist', () => {
    it('succeeds when string', () => {
      expect('test').to(exist)
    })

    it('fails when undefined', () => {
      assert.throws(
        () => expect(undefined).to(exist),
        (err) => err.message === 'Expected [undefined] to exist'
      )
    })

    it('fails when null', () => {
      assert.throws(
        () => expect(null).to(exist),
        (err) => err.message === 'Expected [null] to exist'
      )
    })
  })

  describe('beEmpty', () => {
    it('succeeds when array is empty', () => {
      expect([]).to(beEmpty)
    })

    it('fails when array contains any items', () => {
      assert.throws(
        () => expect([1]).to(beEmpty),
        (err) => err.message === 'Expected [\n  1\n] to be empty'
      )
    })
  })

  describe('contain', () => {
    it('succeeds when array contains item', () => {
      expect([1, 2, 3]).to(contain(1))
    })

    it('fails when array does not contain item', () => {
      assert.throws(
        () => expect([1, 2, 3]).to(contain(4)),
        (err) => err.message === 'Expected [\n  1\n  2\n  3\n] to contain 4'
      )
    })
  })

  describe('beInstanceOf', () => {
    it('succeeds for dates', () => {
      expect(new Date()).to(beInstanceOf(Date))
    })

    it('succeeds for objects', () => {
      expect({}).to(beInstanceOf(Object))
    })

    it('succeeds for constructor functions', () => {
      function C () {}
      var o = new C()

      expect(o).to(beInstanceOf(C))
    })

    it('fails when type does not match', () => {
      assert.throws(
        () => expect({}).to(beInstanceOf(String)),
        (err) => err.message === 'Expected {} to be instance of String'
      )
    })

    it('fails when different constructor function', () => {
      function C () {}
      function D () {}
      var o = new C()

      assert.throws(
        () => expect(o).to(beInstanceOf(D)),
        (err) => err.message === 'Expected {} to be instance of D'
      )
    })
  })

  describe('beType', () => {
    it('succeeds for objects', () => {
      expect({}).to(beType('object'))
    })

    it('succeeds for date', () => {
      expect(new Date()).to(beType('object'))
    })

    it('succeeds for string', () => {
      expect('test').to(beType('string'))
    })

    it('succeeds for undefined', () => {
      expect(undefined).to(beType('undefined'))
    })

    it('succeeds for boolean', () => {
      expect(true).to(beType('boolean'))
    })
  })

  describe('match', () => {
    it('succeeds when strings match', () => {
      expect('Hello').to(match(/hello/i))
    })

    it('fails when strings does not match', () => {
      assert.throws(
        () => expect('hola').to(match(/hello/)),
        (err) => err.message === 'Expected "hola" to match /hello/'
      )
    })
  })

  describe('throws', () => {
    it('fails when not given function as actual value', () => {
      assert.throws(
        () => expect('test').to(throwError()),
        (err) => err.message === 'Expected function as input to assertion'
      )
    })

    it('succeeds when function throws', () => {
      expect(() => {
        throw new Error()
      }).to(throwError())
    })

    it('works with "throws" alias', () => {
      expect(() => {
        throw new Error()
      }).to(throws())
    })

    it('succeeds when function throws expected error', () => {
      expect(() => {
        throw new Error()
      }).to(throwError(Error))
    })

    it('succeeds when function throws expected message', () => {
      expect(() => {
        throw new Error('foo')
      }).to(throwError('foo'))
    })

    it('succeeds when function throws expected regex message', () => {
      expect(() => {
        throw new Error(/foo/)
      }).to(throwError('foo'))
    })

    it('fails when functions does not throw', () => {
      assert.throws(
        () => expect(() => {}).to(throwError()),
        (err) => err.message === 'Expected function to throw'
      )
    })

    it('fails when expecting the wrong type', () => {
      assert.throws(
        () =>
          expect(() => {
            throw new Error()
          }).to(throwError(RangeError)),
        (err) => err.message === 'Expected to throw RangeError but Error was thrown'
      )
    })

    it('fails when expecting the wrong message', () => {
      assert.throws(
        () =>
          expect(() => {
            throw new Error('foo')
          }).to(throwError('bar')),
        (err) => err.message === 'Expected to throw error matching bar but got foo'
      )
    })

    it('fails when not matching expecting message', () => {
      assert.throws(
        () =>
          expect(() => {
            throw new Error('foo')
          }).to(throwError(/bar/)),
        (err) => err.message === 'Expected to throw error matching /bar/ but got foo'
      )
    })
  })
})
