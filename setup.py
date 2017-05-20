#!/usr/bin/env python

from setuptools import setup


setup(
    name='ChicagoPoint',
    version='1.0',
    packages=['project'],
    license='MIT',
    long_description=open('README.md').read(),
    include_package_data=True,
    zip_safe=False,
    install_requires=['Flask', 'Pandas'],
)
