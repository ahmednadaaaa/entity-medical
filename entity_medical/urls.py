from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from products import views as product_views  
from django.views.generic import TemplateView
from django.views.generic import RedirectView

urlpatterns = [
    path('admin/', admin.site.urls),

    path('', product_views.home, name='home'),

    path('products/', include('products.urls')),
    path('orders/', include('orders.urls')),
    path('users/', include('users.urls')),
    path('offers/', include('offers.urls')),
    path('contact/', include('contact.urls')),
    path('', RedirectView.as_view(url='/', permanent=False), name='index'),
    path('about/', TemplateView.as_view(template_name='about.html'), name='about'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

admin.site.site_header = "Entity Medical Admin"
admin.site.site_title = "Entity Medical"
admin.site.index_title = "Welcome to Entity Medical Administration"