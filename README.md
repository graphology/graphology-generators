# Graphology Generators

Various graph generators to be used with [`graphology`](https://graphology.github.io).

## Installation

```
npm install graphology-generators
```

## Usage

* [Classic graphs](#classic-graphs)
  - [Complete](#complete)

### Classic graphs

#### Complete

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
