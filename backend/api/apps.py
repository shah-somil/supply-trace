import os
import csv
from django.conf import settings
from django.apps import AppConfig
from django.db.utils import OperationalError

class ApiConfig(AppConfig):
    name = 'api'

    def ready(self):
        from .models import Company, Location
        # Pass the models as arguments to load_csv_data
        self.load_csv_data(Company, os.path.join(settings.BASE_DIR, 'data/companies.csv'))
        self.load_csv_data(Location, os.path.join(settings.BASE_DIR, 'data/locations.csv'))

    def load_csv_data(self, model, path):
        try:
            if model.objects.exists():
                return
            with open(path, mode='r') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if model.__name__ == 'Company':
                        model.objects.get_or_create(
                            company_id=row['company_id'],
                            name=row['name'],
                            address=row['address'],
                            latitude=row['latitude'],
                            longitude=row['longitude']
                        )
                    elif model.__name__ == 'Location':
                        from .models import Company
                        company = Company.objects.get(company_id=row['company_id'])
                        model.objects.get_or_create(
                            location_id=row['location_id'],
                            company=company,
                            name=row['name'],
                            address=row['address'],
                            latitude=row['latitude'],
                            longitude=row['longitude']
                        )
        except OperationalError:
            pass
