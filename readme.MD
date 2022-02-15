

# Introduction

  

This repository contains code and data for my article "[Decentralize Knowledge Graph  with GUN](https://medium.com/p/cc21765fa8a6)".

1. Both import_node.js and import_edge.js are used for importing the data


2. query_relation.js is an example of query. It queries the all the proteins that are connected to a certain protein and calculate their average size. 

3. the two txt are STRING data. They contain the protein-protein interaction of Formosa agariphila. They can be imported by the two import scripts.

4. The radata folder contains the imported knowledge graph. You can remove it and create your own by running the import scripts.


# Prerequisite

node and npm

# Data preparation

To import the data, you need to run the two scripts

```console
node import_node

node import_edge
```

Both of them will be showing the current import items. The edge import takes a small while. Wait until there is no more output from the console.



# Authors

*  **Sixing Huang** - *Concept and Coding*

  

## License

  

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
