/**
 * Graphology Complete Graph Generator
 * ====================================
 *
 * Function generating complete graphs.
 */
var isGraphConstructor = require('graphology-utils/is-graph-constructor'),
    generatorics = require('generatorics'),
    range = require('lodash/range');

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
      var iterator = generatorics.combination(r, 2),
          key,
          path,
          step;

      while ((step = iterator.next(), !step.done)) {
        path = step.value;

        key = path[0] + '<->' + path[1];
        graph.mergeUndirectedEdgeWithKey(key, path[0], path[1]);
      }
    }

    if (graph.type === 'mixed' || graph.type === 'directed') {
      var iterator = generatorics.permutation(r, 2),
          key,
          path,
          step;

      while ((step = iterator.next(), !step.done)) {
        path = step.value;

        key = path[0] + '->' + path[1];
        graph.mergeDirectedEdgeWithKey(key, path[0], path[1]);
      }
    }
  }

  return graph;
};
