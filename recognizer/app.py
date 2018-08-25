import requests
from flask import Flask, request, jsonify, send_from_directory
app = Flask(__name__)
import os
import predict_3


@app.route('/')
def index():
    return "hello world"

@app.route('/recognize')
def recognize():
    imvalue = predict_3.imageprepare('out.png')
    predint = predict_3.predictint(imvalue)
    # print (predint[0])
    data = predint[0]
    return predint[0]
