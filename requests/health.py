from urllib2 import urlopen, Request
from irequest import IRequest
import json
import urllib2
import pandas as pd
from functions import haversine


class RequestHealth(IRequest):

    def __init__(self):
        self.health_data = self.get_data()

    """
        Get information about the health in a community
    """
    def get_data(self):
        url = "https://data.cityofchicago.org/resource/iqnk-2tcu.json"
        data = urllib2.urlopen(url)

        #Tricky part
        result = json.load(data)
        aux = json.dumps(result)
        aux2 = json.dumps(json.loads(aux))

        #Data Frame
        data_frame =  pd.read_json(aux2)
        data_frame = data_frame.dropna()

        return data_frame

    """
        Get the information of the comunity
    """
    def get_information_comunity(self):
        info = self.health_data[["community_area", "cancer_all_sites", "below_poverty_level", "birth_rate", "per_capita_income", "community_area_name", "crowded_housing", "infant_mortality_rate", "assault_homicide", "unemployment"]]
        info_js = info.to_json()
        return info_js
