---
path: five pytorch functions
date: 2020-07-12T05:08:39.645Z
title: Five pytorch functions I like
description: >-
  I wrote this blog while learning from Jovian PyTorch course. This blog is
  about 5 PyTorch functions I like.
---
\#**Blog19**

I wrote this blog month ago while learning from jovian.ml PyTorch course. Had to write and submit a blog of 5 pytorch functions I like, as the first assignment. It was fun. 

So let's get started.

## 5 interesting and useful pytorch functions

These are the 5 functions I found interesting to write.

* torch.clamp()
* torch.argmax()
* torch.where()
* torch.from_numpy
* torch.matmul()

```python
# Import torch and other required modules
import torch
```

## Function 1 - torch.clamp()

Clamp all elements in input into the range \[ min, max ] and return tensor

```python
# Example 1 - working
i = torch.randn(7)

torch.clamp(i, min=-0.5, max=0.5)
```

```
tensor([ 0.3991, -0.5000,  0.4462, -0.4993,  0.5000,  0.5000,  0.2525])
```

This function retricts minimum and maximum value of elements in tensor.\
in above example we have put minimum as -0.5 and maximum as 0.5

```python
# Example 2 - working
torch.clamp(i, min=0.0)
```

```
tensor([0.3991, 0.0000, 0.4462, 0.0000, 1.6489, 0.9907, 0.2525])
```

The above is nothing but a function of relu. relu replaces minimum with zero same as the above example

```python
# Example 3 - breaking (to illustrate when it breaks)
torch.clamp(i)
```

```
---------------------------------------------------------------------------

RuntimeError                              Traceback (most recent call last)

<ipython-input-16-bf99f0e86d17> in <module>
      1 # Example 3 - breaking (to illustrate when it breaks)
----> 2 torch.clamp(i)


RuntimeError: At least one of 'min' or 'max' must not be None
```

this needs a range without which function breaks

Relu can be implemented using clamp function

## Function 2 - torch.argmax()

returns indices of maximum value of all elements in input tensor\
this function is simple but can be used in finding accuracy for single label classification by passing prediction\
but before using manual_seed is important to set seed and get same output everytime, it is useful while demonstrating

```python
# Example 1 - working (change this)
torch.manual_seed(49)
k=torch.randn(7,7)
print(k)
torch.argmax(k)
```

```
tensor([[ 0.2705, -0.3641,  0.5421,  0.1219,  0.5471, -1.1156,  0.5146],
        [ 0.5792, -0.1513, -0.7178,  0.5251,  2.2830,  0.0806,  1.1384],
        [-0.5584, -0.4422,  0.0927,  0.1392, -0.9433,  0.6335, -0.2762],
        [-0.7085, -0.8226, -0.2340,  0.3303,  1.0855,  0.5016, -0.8041],
        [ 1.6240,  1.5190, -1.2851, -2.4165, -0.3303,  0.6343, -1.5740],
        [-0.7344, -0.2683, -0.3083,  0.8369,  0.6258,  1.2411, -1.2252],
        [ 0.3188,  0.6634,  0.2450,  0.1627,  0.8132,  0.2792, -0.2150]])





tensor(11)
```

returns the index of maximum value in tensor k. here index of maximum value 1.5190 is 11

```python
# Example 2 - working
print(torch.argmax(k,dim=1))
print(torch.argmax(k,dim=1,keepdim=True))
torch.argmax(k,dim=0,keepdim=True)
```

```
tensor([4, 4, 5, 4, 0, 5, 4])
tensor([[4],
        [4],
        [5],
        [4],
        [0],
        [5],
        [4]])





tensor([[4, 4, 0, 5, 1, 5, 1]])
```

here dim=1 means max value is calculated along dim 1 that is row, if dim=0 along column\
keepdim means whether the output tensor has dim retained or not.

```python
# Example 3 - breaking (to illustrate when it breaks)
torch.argmax(torch.tensor([[4.,6.],[8.,10.,12.],[14.,16.]]))
```

```
---------------------------------------------------------------------------

ValueError                                Traceback (most recent call last)

<ipython-input-7-e55fa7412cd2> in <module>
      1 # Example 3 - breaking (to illustrate when it breaks)
----> 2 torch.argmax(torch.tensor([[4.,6.],[8.,10.,12.],[14.,16.]]))


ValueError: expected sequence of length 2 at dim 1 (got 3)
```

argmax gives error when we give invalid tensor, or tensor of not dimention dimention

This function is used to find maximum value index\
This function is simple but can be used in finding accuracy for single label classification by passing prediction to function. In final layer when it gives probabilities, this function can be used.

## Function 3 - torch.where()

returns tensor of elements selected depending on condition provided.
This function is mostly helpful. for example if we have to remove all negative values in tensor with 0 as in case of relu we can use where.

```python
# Example 1 - working
x = torch.randn(2, 6)
y = torch.zeros(2, 6)
torch.where(x > 0, x, y)
```

