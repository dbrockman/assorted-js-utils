'use strict';

require('chai').should();
var flattenTree = require('..').flattenTree;
var groupLeafs = require('..').groupLeafs;
var flattenLeafAncestors = require('..').flattenLeafAncestors;
var flattenArray = require('..').flattenArray;

describe('flattenTree', function() {

  it('test 1', function() {
    flattenTree({
      'a.b': {
        x: 'a.b x val',
        y: 'a.b y val'
      },
      'a.c': {
        x: 'a.c x val',
        y: 'a.c y val'
      }
    }).should.eql({
      'a.b.x': 'a.b x val',
      'a.b.y': 'a.b y val',
      'a.c.x': 'a.c x val',
      'a.c.y': 'a.c y val'
    });
  });

  it('test 2', function() {
    flattenTree({
      a: {
        b: {
          x: 'a.b x val',
          y: 'a.b y val'
        },
        c: {
          x: 'a.c x val',
          y: 'a.c y val'
        }
      }
    }).should.eql({
      'a.b.x': 'a.b x val',
      'a.b.y': 'a.b y val',
      'a.c.x': 'a.c x val',
      'a.c.y': 'a.c y val'
    });
  });

  it('test 3', function() {
    flattenTree({
      a: {
        x: 'a x val',
        y: 'a y val',
        b: {
          x: 'a.b x val',
          y: 'a.b y val'
        },
        c: {
          x: 'a.c x val',
          y: 'a.c y val',
          d: {
            x: 'a.c.d x val',
            y: 'a.c.d y val'
          }
        }
      }
    }).should.eql({
      'a.x': 'a x val',
      'a.y': 'a y val',
      'a.b.x': 'a.b x val',
      'a.b.y': 'a.b y val',
      'a.c.x': 'a.c x val',
      'a.c.y': 'a.c y val',
      'a.c.d.x': 'a.c.d x val',
      'a.c.d.y': 'a.c.d y val'
    });
  });

});


describe('groupLeafs', function() {

  it('should group the leafs', function() {
    groupLeafs({
      'a.x': 'a x val',
      'a.y': 'a y val',
      'a.b.x': 'a.b x val',
      'a.b.y': 'a.b y val',
      'a.c.x': 'a.c x val',
      'a.c.y': 'a.c y val',
      'a.c.d.x': 'a.c.d x val',
      'a.c.d.y': 'a.c.d y val'
    }).should.eql({
      'a': {
        x: 'a x val',
        y: 'a y val'
      },
      'a.b': {
        x: 'a.b x val',
        y: 'a.b y val'
      },
      'a.c': {
        x: 'a.c x val',
        y: 'a.c y val'
      },
      'a.c.d': {
        x: 'a.c.d x val',
        y: 'a.c.d y val'
      }
    });
  });

});


describe('flattenLeafAncestors', function() {

  it('test 1', function() {
    flattenLeafAncestors({
      'a.b': {
        x: 'a.b x val',
        y: 'a.b y val'
      },
      'a.c': {
        x: 'a.c x val',
        y: 'a.c y val'
      }
    }).should.eql({
      'a.b': {
        x: 'a.b x val',
        y: 'a.b y val'
      },
      'a.c': {
        x: 'a.c x val',
        y: 'a.c y val'
      }
    });
  });

  it('test 2', function() {
    flattenLeafAncestors({
      a: {
        b: {
          x: 'a.b x val',
          y: 'a.b y val'
        },
        c: {
          x: 'a.c x val',
          y: 'a.c y val'
        }
      }
    }).should.eql({
      'a.b': {
        x: 'a.b x val',
        y: 'a.b y val'
      },
      'a.c': {
        x: 'a.c x val',
        y: 'a.c y val'
      }
    });
  });

  it('test 3', function() {
    flattenLeafAncestors({
      a: {
        x: 'a x val',
        y: 'a y val',
        b: {
          x: 'a.b x val',
          y: 'a.b y val'
        },
        c: {
          x: 'a.c x val',
          y: 'a.c y val',
          d: {
            x: 'a.c.d x val',
            y: 'a.c.d y val'
          }
        }
      }
    }).should.eql({
      'a': {
        x: 'a x val',
        y: 'a y val'
      },
      'a.b': {
        x: 'a.b x val',
        y: 'a.b y val'
      },
      'a.c': {
        x: 'a.c x val',
        y: 'a.c y val'
      },
      'a.c.d': {
        x: 'a.c.d x val',
        y: 'a.c.d y val'
      }
    });
  });

});


describe('flattenArray', function() {

  it('should flatten an nested array', function() {
    flattenArray([1, 2, [3, [[4, 5, [6, 7], 8]], 9]])
        .should.eql([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    flattenArray([[[[1]]]])
        .should.eql([1]);
    flattenArray([[[[]]]])
        .should.eql([]);
  });

  it('should return an empty array if argument is not an array', function() {
    flattenArray({}).should.eql([]);
  });

});
