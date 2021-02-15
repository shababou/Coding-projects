# -*- coding: utf-8 -*-
"""
Created on Wed Dec 16 10:14:18 2020

@author: Babou
"""

import numpy as np
import math
import matplotlib.pyplot as plt



def sigmoid(Z):
    A = 1./(1+np.exp(-Z))
    return A


#def sigmoid_backward(dA, Z):
#    dZ = dA * sigmoid(Z) * (1-sigmoid(Z))
#    return dZ
    
def sigmoid_backward(Z):
    dZ = sigmoid(Z) * (1-sigmoid(Z))
    return dZ


def relu(Z):
    A = np.maximum(0,Z)
    return A


def relu_backward(dA, Z):
    dZ = np.array(dA, copy=True) # just converting dz to a correct object. 
    # When z <= 0, you should set dz to 0 as well. 
    dZ[Z <= 0] = 0
    return dZ


def tanh_backward(dA, A):
    dZ = np.multiply(dA, 1 - np.power(A, 2))
    return dZ


def softmax(Z):
    e_Z = np.exp(Z - np.max(Z))
    A = e_Z / e_Z.sum(axis=0)
    return A

def softmax_backward(A_softmax, Y):
    return A_softmax - Y


def batchnorm_forward(X, gamma, beta):
    mu = np.mean(X, axis=0)
    var = np.var(X, axis=0)

    X_norm = (X - mu) / np.sqrt(var + 1e-8)
    out = gamma * X_norm + beta

    cache = (X, X_norm, mu, var, gamma, beta)

    return out, cache, mu, var


def dict_to_vector(dictionary):
    
    vector = []
    dim_dict = {}
    
    i = 0
    for key, value in dictionary.items():
        dim_dict[key] = {
            "rows":dictionary[key].shape[0],
            "cols":dictionary[key].shape[1]
        }
        vector_i = np.reshape(dictionary[key], (-1,1))
        if i == 0:
            vector = vector_i
        else:
            vector = np.concatenate((vector, vector_i), axis=0)
        i = i + 1

    return vector, dim_dict


def vector_to_dict(vector, dim_dict):
   
    dictionary = {}
    
    i_dict = 0
    for key, value in dim_dict.items():
        rows = dim_dict[key]['rows']
        cols = dim_dict[key]['cols']
        dict_i = np.zeros((rows, cols))
        for r in range(rows):
            for c in range(cols):
                dict_i[r][c] = vector[i_dict]
                i_dict = i_dict + 1            
        dictionary[key] = dict_i

    return dictionary


def check_gradients(layers_defs, keep_prob, parameters, grads, X, Y, epsilon):
   
    #This method must not include: L2 reg, Dropout, or any optimization method
    m = X.shape[1]
    L = len(layers_defs)
    
    vector_params, dim_dict = dict_to_vector(parameters)
    J_plus = np.zeros((vector_params.shape[0], 1))
    J_minus = np.zeros((vector_params.shape[0], 1))
    gradapprox = np.zeros((vector_params.shape[0], 1))
    for i in range(vector_params.shape[0]):
        vector_thetaplus = np.copy(vector_params)
        vector_thetaplus[i] = vector_thetaplus[i] + epsilon
        dict_thetaplus = vector_to_dict(vector_thetaplus, dim_dict)
        thetaplus_propagate = forward_propagate(layers_defs, keep_prob, dict_thetaplus, X) 
        J_plus[i] = (1./m) * (-np.dot(Y,np.log(thetaplus_propagate['A' + str(L-1)]).T) - np.dot(1-Y, np.log(1-thetaplus_propagate['A' + str(L-1)]).T))
        
        vector_thetaminus = np.copy(vector_params)
        vector_thetaminus[i] = vector_thetaminus[i] - epsilon
        dict_thetaminus = vector_to_dict(vector_thetaminus, dim_dict)
        thetaminus_propagate = forward_propagate(layers_defs, keep_prob, dict_thetaminus, X)                            
        J_minus[i] = (1./m) * (-np.dot(Y,np.log(thetaminus_propagate['A' + str(L-1)]).T) - np.dot(1-Y, np.log(1-thetaminus_propagate['A' + str(L-1)]).T))

        gradapprox[i] = (J_plus[i] - J_minus[i])/(2*epsilon)
    
        
    grads_sorted = {}
    inverted_grads_keys = list(grads.keys())[::-1]
    for key in inverted_grads_keys:
        if((key[:2]!="dA") and (key[:2]!="dZ")):
            grads_sorted[key] = grads[key]
    vector_grads, dim_dict = dict_to_vector(grads_sorted)
    
    
    numerator = np.linalg.norm(vector_grads - gradapprox)                              
    denominator = np.linalg.norm(vector_grads) + np.linalg.norm(gradapprox)                           
    difference = numerator / denominator                      

    
    return difference


