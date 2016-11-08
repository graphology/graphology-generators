/**
 * Graphology Erdos-Renyi Graph Generator
 * =======================================
 *
 * Function generating binomial graphs.
 */
var isGraphConstructor = require('graphology-utils/is-graph-constructor'),
    combinatorics = require('js-combinatorics'),
    range = require('lodash/range');

var permutations = combinatorics.permutation,
    combinations = combinatorics.combination;

/**
 * Generates a binomial graph graph with n nodes.
 *
 * @param  {Class}    GraphClass    - The Graph Class to instantiate.
 * @param  {object}   options       - Options:
 * @param  {number}     n           - Number of nodes in the graph.
 * @param  {number}     probability - Probability for edge creation.
 * @param  {function}   rng         - Custom RNG function.
 * @return {Graph}
 */
module.exports = function erdosRenyi(GraphClass, options) {
  if (!isGraphConstructor(GraphClass))
    throw new Error('graphology-generators/random/erdos-renyi: invalid Graph constructor.');

  var n = options.n,
      probability = options.probability,
      rng = options.rng || Math.random;

  if (typeof n !== 'number' || n <= 0)
    throw new Error('graphology-generators/random/erdos-renyi: invalid `n`. Should be a positive number.');

  if (typeof probability !== 'number' || probability < 0 || probability > 1)
    throw new Error('graphology-generators/random/erdos-renyi: invalid `probability`. Should be a number between 0 and 1.');

  if (typeof rng !== 'function')
    throw new Error('graphology-generators/random/erdos-renyi: invalid `rng`. Should be a function.');

  var graph = new GraphClass();
  graph.addNodesFrom(range(n));

  if (probability <= 0)
    return graph;

  if (n > 1) {
    var r = range(n);

    if (graph.type === 'mixed' || graph.type === 'undirected') {
      var iterator = combinations(r, 2),
          key,
          path;

      while ((path = iterator.next())) {

        if (rng() < probability) {
          key = path[0] + '<->' + path[1];
          graph.mergeUndirectedEdgeWithKey(key, path[0], path[1]);
        }
      }
    }

    if (graph.type === 'mixed' || graph.type === 'directed') {
      var iterator = permutations(r, 2),
          key,
          path;

      while ((path = iterator.next())) {

        if (rng() < probability) {
          key = path[0] + '->' + path[1];
          graph.mergeDirectedEdgeWithKey(key, path[0], path[1]);
        }
      }
    }
  }

  return graph;
};
