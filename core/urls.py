from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path

from apps.checker.views import home, url, urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('urls/<int:urlId>/', url, name="url"),
    path('urls/', urls, name="urls"),
    path('', home),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
