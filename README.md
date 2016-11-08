[![Build Status](https://travis-ci.org/graphology/graphology-generators.svg)](https://travis-ci.org/graphology/graphology-generators)

# Graphology Generators

Various graph generators to be used with [`graphology`](https://graphology.github.io).

## Installation

```
npm install graphology-generators
```

## Usage

* [Classic graphs](#classic-graphs)
  - [Complete](#complete)
* [Random graphs](#random-graphs)
  - [Erdos-Renyi](#erdos-renyi)
  - [Girvan-Newman](#girvan-newman)
* [Social graphs](#social-graphs)
  - [Karate Club](#karate-club)

### Classic graphs

#### Complete

Creates a [complete](https://en.wikipedia.org/wiki/Complete_graph) graph. 

```js
import Graph, {UndirectedGraph} from 'graphology';
import {complete} from 'graphology-generators/classic';
// Alternatively, if you only want to load relevant code
import complete from 'graphology-generators/classic/complete';

// Creating a complete graph
const graph = complete(Graph, 10);

// Using another constuctor to create, say, a complete undirected graph
const graph = complete(UndirectedGraph, 10);
```

**Arguments**

* **constructor** *Class*: a `graphology` constructor.
* **n** *number*: number of nodes of the generated graph.

### Random graphs

#### Erdos-Renyi

Creates an [Erdos-Renyi](https://en.wikipedia.org/wiki/Erd%C5%91s%E2%80%93R%C3%A9nyi_model), or binomial graph.

```js
import Graph from 'graphology';
import {erdosRenyi} from 'graphology-generators/random';
// Alternatively, if you only want to load relevant code
import erdosRenyi from 'graphology-generators/random/erdos-renyi';

// Creating a binomial graph
const graph = erdosRenyi(Graph, {n: 10, probability: 0.5});
```

**Arguments**

* **constructor** *Class*: a `graphology` constructor.
* **options** *object*: options:
  - **n** *number*: number of nodes of the generated graph.
  - **probability** *number*: probability for edge creation.
  - **rng** *function*: custom RNG function.

#### Girvan-Newman

Creates a [Girvan-Newman](http://www.pnas.org/content/99/12/7821.full.pdf) random graph as described in:

*Community Structure in  social and biological networks. Girvan Newman, 2002. PNAS June, vol 99 n 12*

```js
import Graph from 'graphology';
import {girvanNewman} from 'graphology-generators/random';
// Alternatively, if you only want to load relevant code
import girvanNewman from 'graphology-generators/random/girvan-newman';

// Creating a binomial graph
const graph = girvanNewman(Graph, {zOut: 4});
```

**Arguments**

* **constructor** *Class*: a `graphology` constructor.
* **options** *object*: options:
  - **zOut** *number*: *zout* parameter.
  - **rng** *function*: custom RNG function.

### Social graphs

#### Karate Club

Returns [Zachary's karate club](https://en.wikipedia.org/wiki/Zachary%27s_karate_club) graph.

```js
import Graph from 'graphology';
import {karateClub} from 'graphology-generators/karate-club';
// Alternatively, if you only want to load relevant code
import karateClub from 'graphology-generators/social/karate-club';

// Creating a binomial graph
const graph = karateClub(Graph);
```

**Arguments**

* **constructor** *Class*: a `graphology` constructor.
