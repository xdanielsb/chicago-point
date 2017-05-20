#!/usr/bin/python
__author__ = "Daniel Fernando Santos Bustos"
__license__ = "MIT"
__version__ = "1.0"
__maintainer__ = "Daniel Santos"
__email__ = "dfsantosbu@unal.edu.co"
__status__ = "Production"

from requests.houses import RequestHouses
from requests.health import RequestHealth
from requests.hospitals import RequestHospital
from requests.libraries import RequestLibrary
from requests.parks import RequestPark
from requests.police import RequestPolice
from requests.cost import RequestCost
from requests.weather import RequestWeather


class Request:

    def __init__(self):
        #Create objects

        self.rhealth = RequestHealth()
        self.rpolice = RequestPolice()
        self.rcost = RequestCost()
        self.rpark = RequestPark()
        self.rlibrary = RequestLibrary()
        self.rhospital = RequestHospital()
        self.rweather = RequestWeather()
        self.rhouses = RequestHouses(self.rcost.get_instance_data())


    def get_nearest_locations(self, n=5):
        """
            Get the 4 nearest locations to the center, defined in the
            requeriments
        """
        return self.rhouses.get_nearest_locations()

    def get_cheapest_comunities(self,n =5):
        """
            Get most cheapest comunities
        """
        return self.rcost.get_cheapest_comunities()


    def get_info_police_stations(self):
        """
            Get information police stationn
        """
        return self.rpolice.get_info_police_stations()


    def get_cost_table_neighborhood(self):
        """
            Get the table of cost by neighborhood.
        """
        return self.rcost.get_cost_table_neighborhood()


    def get_number_by_comunity(self):
        """
            Get number of houses by comunity.
        """
        return self.rhouses.get_number_by_comunity()


    def get_weather2(self, zipc="94040"):
        """
            Get the weather another api
        """
        return self.rweather.get_weather2(zipc)


    def get_locations_libraries(self):
        """
            Get important info libraries
        """
        return self.rlibrary.get_locations_libraries()


    def get_location_parks(self):
        """
            Get the locations of the parks
        """
        return self.rpark.get_location_parks()


    def get_locations_houses(self):
        """
            Get locations houses.
        """
        return self.rhouses.get_locations_houses()


    def get_locations_health_center(self):
        """
            Data health centers in chicago
        """
        return self.rhospital.get_locations_health_center()


    def get_information_comunity(self):
        """
            Get the information of the comunity
        """
        return self.rhealth.get_information_comunity()


    def get_locations_police_stations(self):
        """
            Get location police stations
        """
        return self.rpolice.get_locations_police_stations()
