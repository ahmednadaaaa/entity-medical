from django.urls import path
from . import views

app_name = 'orders'

urlpatterns = [
    path('cart/', views.cart_view, name='cart'),
    path('checkout/', views.checkout, name='checkout'),
    path('orders/', views.order_list, name='list'),
    path('orders/<str:order_number>/', views.order_detail, name='detail'),

    # Cart operations
    path('add-to-cart/', views.add_to_cart, name='add_to_cart'),
    path('update-quantity/', views.update_cart_quantity, name='update_quantity'),
    path('remove-from-cart/', views.remove_from_cart, name='remove_from_cart'),
    path('clear-cart/', views.clear_cart, name='clear_cart'),
]