```
tensor([[0.0000, 2.0267, 0.1806, 0.0040, 0.0000, 0.3850],
        [0.1064, 0.0000, 0.0000, 0.1939, 0.0000, 0.1403]])
```

negetive values in tensor x is replaced with 0 from tensor y.

```python
# Example 2 - working
x = torch.Tensor([1., 2, 3, 4, 7])

torch.where(x == 7, torch.Tensor([0]), x)
```

```
tensor([1., 2., 3., 4., 0.])
```

we can use where function to replace a perticular value in tensor

```python
# Example 3 - breaking (to illustrate when it breaks)
x = torch.Tensor([1., 2, 3, 4, 7])

torch.where(x == 7, 0, x)
```

```
---------------------------------------------------------------------------

TypeError                                 Traceback (most recent call last)

<ipython-input-11-d9404139b323> in <module>
      2 x = torch.Tensor([1., 2, 3, 4, 7])
      3 
----> 4 torch.where(x == 7, 0, x)


TypeError: where(): argument 'input' (position 2) must be Tensor, not int
```

position 2 is tensor, but we have passed int, so failed. so pass tensor in argument

## Function 4 - torch.from_numpy()

can create tensor from numpy array. which is mostly useful to run tensor on gpu

```python
# Example 1 - working
import numpy as np

r = np.array([1,2,3,4,5,6])
a = torch.from_numpy(r)
print(a)
type(a)
```

```
tensor([1, 2, 3, 4, 5, 6])





torch.Tensor
```

converts numpy array to tensor

```python
# Example 2 - working
l = np.array([111,12,13,14,15,16])
m = torch.from_numpy(l)
print(l)
type(m)
```

```
[111  12  13  14  15  16]





torch.Tensor
```

the need of this funtion is to convert from numpy nd array to tensor

```python
# Example 3 - breaking (to illustrate when it breaks)
g = [7,7,7]
h = torch.from_numpy(g)
```

```
---------------------------------------------------------------------------

TypeError                                 Traceback (most recent call last)

<ipython-input-22-f48bcc71eb26> in <module>
      1 # Example 3 - breaking (to illustrate when it breaks)
      2 g = [7,7,7]
----> 3 h = torch.from_numpy(g)


TypeError: expected np.ndarray (got list)
```

given anything else then ndarray this function throws error.

the need of this funtion is to convert from numpy nd array to tensor. but this mostly usefull because using numpy we can do operation in cpu and when need convert to tensor and run on gpu

## Function 5 - torch.matmul()

this is obviously useful and much need function in neural nets.
this function returns matrix product of tensors.

```python
# Example 1 - working
x = torch.randn(2, 2)
y = torch.randn(2, 5)
torch.matmul(x, y)
```

```
tensor([[-0.5585, -0.4268, -0.1464,  0.2729, -0.4232],
        [-0.1942,  2.7557,  1.4192, -0.5796,  0.8051]])
```

mat mul of 2_2 and 2_5 to give 2*5

```python
# Example 2 - working
x = torch.randn(3, 4, 4)
y = torch.randn(3,4,4)
torch.matmul(x,y)
```

```
tensor([[[ 3.2719,  0.6905,  0.2168, -1.3025],
         [ 0.8261, -0.0656, -0.1460, -1.4672],
         [-0.3187, -2.0030, -2.8979,  2.2226],
         [-2.9364, -0.5917, -1.0406, -0.4551]],

        [[ 0.7714,  0.6768, -3.8320,  0.4671],
         [-0.1203, -3.0586,  2.9324, -2.5221],
         [-0.6227,  0.0743,  0.9032,  0.0845],
         [-1.5827,  2.8724,  8.0832,  1.3175]],

        [[-1.2030,  1.9033,  0.7302, -1.7191],
         [-2.9976, -4.6867, -2.1513, -1.4554],
         [-0.4289,  1.3620,  0.5602,  0.9934],
         [-1.7558, -2.1634,  0.2784,  0.0987]]])
```

this  example is shown because we will have tensors of dimention channel_weidth_breadth and to multiply those is useful

```python
# Example 3 - breaking (to illustrate when it breaks)
y = torch.randn(3, 1)
torch.matmul(x, y)
```

```
---------------------------------------------------------------------------

RuntimeError                              Traceback (most recent call last)

<ipython-input-32-75ff4103ae09> in <module>
      1 # Example 3 - breaking (to illustrate when it breaks)
      2 y = torch.randn(3, 1)
----> 3 torch.matmul(x, y)


RuntimeError: size mismatch, m1: [12 x 4], m2: [3 x 1] at /opt/conda/conda-bld/pytorch_1587428266983/work/aten/src/TH/generic/THTensorMath.cpp:41
```

column of matrix 1 should match with row of matrix 2 or throws error.

matrix multiplication is main operation in nueral nets. so this is definatly in my list

## 

credits: PyTorch official docs, Jovian.ml

## Reference Links

Provide links to your references and other interesting articles about tensors

* Official documentation for `torch.Tensor`: https://pytorch.org/docs/stable/tensors.html
