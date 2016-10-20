/**
 * Graphology Complete Graph Generator
 * ====================================
 *
 * Function generating complete graphs.
 */
var isGraphConstructor = require('graphology-utils/is-graph-constructor'),
    combinatorics = require('js-combinatorics'),
    range = require('lodash/range');

var permutations = combinatorics.permutation,
    combinations = combinatorics.combination;

/**
 * Generates a complete graph with n nodes.
 *
 * @param  {Class}  GraphClass - The Graph Class to instantiate.
 * @param  {number} n          - Number of nodes of the graph.
 * @return {Graph}
 */
module.exports = function complete(GraphClass, n) {
  if (!isGraphConstructor(GraphClass))
    throw new Error('graphology-generators/classic/complete: invalid Graph constructor.');

  var graph = new GraphClass();

  if (n > 1) {
    var r = range(n);

    if (graph.type === 'mixed' || graph.type === 'undirected') {
      var iterator = combinations(r, 2),
          key,
          path;

      while ((path = iterator.next())) {
        key = path[0] + '<->' + path[1];
        graph.mergeUndirectedEdgeWithKey(key, path[0], path[1]);
      }
    }

    if (graph.type === 'mixed' || graph.type === 'directed') {
      var iterator = permutations(r, 2),
          key,
          path;

      while ((path = iterator.next())) {
        key = path[0] + '->' + path[1];
        graph.mergeDirectedEdgeWithKey(key, path[0], path[1]);
      }
    }
  }

  return graph;
};
