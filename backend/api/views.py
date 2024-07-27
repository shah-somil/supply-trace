from django.shortcuts import render
from rest_framework import generics
from .models import *
from .serializer import *

class CompanyList(generics.ListAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class CompanyDetail(generics.RetrieveAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class CompanyLocations(generics.ListAPIView):
    serializer_class = LocationSerializer

    def get_queryset(self):
        company_id = self.kwargs['company_id']
        return Location.objects.filter(company__company_id=company_id)
    