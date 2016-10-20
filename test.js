/**
 * Graphology Utils Unit Tests
 * ============================
 */
var assert = require('assert'),
    Graph = require('graphology');

var UndirectedGraph = Graph.UndirectedGraph,
    DirectedGraph = Graph.DirectedGraph;

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
        var undirectedGraph = classic.complete(UndirectedGraph, 5);

        assert.strictEqual(undirectedGraph.order, 5);
        assert.strictEqual(undirectedGraph.size, 5 * (5 - 1) / 2);

        var directedGraph = classic.complete(DirectedGraph, 5);

        assert.strictEqual(directedGraph.order, 5);
        assert.strictEqual(directedGraph.size, 5 * (5 - 1));

        var graph = classic.complete(Graph, 5);

        assert.strictEqual(graph.order, 5);
        assert.strictEqual(graph.size, (5 * (5 - 1) / 2) + (5 * (5 - 1)));
      });
    });
  });
});
