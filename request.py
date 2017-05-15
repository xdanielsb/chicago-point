from requests.houses import RequestHouses
from requests.health import RequestHealth
from requests.hospitals import RequestHospital
from requests.libraries import RequestLibrary
from requests.parks import RequestPark
from requests.police import RequestPolice
from requests.cost import RequestCost
from requests.weather import RequestWeather

from operator import itemgetter



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

    """
        Get the 5 nearest locations to the center, defined in the
        requeriments
    """
    def get_nearest_locations(self, n=5):
        return self.rhouses.get_nearest_locations()

    """
        Get most cheapest comunities
    """
    def get_cheapest_comunities(self,n =5):
        return self.rcost.get_cheapest_comunities()

    """
        Get the weather based on ZIP code
    """
    def get_weather(self,locationid="60007",startdate="2016-05-01", enddate="2016-05-31", datasetid="GSOM"):
        return self.rweather.get_weather()

    """
        Get information police stationn
    """
    def get_info_police_stations(self):
        return self.rpolice.get_info_police_stations()

    """
        Get the table of cost by neighborhood.
    """
    def get_cost_table_neighborhood(self):
        return self.rcost.get_cost_table_neighborhood()

    """
        Get number of houses by comunity.
    """
    def get_number_by_comunity(self):
        return self.rhouses.get_number_by_comunity()

    """
        Get the weather another api
    """
    def get_weather2(self, zipc="94040"):
        return self.rweather.get_weather2(zipc)

    """
        Get important info libraries
    """
    def get_locations_libraries(self):
        return self.rlibrary.get_locations_libraries()

    """
        Get the locations of the parks
    """
    def get_location_parks(self):
        return self.rpark.get_location_parks()

    """
        Get locations houses.
    """
    def get_locations_houses(self):
        return self.rhouses.get_locations_houses()

    """
        Data health centers in chicago
    """
    def get_locations_health_center(self):
        return self.rhospital.get_locations_health_center()

    """
        Get the information of the comunity
    """
    def get_information_comunity(self):
        return self.rhealth.get_information_comunity()

    """
        Get location police stations
    """
    def get_locations_police_stations(self):
        return self.rpolice.get_locations_police_stations()
