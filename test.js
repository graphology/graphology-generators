/**
 * Graphology Utils Unit Tests
 * ============================
 */
var assert = require('assert'),
    Graph = require('graphology');

var UndirectedGraph = Graph.UndirectedGraph;

var classic = require('./classic');

describe('graphology-generators', function() {

  describe('classic', function() {

    describe('#.complete', function() {

      it('should throw if the provided constructor is invalid.', function() {
        assert.throws(function() {
          classic.complete(Array);
        }, /constructor/);
      });

      it('should return a complete graph.', function() {
        var graph = classic.complete(UndirectedGraph, 5);

        assert.strictEqual(graph.order, 5);
        assert.strictEqual(graph.size, 10);

        console.log(graph);
      });
    });
  });
});