def initialize_parameters(layers_defs, type_init):
    
    L = len(layers_defs)
    coeff = 0.01

    parameters = {}
    
    for l in range(1, L):
        if (type_init=="He"):
            coeff = np.sqrt(2./layers_defs[l-1])
        parameters['W' + str(l)] = np.random.randn(layers_defs[l], layers_defs[l-1]) * coeff
        parameters['b' + str(l)] = np.zeros((layers_defs[l], 1))
    
    return parameters


def initialize_velocity(layers_defs, parameters):

    L = len(layers_defs)
    v = {}
    
    for l in range(1, L):
        v["dW" + str(l)] = np.zeros((parameters['W' + str(l)].shape))
        v["db" + str(l)] = np.zeros((parameters['b' + str(l)].shape))
        
    return v


def initialize_adam(layers_defs, parameters) :

    L = len(layers_defs)
    v = {}
    s = {}
    
    for l in range(1, L):
        v["dW" + str(l)] = np.zeros((parameters['W' + str(l)].shape))
        v["db" + str(l)] = np.zeros((parameters['b' + str(l)].shape))
        s["dW" + str(l)] = np.zeros((parameters['W' + str(l)].shape))
        s["db" + str(l)] = np.zeros((parameters['b' + str(l)].shape))
    
    return v, s


def random_mini_batches(mini_batch_size, train_X, train_Y):
    
    m = train_X.shape[1]  
    mini_batches = []
    
    permutation = list(np.random.permutation(m))
    shuffled_X = train_X[:, permutation]
    shuffled_Y = train_Y[:, permutation].reshape((train_Y.shape[0],m))
    num_complete_minibatches = math.floor(m/mini_batch_size) 
    for k in range(0, num_complete_minibatches):
        mini_batch_X = shuffled_X[:, k*mini_batch_size: (k+1)*mini_batch_size] 
        mini_batch_Y = shuffled_Y[:, k*mini_batch_size: (k+1)*mini_batch_size]
        mini_batch = (mini_batch_X, mini_batch_Y)
        mini_batches.append(mini_batch)
    
    if m % mini_batch_size != 0:
        mini_batch_X = shuffled_X[:, (k+1)*mini_batch_size:m]
        mini_batch_Y = shuffled_Y[:, (k+1)*mini_batch_size:m]
        mini_batch = (mini_batch_X, mini_batch_Y)
        mini_batches.append(mini_batch)
    
    return mini_batches


def forward_propagate(layers_defs, keep_prob, parameters, X):    
    
    L = len(layers_defs)
    FW_propagate = {};
    FW_propagate['A0'] = X
   
    for l in range(1, L-1):
        Zl = np.dot(parameters['W' + str(l)], FW_propagate['A' + str(l-1)]) + parameters['b' + str(l)]
        FW_propagate['Z' + str(l)] = Zl
        FW_propagate['A' + str(l)] = relu(Zl)
        
        if keep_prob:
            FW_propagate['D' + str(l)] = np.random.randn(FW_propagate['A' + str(l)].shape[0], FW_propagate['A' + str(l)].shape[1])
            FW_propagate['D' + str(l)] = FW_propagate['D' + str(l)] < keep_prob                                       
            FW_propagate['A' + str(l)] = FW_propagate['A' + str(l)] * FW_propagate['D' + str(l)]                                      
            FW_propagate['A' + str(l)] = FW_propagate['A' + str(l)] / keep_prob  
        
    ZL = np.dot(parameters['W' + str(L-1)], FW_propagate['A' + str(L-2)]) + parameters['b' + str(L-1)]
    FW_propagate['Z' + str(L-1)] = ZL
    FW_propagate['A' + str(L-1)] = sigmoid(ZL)
    
    return FW_propagate


