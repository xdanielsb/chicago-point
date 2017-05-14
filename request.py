from requests.houses import RequestHouses
from request.health import RequestHealth

from urllib2 import urlopen, Request
from operator import itemgetter

import json
import urllib2
import random
import pandas as pd


class Request:

    def __init__(self):
        #Create objects
        rhouses = RequestHouses()
        rhealth = RequestHealth()
        rpolice = RequestPolice()
        rcost = RequestCost()
        rpark = RequestPark()
        rlibrary = RequestLibrary()
        rhospital = RequestHospital()

        self.houses_data = rhouses.get_data()
        self.health_data = rhealth.get_data()
        self.police_stations = rpolice.get_data()
        self.parks = rpark.get_data()
        self.hospitals = rhospital.get_data()
        self.libraries = rlibrary.get_data()
        self.cost_neighborhood = rcost.get_data()



    """
        Get the 5 nearest locations to the center, defined in the
        requeriments
    """
    def get_nearest_locations(self, n=5):
        locs = self.houses_data[["latitude", "longitude", "address", "community_area_number", "community_area", "phone_number", "property_name", "property_type", "zip_code", "distance"]]
        nearest =  locs.nsmallest(n, 'distance')
        nearest.reset_index() #erase
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
        #print(dataset)
        return  dataset

    """
        Get most cheapest comunities
    """
    def get_cheapest_comunities(self,n = 5):
        info = self.cost_neighborhood[["community_area", "cost1bedroom", "cost2bedrooms"]]
        cheapest =  info.nsmallest(n, 'cost1bedroom')
        info_js = cheapest.to_json()
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
        Get important info libraries
    """
    def get_locations_libraries(self):
        locs = self.libraries[["location", "address", "hours_of_operation", "teacher_in_the_library", "website", "name_"]]
        locs_js = locs.to_json()
        return locs_js


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
