/**
 * Graphology Path Graph Generator
 * ================================
 *
 * Function generating path graphs.
 */
var isGraphConstructor = require('graphology-utils/is-graph-constructor'),
    addPath = require('graphology-utils/add-path'),
    range = require('lodash/range');

/**
 * Generates a path graph with n nodes.
 *
 * @param  {Class}  GraphClass - The Graph Class to instantiate.
 * @param  {number} order      - Number of nodes of the graph.
 * @return {Graph}
 */
module.exports = function path(GraphClass, order) {
  if (!isGraphConstructor(GraphClass))
    throw new Error('graphology-generators/classic/path: invalid Graph constructor.');

  var graph = new GraphClass();

  addPath(graph, range(order));

  return graph;
};