def backward_propagate(layers_defs, keep_prob, lambd, parameters, X, Y, FW_propagate):
    
    L = len(layers_defs)
    BW_propagate = {}
    m = X.shape[1]
    
    BW_propagate['dA' + str(L-1)] =  - ( np.divide(Y, FW_propagate['A' + str(L-1)]) - np.divide(1 - Y, 1 - FW_propagate['A' + str(L-1)]) )
    BW_propagate['dZ' + str(L-1)] = BW_propagate['dA' + str(L-1)]*sigmoid_backward(FW_propagate['Z' + str(L-1)])

    for l in reversed(range(L-1)):
        BW_propagate['db' + str(l+1)] = (1./m)*np.sum(BW_propagate['dZ' + str(l+1)], axis = 1, keepdims = True)
        BW_propagate['dW' + str(l+1)] = (1./m)*np.dot(BW_propagate['dZ' + str(l+1)], FW_propagate['A' + str(l)].T) + (lambd/m)*parameters['W' + str(l+1)] ;
        BW_propagate['dA' + str(l)] = np.dot(parameters['W' + str(l+1)].T, BW_propagate['dZ' + str(l+1)]); 
        
        if l != 0:
            if keep_prob:
                BW_propagate['dA' + str(l)] = BW_propagate['dA' + str(l)] * FW_propagate['D' + str(l)]
                BW_propagate['dA' + str(l)] = BW_propagate['dA' + str(l)] / keep_prob
            BW_propagate['dZ' + str(l)] = relu_backward(BW_propagate['dA' + str(l)], FW_propagate['Z' + str(l)])
       
    return BW_propagate


def update_parameters_with_gd(layers_defs, learning_rate, parameters, BW_propagate):

    L = len(layers_defs)

    for l in range(1, L):
        parameters["W" + str(l)] = parameters["W" + str(l)] - BW_propagate["dW" + str(l)]*learning_rate
        parameters["b" + str(l)] = parameters["b" + str(l)] - BW_propagate["db" + str(l)]*learning_rate
        
    return parameters


def update_parameters_with_momentum(layers_defs, learning_rate, beta, parameters, v, BW_propagate):
   
    L = len(layers_defs) 
    
    for l in range(1, L):
        v["dW" + str(l)] = beta*v["dW" + str(l)] + (1 - beta)*BW_propagate['dW' + str(l)]
        v["db" + str(l)] = beta*v["db" + str(l)] + (1 - beta)*BW_propagate['db' + str(l)]
        parameters["W" + str(l)] = parameters["W" + str(l)] - learning_rate*v["dW" + str(l)]
        parameters["b" + str(l)] = parameters["b" + str(l)] - learning_rate*v["db" + str(l)]
        
    return parameters, v


def update_parameters_with_adam(layers_defs, learning_rate, beta1, beta2, epsilon, parameters, v, s, t, BW_propagate):
    
    L = len(layers_defs) 
    v_corrected = {}                
    s_corrected = {}                       
    
    for l in range(1, L):
        v["dW" + str(l)] = beta1*v["dW" + str(l)] + (1 - beta1)*BW_propagate['dW' + str(l)]
        v["db" + str(l)] = beta1*v["db" + str(l)] + (1 - beta1)*BW_propagate['db' + str(l)]
        v_corrected["dW" + str(l)] = v["dW" + str(l)] / (1 - np.power(beta1, t))
        v_corrected["db" + str(l)] = v["db" + str(l)] / (1 - np.power(beta1, t))
        s["dW" + str(l)] = beta2*s["dW" + str(l)] + (1 - beta2)*np.power(BW_propagate['dW' + str(l)], 2)
        s["db" + str(l)] = beta2*s["db" + str(l)] + (1 - beta2)*np.power(BW_propagate['db' + str(l)], 2)
        s_corrected["dW" + str(l)] = s["dW" + str(l)] / (1 - np.power(beta2, t))
        s_corrected["db" + str(l)] = s["db" + str(l)] / (1 - np.power(beta2, t))
        parameters["W" + str(l)] = parameters["W" + str(l)] - learning_rate * v_corrected["dW" + str(l)]/(np.square(s_corrected["dW" + str(l)]) + epsilon)
        parameters["b" + str(l)] = parameters["b" + str(l)] - learning_rate * v_corrected["db" + str(l)]/(np.square(s_corrected["db" + str(l)]) + epsilon)

    return parameters, v, s


