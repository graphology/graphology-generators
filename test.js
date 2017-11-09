/**
 * Graphology Utils Unit Tests
 * ============================
 */
var assert = require('assert'),
    Graph = require('graphology'),
    seedrandom = require('seedrandom');

var UndirectedGraph = Graph.UndirectedGraph,
    DirectedGraph = Graph.DirectedGraph;

var rng = function() {
  return seedrandom('test');
};

var classic = require('./classic'),
    random = require('./random'),
    social = require('./social');

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

    describe('#.clusters', function() {
      it('should throw if the provided constructor is invalid.', function() {
        assert.throws(function() {
          random.clusters(Array);
        }, /constructor/);
      });

      it('should throw if the options are invalid.', function() {
        assert.throws(function() {
          random.clusters(UndirectedGraph);
        }, /order/);

        assert.throws(function() {
          random.clusters(UndirectedGraph, {density: null});
        }, /density/);

        assert.throws(function() {
          random.clusters(UndirectedGraph, {rng: true});
        }, /rng/);

        assert.throws(function() {
          random.clusters(UndirectedGraph, {density: 0.5});
        }, /order/);

        assert.throws(function() {
          random.clusters(UndirectedGraph, {density: -10});
        }, /density/);

        assert.throws(function() {
          random.clusters(UndirectedGraph, {density: 0.5, order: 30});
        }, /size/);

        assert.throws(function() {
          random.clusters(UndirectedGraph, {density: 0.5, order: -30});
        }, /order/);

        assert.throws(function() {
          random.clusters(UndirectedGraph, {density: 0.5, order: 30, size: 100});
        }, /clusters/);

        assert.throws(function() {
          random.clusters(UndirectedGraph, {density: 0.5, order: 30, size: -500});
        }, /size/);

        assert.throws(function() {
          random.clusters(UndirectedGraph, {density: 0.5, order: 30, size: 100, clusters: -4});
        }, /clusters/);
      });

      it('should generate a correct graph.', function() {
        var graph = random.clusters(DirectedGraph, {
          order: 5,
          size: 20,
          clusters: 3,
          rng: rng()
        });

        assert.strictEqual(graph.order, 5);
        assert.strictEqual(graph.size, 6);
      });
    });

    describe('#.erdosRenyi', function() {
      var sparse = random.erdosRenyi.sparse;

      it('should throw if the provided constructor is invalid.', function() {
        assert.throws(function() {
          random.erdosRenyi(Array);
        }, /constructor/);

        assert.throws(function() {
          sparse(Array);
        }, /constructor/);
      });

      it('should return a graph without edges if probability is 0.', function() {
        var graph = random.erdosRenyi(UndirectedGraph, {order: 5, probability: 0});

        assert.strictEqual(graph.order, 5);
        assert.strictEqual(graph.size, 0);
        assert.deepEqual(graph.nodes(), [0, 1, 2, 3, 4]);

        graph = sparse(UndirectedGraph, {order: 5, probability: 0});

        assert.strictEqual(graph.order, 5);
        assert.strictEqual(graph.size, 0);
        assert.deepEqual(graph.nodes(), [0, 1, 2, 3, 4]);
      });

      it('should return a binomial graph.', function() {
        var undirectedGraph = random.erdosRenyi(UndirectedGraph, {order: 5, probability: 0.5, rng: rng()});

        assert.strictEqual(undirectedGraph.size, 7);
        assert.strictEqual(undirectedGraph.order, 5);

        undirectedGraph = sparse(UndirectedGraph, {order: 5, probability: 0.5, rng: rng()});

        assert.strictEqual(undirectedGraph.size, 4);
        assert.strictEqual(undirectedGraph.order, 5);

        var directedGraph = random.erdosRenyi(DirectedGraph, {order: 5, probability: 0.5, rng: rng()});

        assert.strictEqual(directedGraph.size, 11);
        assert.strictEqual(directedGraph.order, 5);

        directedGraph = sparse(DirectedGraph, {order: 5, probability: 0.5, rng: rng()});

        assert.strictEqual(directedGraph.size, 11);
        assert.strictEqual(directedGraph.order, 5);

        var graph = random.erdosRenyi(Graph, {order: 5, probability: 0.5, rng: rng()});

        assert.strictEqual(graph.size, 15);
        assert.strictEqual(graph.order, 5);

        graph = sparse(Graph, {order: 5, probability: 0.5, rng: rng()});

        assert.strictEqual(graph.size, 14);
        assert.strictEqual(graph.order, 5);
      });
    });

    describe('#.girvanNewman', function() {

      it('should throw if the provided constructor is invalid.', function() {
        assert.throws(function() {
          random.girvanNewman(Array);
        }, /constructor/);
      });

      it('should return the expected graph.', function() {
        var graph = random.girvanNewman(Graph, {zOut: 4, rng: rng()});

        assert.strictEqual(graph.order, 128);
        assert.strictEqual(graph.size, 1042);
      });
    });
  });

  describe('social', function() {

    describe('#.karate', function() {
      it('should throw if the provided constructor is invalid.', function() {
        assert.throws(function() {
          social.karateClub(Array);
        }, /constructor/);
      });

      it('should return Zachary\'s karate club graph.', function() {
        var graph = social.karateClub(Graph);

        assert.strictEqual(graph.order, 34);
        assert.strictEqual(graph.size, 78);
      });
    });
  });
});
