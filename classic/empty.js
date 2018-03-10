/**
 * Graphology Empty Graph Generator
 * =================================
 *
 * Function generating empty graphs.
 */
var isGraphConstructor = require('graphology-utils/is-graph-constructor'),
    range = require('lodash/range');

/**
 * Generates an empty graph with n nodes and 0 edges.
 *
 * @param  {Class}  GraphClass - The Graph Class to instantiate.
 * @param  {number} order      - Number of nodes of the graph.
 * @return {Graph}
 */
module.exports = function empty(GraphClass, order) {
  if (!isGraphConstructor(GraphClass))
    throw new Error('graphology-generators/classic/empty: invalid Graph constructor.');

  var graph = new GraphClass();

  graph.addNodesFrom(range(order));

  return graph;
};
