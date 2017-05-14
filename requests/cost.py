from urllib2 import urlopen, Request
import json
import urllib2
import pandas as pd
from functions import haversine



class RequestCost:

    def __init__(self):
        pass

    """
        Create data frame cost by neighborhood
    """
    def get_data(self):
        url ="static/json/cost_rent.json" #take care with this url.
        data = open(url, "r+")

        result = json.load(data)
        aux = json.dumps(result)
        aux2 = json.dumps(json.loads(aux))

        #Data Frame
        data_frame =  pd.read_json(aux2)
        data_frame = data_frame.dropna()
        return data_frame
