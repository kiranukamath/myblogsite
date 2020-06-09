---
path: datablock api
date: 2020-06-09T03:38:21.162Z
title: fastai's datablock api
description: all details of datablock api
---
\# **Blog14**

## Blogmue

How do we let the users of the fastai library build DataLoaders in a way that is simple enough that someone with minimal coding knowledge could get the hang of it, but be advanced enough to allow for exploration

## fastbook

As we have seen, PyTorch and fastai have two main classes for representing and accessing a training set or validation set: Dataset:: A collection that returns a tuple of your independent and dependent variable for a single item DataLoader:: An iterator that provides a stream of mini-batches, where each mini-batch is a couple of a batch of independent variables and a batch of dependent variables On top of these, fastai provides two classes for bringing your training and validation sets together: Datasets:: An object that contains a training Dataset and a validation Dataset DataLoaders:: An object that contains a training DataLoader and a validation DataLoader Since a DataLoader builds on top of a Dataset and adds additional functionality to it (collating multiple items into a mini-batch), it’s often easiest to start by creating and testing Datasets, and then look at DataLoaders after that’s working.
