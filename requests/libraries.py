from urllib2 import urlopen, Request
import json
import urllib2
import pandas as pd
from functions import haversine



class RequestLibrary:

    def __init__(self):
        pass

    """
        Get the libraries in chicago
    """
    def get_data(self):
        url = "https://data.cityofchicago.org/resource/x8fc-8rcq.json"
        data  = urllib2.urlopen(url)

        #Tricky part
        result = json.load(data)
        #Data Frame
        data_frame =  pd.read_json(json.dumps(result))
        return data_frame
