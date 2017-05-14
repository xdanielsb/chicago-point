from urllib2 import urlopen, Request
import json
import urllib2
import pandas as pd
from functions import haversine



class RequestHouses:

    def __init__(self):
        pass

    """
        Get the houses for rent
    """
    def get_data(self):
        url = "https://data.cityofchicago.org/resource/uahe-iimk.json"
        data  = urllib2.urlopen(url)

        #Tricky part
        result = json.load(data)
        aux = json.dumps(result)
        aux2 = json.dumps(json.loads(aux))

        #Data Frame
        data_frame =  pd.read_json(aux2)
        data_frame = data_frame.dropna()
        distances = []
        #Compute the distance between two points useing harvesine formule
        for index, row in data_frame.iterrows():
            distances.append(haversine(row['longitude'], row['latitude']))
        data_frame['distance'] = pd.Series(distances, index=data_frame.index)

        return data_frame
