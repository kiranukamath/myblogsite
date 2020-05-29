---
path: Matrix Calculus
date: 2020-05-29T15:20:20.957Z
title: Matrix Calculus for DeepLearning (Part2)
description: 'this is 2nd part of blog, chain rule.'
---
We can’t compute partial derivatives of very complicated functions using just the basic matrix calculus rules we’ve seen [Blog part 1](https://kirankamath.netlify.app/blog/matrix-calculus-for-deeplearning-part1/). For example, we can’t take the derivative of nested expressions like sum(**w** + **x**) directly without reducing it to its scalar equivalent. We need to be able to combine our basic vector rules using the vector chain rule. 

In paper they have defined and named three different chain rules.

1. single-variable chain rule
2. single-variable total-derivative chain rule
3. vector chain rule

The chain rule comes into play when we need the derivative of an expression composed of nested subexpressions. Chain rule helps in solving problem by breaking complicated expressions into subexpression whose derivatives are easy to compute. 

## Single-variable chain rule
