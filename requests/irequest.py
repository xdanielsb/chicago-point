import abc

class IRequest:
    __metaclass__  = abc.ABCMeta

    @abc.abstractmethod
    def get_data(self):
        """Method that should get the data."""
