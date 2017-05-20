#!/usr/bin/env python

from distutils.core import setup

setup(
    name='ChicagoPoint',
    version='1.0',
    packages=['Flask','Pandas',],
    license='MIT',
    long_description=open('README.md').read(),
)
