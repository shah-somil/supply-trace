from django.urls import path
from . import views
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="SUPPLY TRACE API DOCUMENTATION",
        default_version='v1',
        description="API decription of Companies and Locations",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="me@somil.in"),
        license=openapi.License(name="Open License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('companies/', views.CompanyList.as_view(), name='company-list'),
    path('companies/<int:pk>/', views.CompanyDetail.as_view(), name='company-detail'),
    path('companies/<int:company_id>/locations/', views.CompanyLocations.as_view(), name='company-locations'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0),name='schema-swagger-ui'),
]
