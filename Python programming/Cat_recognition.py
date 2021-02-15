# -*- coding: utf-8 -*-
"""
Created on Thu Dec 17 09:21:39 2020

@author: Babou
"""


import numpy as np
import h5py
import matplotlib.pyplot as plt

import Deep_Neural_Networks
from Deep_Neural_Networks import train_model, predict


### DATASET FOR CAT RECOGNITION TRAINING ###
def load_data():
    train_dataset = h5py.File('Data/train_catvnoncat.h5', "r")

    train_set_x_orig = np.array(train_dataset["train_set_x"][:]) # your train set features
    train_set_y_orig = np.array(train_dataset["train_set_y"][:]) # your train set labels

    test_dataset = h5py.File('Data/test_catvnoncat.h5', "r")
    test_set_x_orig = np.array(test_dataset["test_set_x"][:]) # your test set features
    test_set_y_orig = np.array(test_dataset["test_set_y"][:]) # your test set labels

    classes = np.array(test_dataset["list_classes"][:]) # the list of classes
    
    num_px = train_set_x_orig.shape[1] # the number of pixels for both width and height
  
    return train_set_x_orig, train_set_y_orig, test_set_x_orig, test_set_y_orig, classes, num_px


def format_data(train_set_x_orig, train_set_y_orig, test_set_x_orig, test_set_y_orig):
    # Set horizontal vector of the labels of the training set
    train_y = train_set_y_orig.reshape((1, train_set_y_orig.shape[0]))
    # Set horizontal vector of the labels of the testing set
    test_y = test_set_y_orig.reshape((1, test_set_y_orig.shape[0]))
    # Set a flattenned RGB vertical vectors matrix with all the training samples in columns (line by line in the image for R, then for G and then for B)
    train_x_flatten = train_set_x_orig.reshape(train_set_x_orig.shape[0], -1).T / 255.  
    # Set a flattenned RGB vertical vectors matrix with all the testing samples in columns (line by line in the image for R, then for G and then for B)
    test_x_flatten = test_set_x_orig.reshape(test_set_x_orig.shape[0], -1).T / 255.
    
    return train_x_flatten, train_y, test_x_flatten, test_y
        


## CAT RECOGNITION DATASET PREPARATION ##
# Load the brut Cat images dataset
train_set_x_orig, train_set_y_orig, test_set_x_orig, test_set_y_orig, classes, num_px = load_data()
# Format the Cat images dataset to be fed in the Neural networks
train_x_flatten, train_y, test_x_flatten, test_y = format_data(train_set_x_orig, train_set_y_orig, test_set_x_orig, test_set_y_orig)



### TRAINING SETUP AND EXECUTION ###
#Neural Network architecture
layers_defs = [train_x_flatten.shape[0], 30, 10, 1]
#Parameters initialization
type_init = "He"
#Hyperparameters
nb_iter = 1000
mini_batch_size = train_x_flatten.shape[1]
learning_rate = 0.01
keep_prob = None #'None' means no Dropout
lambd = 0 #'0' means no L2 regularization
opt_method = "momentum"
beta = 0.9 #used for Maxima opt method
beta1 = 0.9 #used for Adam opt method
beta2 = 0.999 #used for Adam opt method
epsilon = 1e-8 #used for Adam opt method
#Model training
parameters, costs, grads, _ = train_model(layers_defs, type_init, nb_iter, mini_batch_size, learning_rate, keep_prob, lambd, opt_method, beta, beta1, beta2, epsilon, train_x_flatten, train_y)
#Training results
Y_predict_train = predict(layers_defs, keep_prob, parameters, train_x_flatten, classes.shape[0])
m = train_x_flatten.shape[1]
print("Accuracy on training samples: " + str(np.sum((Y_predict_train == train_y)/m)))
Y_predict_test = predict(layers_defs, keep_prob, parameters, test_x_flatten, classes.shape[0])
m = test_x_flatten.shape[1]
print("Accuracy on testing samples: " + str(np.sum((Y_predict_test == test_y)/m)))



### TESTING ON A RANDOM IMAGE ###
import PIL
from PIL import Image
   
fname = "Data/" + "0a25fd986539e54d.jpg"
image = Image.open(fname)
# Resizing the image so that it has the sams dimensions as the ones form the training set
image = image.resize((num_px,num_px), Image.ANTIALIAS)
plt.imshow(image)

# Check if RGB image
if np.array(image.getdata()).ndim == 2:
    # Convert image in an array
    img_array = np.array(image.getdata(), dtype=np.uint8)
    # Flatten the RGB matrix to a single column vector
    img_array_reshape = img_array.reshape(num_px*num_px*3,1)
    img_array_reshape = img_array_reshape/255.
    # Compute the predicition    
    my_predicted_image, pred = predict(layers_defs, keep_prob, parameters, img_array_reshape, classes.shape[0])
    print ("For this image, the model predicts a " + classes[int(np.squeeze(my_predicted_image)),].decode('utf-8') + " picture." + " (y=" + str(np.squeeze(my_predicted_image)) + ")")

# Sanity check to be sure to be able to have the same image as the original one based on the array used for the prediction
img_array_2 = img_array_reshape.reshape((num_px,num_px,3))*255
newImage = Image.fromarray(img_array_2.astype(np.uint8))
plt.imshow(newImage, interpolation='nearest')
plt.show()