def train_model(layers_defs, type_init, nb_iter, mini_batch_size, learning_rate, keep_prob, lambd, opt_method, beta, beta1, beta2, epsilon, train_X, train_Y, visualize=False):

    L = len(layers_defs);
    costs = np.zeros((nb_iter))
    m = train_X.shape[1]
    
    parameters = initialize_parameters(layers_defs, type_init)
    
    if opt_method == "gd":
        pass
    elif opt_method == "momentum":
        v = initialize_velocity(layers_defs, parameters)
    elif opt_method == "adam":
        t = 0
        v, s = initialize_adam(layers_defs, parameters)
    
    weights = {}
    
    for i in range(0, nb_iter):
        minibatches = random_mini_batches(mini_batch_size, train_X, train_Y)
    
        for minibatch in minibatches:
            
            (minibatch_X, minibatch_Y) = minibatch

            FW_propagate = forward_propagate(layers_defs, keep_prob, parameters, minibatch_X)
            BW_propagate = backward_propagate(layers_defs, keep_prob, lambd, parameters, minibatch_X, minibatch_Y, FW_propagate)
            
            L2_regularization_cost = 0
            for l in range(1, L-1):    
                L2_regularization_cost = L2_regularization_cost + np.square(parameters['W' + str(l)]).sum()
            L2_regularization_cost = (lambd/(2*m))* L2_regularization_cost
            logprobs = np.multiply(np.log(FW_propagate['A' + str(L-1)]),minibatch_Y) + np.multiply(np.log(1 - FW_propagate['A' + str(L-1)]), 1 - minibatch_Y)
            cost = -1./m * np.sum(logprobs) + L2_regularization_cost
            #cost = (1./m) * (-np.dot(minibatch_Y,np.log(FW_propagate['A' + str(L-1)]).T) - np.dot(1-minibatch_Y, np.log(1-FW_propagate['A' + str(L-1)]).T)) + L2_regularization_cost
            costs[i] = cost
            
            if opt_method == "gd":
                parameters = update_parameters_with_gd(layers_defs, learning_rate, parameters, BW_propagate)
            elif opt_method == "momentum":
                parameters, v = update_parameters_with_momentum(layers_defs, learning_rate, beta, parameters, v, BW_propagate)
            elif opt_method == "adam":
                t = t + 1
                parameters, v, s = update_parameters_with_adam(layers_defs, learning_rate, beta1, beta2, epsilon, parameters, v, s, t, BW_propagate)    
        
        if visualize:
            weights[i] = parameters["W1"]
 
        if ((i==0) or (i==nb_iter-1)):
            print("Cost at iteration: " + str(cost))
    
    return parameters, costs, BW_propagate, weights


def predict(layers_defs, keep_prob, parameters, X, nb_classes, display_probas=0):
    
    L = len(layers_defs)

    probas_predict = forward_propagate(layers_defs, keep_prob, parameters, X)['A' + str(L-1)];

    if(display_probas):
        print(probas_predict)
    
    m = X.shape[1]
    Y_predict = np.zeros((1,m))
    # convert probas to 0/1 predictions
    for i in range(0, probas_predict.shape[1]):
        if nb_classes <= 2:
            if probas_predict[0,i] > 0.5:
                Y_predict[0,i] = 1
            else:
                Y_predict[0,i] = 0
        else:
            Y_predict[0,i] = probas_predict[:,i].argmax()
    
    return Y_predict, probas_predict



















