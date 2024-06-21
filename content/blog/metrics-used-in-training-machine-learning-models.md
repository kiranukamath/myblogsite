---
path: Metrics in ml
date: 2020-07-26T06:42:22.954Z
title: Metrics used in training Machine Learning models
description: >-
  Evaluation metrics are used to measure the quality of the statistical or
  machine learning model.
---
Evaluation metrics are used to measure the quality of the machine learning model. Evaluating machine learning models or algorithms is essential for any project. There are many different types of evaluation metrics available to test a model. The step after implementing a machine learning algorithm is to find out how effective is the model based on metrics and datasets. Different metrics are used to evaluate different Machine Learning Algorithms. These include classification accuracy, logarithmic loss, confusion matrix, and others. 

Classification accuracy is the ratio of the number of correct predictions to the total number of input samples, which is usually what we refer to when we use the term accuracy. 

Logarithmic loss, also called log loss, works by penalizing the false classifications. 

A confusion matrix gives us a matrix as output and describes the complete performance of the model. 

**Why is this Useful?**

It is very important to use multiple evaluation metrics to evaluate your model. This is because a model may perform well using one measurement from one evaluation metric, but may perform poorly using another measurement from another evaluation metric. Using evaluation metrics are critical in ensuring that your model is operating correctly and optimally. 

The next important question while evaluating the performance of a machine learning model is what dataset should be used to evaluate model performance. The machine learning model cannot be simply tested using the training set, because the output will be prejudiced because it is being trained on the training dataset. Therefore in order to estimate the generalization error, the model is required to test a dataset which it hasn’t seen yet, that is testing dataset.
