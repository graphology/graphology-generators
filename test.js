/**
 * Graphology Utils Unit Tests
 * ============================
 */
var assert = require('assert'),
    Graph = require('graphology'),
    seedrandom = require('seedrandom');

var UndirectedGraph = Graph.UndirectedGraph,
    DirectedGraph = Graph.DirectedGraph;

var rng = seedrandom('test');

var classic = require('./classic'),
    random = require('./random');

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

  describe('random', function() {

    describe('#.erdosRenyi', function() {

      it('should throw if the provided constructor is invalid.', function() {
        assert.throws(function() {
          random.erdosRenyi(Array);
        }, /constructor/);
      });

      it('should return a graph without edges if probability is 0.', function() {
        var graph = random.erdosRenyi(UndirectedGraph, {n: 5, probability: 0});

        assert.strictEqual(graph.order, 5);
        assert.strictEqual(graph.size, 0);
        assert.deepEqual(graph.nodes(), [0, 1, 2, 3, 4]);
      });

      it('should return a binomial graph.', function() {
        var undirectedGraph = random.erdosRenyi(UndirectedGraph, {n: 5, probability: 0.5, rng: rng});

        assert.strictEqual(undirectedGraph.size, 7);

        var directedGraph = random.erdosRenyi(DirectedGraph, {n: 5, probability: 0.5, rng: rng});

        assert.strictEqual(directedGraph.size, 8);

        var graph = random.erdosRenyi(Graph, {n: 5, probability: 0.5, rng: rng});

        assert.strictEqual(graph.size, 16);
      });
    });
  });
});
