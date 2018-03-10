/**
 * Graphology Complete Graph Generator
 * ====================================
 *
 * Function generating complete graphs.
 */
var isGraphConstructor = require('graphology-utils/is-graph-constructor'),
    combinations = require('obliterator/combinations'),
    range = require('lodash/range');

/**
 * Generates a complete graph with n nodes.
 *
 * @param  {Class}  GraphClass - The Graph Class to instantiate.
 * @param  {number} order      - Number of nodes of the graph.
 * @return {Graph}
 */
module.exports = function complete(GraphClass, order) {
  if (!isGraphConstructor(GraphClass))
    throw new Error('graphology-generators/classic/complete: invalid Graph constructor.');

  var graph = new GraphClass();

  for (var i = 0; i < order; i++)
    graph.addNode(i);

  if (order > 1) {
    var iterator = combinations(range(order), 2),
        path,
        step;

    while ((step = iterator.next(), !step.done)) {
      path = step.value;

      if (graph.type !== 'directed')
        graph.addUndirectedEdge(path[0], path[1]);

      if (graph.type !== 'undirected') {
        graph.addDirectedEdge(path[0], path[1]);
        graph.addDirectedEdge(path[1], path[0]);
      }
    }
  }

  return graph;
};
