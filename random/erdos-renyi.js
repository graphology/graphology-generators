/**
 * Graphology Erdos-Renyi Graph Generator
 * =======================================
 *
 * Function generating binomial graphs.
 */
var isGraphConstructor = require('graphology-utils/is-graph-constructor'),
    combinations = require('obliterator/combinations'),
    range = require('lodash/range');

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

  for (var i = 0; i < n; i++)
    graph.addNode(i);

  if (probability <= 0)
    return graph;

  if (n > 1) {
    var iterator = combinations(range(n), 2),
        path,
        step,
        path;

    while ((step = iterator.next(), !step.done)) {
      path = step.value;

      if (graph.type !== 'directed') {
        if (rng() < probability)
          graph.addUndirectedEdge(path[0], path[1]);
      }

      if (graph.type !== 'undirected') {

        if (rng() < probability)
          graph.addDirectedEdge(path[0], path[1]);

        if (rng() < probability)
          graph.addDirectedEdge(path[1], path[0]);
      }
    }
  }

  return graph;
};
