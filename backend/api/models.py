from django.db import models

class Company(models.Model):
    company_id = models.CharField(max_length=100, primary_key=True)
    name = models.CharField(max_length=255)
    address = models.TextField()
    latitude = models.FloatField()
    longitude = models.FloatField()

class Location(models.Model):
    location_id = models.CharField(max_length=100, primary_key=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    address = models.TextField()
    latitude = models.FloatField()
    longitude = models.FloatField()
