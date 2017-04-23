from urllib2 import urlopen, Request
import json
import urllib2
import random
from operator import itemgetter #fancy sorted
from math import radians, cos, sin, asin, sqrt


def haversine(lon1, lat1):
    lon2, lat2 = [-87.650495, 41.870732]
    """
    Calculate the great circle distance between two points
    on the earth (specified in decimal degrees)
    """
    # convert decimal degrees to radians
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
    # haversine formula
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a))
    km = 6367 * c
    km = round(km, 3)
    return km

#Library for Data Science
import pandas as pd

class Request:

    def __init__(self):
        #Take a moment load the information

        self.houses_data = self.get_houses()
        """
        self.health_data = self.get_health_statistics()
        self.police_stations = self.get_police_stations()
        self.cost_neighborhood = self.get_cost_neighborhood()
        self.parks = self.get_parks()
        self.hospitals = self.get_hospitals()
        self.libraries = self.get_libraries()
        """

    """
        Get the houses for rent
    """
    def get_houses(self):
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

    """
        Get the 5 nearest locations to the center, defined in the
        requeriments
    """
    def get_nearest_locations(self, n=5):
        locs = self.houses_data[["latitude", "longitude", "address", "community_area_number", "community_area", "phone_number", "property_name", "property_type", "zip_code", "distance"]]
        nearest =  locs.nsmallest(n, 'distance')
        nearest.reset_index()
        locs_js = nearest.to_json()

        aux = json.loads(locs_js)
        keys = ["address", "community_area_number", "community_area", "phone_number", "property_name", "property_type", "zip_code", "distance", "latitude", "longitude"]
        dataset = []
        cods = []
        for cod  in aux[keys[0]] :
            cods.append(cod)

        for cod in cods:
            row = []
            for a in keys:
                row.append(aux[a][cod])
            dataset.append(row)
        print(dataset)
        return  dataset


    """
        Get the hospitals in chicago
    """
    def get_hospitals(self):
        url = "https://data.cityofchicago.org/resource/cjg8-dbka.json"
        data  = urllib2.urlopen(url)

        #Tricky part
        result = json.load(data)
        #Data Frame
        data_frame =  pd.read_json(json.dumps(result))
        return data_frame

    """
        Get the libraries in chicago
    """
    def get_libraries(self):
        url = "https://data.cityofchicago.org/resource/x8fc-8rcq.json"
        data  = urllib2.urlopen(url)

        #Tricky part
        result = json.load(data)
        #Data Frame
        data_frame =  pd.read_json(json.dumps(result))
        return data_frame

    """
        Get important info libraries
    """
    def get_locations_libraries(self):
        locs = self.libraries[["location", "address", "hours_of_operation", "teacher_in_the_library", "website", "name_"]]
        locs_js = locs.to_json()
        return locs_js

    """
        Get information about the health in a community
    """
    def get_health_statistics(self):
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
        Get the weather based on ZIP code
    """
    def get_weather(self,locationid="60007",startdate="2016-05-01", enddate="2016-05-31", datasetid="GSOM"):
        url = "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?"+ \
          "datasetid={}"+ \
          "&locationid=ZIP:{}"+ \
          "&startdate={}"+\
          "&enddate={}"

        url = url.format(datasetid, locationid, startdate, enddate)
        token = "xtLJFvVAFGacWOPnHFCOJvAfwVhVPFmI"
        request = Request(url)
        request.add_header('token', token)
        response = json.load(urlopen(request))
        return response

    """
        This method helps me to get the parks in chicago city
    """
    def get_parks(self):
        url = "https://data.cityofchicago.org/resource/4xwe-2j3y.json"
        data = urllib2.urlopen(url)

        #Tricky part
        result = json.load(data)
        aux = json.dumps(result)
        aux2 = json.dumps(json.loads(aux))

        #Data Frame
        data_frame =  pd.read_json(aux2)
        data_frame = data_frame[["location", "park_name"]]
        data_frame = data_frame.dropna()
        #Many parks
        data_frame = data_frame.sample(frac=0.1)
        return data_frame

    """
        Get the locations of the parks
    """
    def get_location_parks(self):
        locs_js = self.parks.to_json()
        return locs_js


    """
        Get locations houses.
    """
    def get_locations_houses(self):
        locs = self.houses_data[["latitude", "longitude", "address", "community_area_number", "community_area", "phone_number", "property_name", "property_type", "zip_code", "distance"]]
        #Merge Datasets
        result = pd.merge(locs, self.cost_neighborhood, on="zip_code")
        #print (result)
        locs_js = result.to_json()
        return locs_js

    """
        Data health centers in chicago
    """
    def get_locations_health_center(self):
        locs = self.hospitals[["community_area", "facility", "location_1", "phone"]]
        locs_js = locs.to_json()
        return locs_js

    """
        Get number of houses by comunity.
    """
    def get_number_by_comunity(self):
        _counts = self.houses_data["community_area"].value_counts()
        #_counts_js = _counts.to_json()
        #print(_counts_js)
        values = _counts.values
        labels = _counts.index.values
        colors = []
        #Create random colors
        for i in values:
            r = random.randint(0,255)
            g = random.randint(0,255)
            b = random.randint(0,255)
            colors.append("rgb({},{},{})".format(r,g,b))


        return labels, values,colors

    """
        Get the information of the comunity
    """
    def get_information_comunity(self):
        info = self.health_data[["community_area", "cancer_all_sites", "below_poverty_level", "birth_rate", "per_capita_income", "community_area_name", "crowded_housing", "infant_mortality_rate", "assault_homicide", "unemployment"]]
        info_js = info.to_json()
        return info_js

    """
        Create data frame police stations
    """
    def get_police_stations(self):
        url ="https://data.cityofchicago.org/resource/gkur-vufi.json"
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
        Get location police stations
    """
    def get_locations_police_stations(self):
        locs = self.police_stations[["location"]]
        locs_js = locs.to_json()
        return locs_js

    """
        Get information police stationn
    """
    def get_info_police_stations(self):
        info = self.police_stations[["zip", "website", "address"]]
        info_js = info.to_json()
        aux = json.loads(info_js)
        keyse = "website"
        zipse = "zip"
        ad = "address"
        dataset = []
        for ar in aux[keyse]:
            url = aux[keyse][ar]["url"]
            _zip = aux[zipse][ar]
            _ad = aux[ad][ar]
            dataset.append([url, _zip, _ad])

        return dataset

    """
        Create data frame cost by neighborhood
    """
    def get_cost_neighborhood(self):
        url ="static/json/cost_rent.json"
        data = open(url, "r+")

        result = json.load(data)
        aux = json.dumps(result)
        aux2 = json.dumps(json.loads(aux))

        #Data Frame
        data_frame =  pd.read_json(aux2)
        data_frame = data_frame.dropna()
        return data_frame

    """
        Get the table of cost by neighborhood.
    """
    def get_cost_table_neighborhood(self):
        info = self.cost_neighborhood[["community_area", "cost1bedroom", "cost2bedrooms"]]
        info_js = info.to_json()
        aux = json.loads(info_js)

        keyse = "community_area"
        zipse = "cost1bedroom"
        ad = "cost2bedrooms"
        dataset = []
        for ar in aux[zipse]:
            url = aux[keyse][ar]
            _zip = aux[zipse][ar]
            _ad = aux[ad][ar]
            dataset.append([url, _zip, _ad])
        return dataset

    """
        Get the weather another api
    """
    def get_weather2(self, zipc="94040"):
        appid = "6aa0bdb1f586c5630d60b6237dfce45c"
        url = "http://api.openweathermap.org/data/2.5/weather?zip={},us&appid={}".format(zipc, appid)
        data = urllib2.urlopen(url)
        result = json.load(data)

        return result


"""
    Just a function for testing some functions in the code
"""
if(__name__ =="__main__"):
    a = Request()
    a. get_nearest_locations()
