from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from .models import Cart, CartItem, Order, OrderItem
from products.models import Product
import json


def get_or_create_cart(request):
    """Get or create cart for user or session"""
    if request.user.is_authenticated:
        cart, created = Cart.objects.get_or_create(user=request.user)
    else:
        session_key = request.session.session_key
        if not session_key:
            request.session.create()
            session_key = request.session.session_key
        cart, created = Cart.objects.get_or_create(session_key=session_key)
    return cart


@require_POST
def add_to_cart(request):
    """Add product to cart via AJAX"""
    try:
        data = json.loads(request.body)
        product_id = data.get('product_id')
        quantity = int(data.get('quantity', 1))

        product = get_object_or_404(Product, id=product_id, is_active=True)
        cart = get_or_create_cart(request)

        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            defaults={'quantity': quantity}
        )

        if not created:
            cart_item.quantity += quantity
            cart_item.save()

        return JsonResponse({
            'success': True,
            'message': 'تم إضافة المنتج للسلة',
            'cart_count': cart.total_items,
            'cart_total': float(cart.total_price)
        })
    except Exception as e:
        return JsonResponse({'success': False, 'message': str(e)}, status=400)


@require_POST
def remove_from_cart(request):
    """Remove item from cart"""
    try:
        data = json.loads(request.body)
        item_id = data.get('item_id')

        cart = get_or_create_cart(request)
        CartItem.objects.filter(id=item_id, cart=cart).delete()

        return JsonResponse({
            'success': True,
            'message': 'تم حذف المنتج',
            'cart_count': cart.total_items,
            'cart_total': float(cart.total_price)
        })
    except Exception as e:
        return JsonResponse({'success': False, 'message': str(e)}, status=400)


@require_POST
def update_cart_quantity(request):
    """Update cart item quantity"""
    try:
        data = json.loads(request.body)
        item_id = data.get('item_id')
        quantity = int(data.get('quantity'))

        cart = get_or_create_cart(request)
        cart_item = get_object_or_404(CartItem, id=item_id, cart=cart)

        if quantity > 0:
            cart_item.quantity = quantity
            cart_item.save()
        else:
            cart_item.delete()

        return JsonResponse({
            'success': True,
            'item_subtotal': float(cart_item.subtotal) if quantity > 0 else 0,
            'cart_total': float(cart.total_price)
        })
    except Exception as e:
        return JsonResponse({'success': False, 'message': str(e)}, status=400)


@require_POST
def clear_cart(request):
    """Clear all items from the cart"""
    try:
        cart = get_or_create_cart(request)
        cart.items.all().delete()
        return JsonResponse({
            'success': True,
            'message': 'تم تفريغ السلة بنجاح',
            'cart_count': 0,
            'cart_total': 0.0
        })
    except Exception as e:
        return JsonResponse({'success': False, 'message': str(e)}, status=400)


def cart_view(request):
    """Display cart page"""
    cart = get_or_create_cart(request)
    context = {'cart': cart}
    return render(request, 'orders/cart.html', context)


@login_required
def checkout(request):
    """Checkout and create order"""
    cart = get_or_create_cart(request)

    if not cart.items.exists():
        messages.warning(request, 'السلة فارغة')
        return redirect('products:list')

    if request.method == 'POST':
        # Create order
        order = Order.objects.create(
            user=request.user,
            full_name=request.POST.get('full_name', request.user.full_name),
            phone=request.POST.get('phone', request.user.phone),
            email=request.POST.get('email', request.user.email or ''),
            address=request.POST.get('address', ''),
            notes=request.POST.get('notes', ''),
            total_amount=cart.total_price
        )

        # Create order items
        for cart_item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=cart_item.product,
                product_name=cart_item.product.name,
                quantity=cart_item.quantity,
                price=cart_item.product.final_price
            )

        # Generate WhatsApp link
        whatsapp_link = order.generate_whatsapp_link()

        # Clear cart after checkout
        cart.items.all().delete()

        messages.success(request, 'تم إنشاء الطلب بنجاح')

        # Redirect to WhatsApp
        return redirect(whatsapp_link)

    context = {'cart': cart}
    return render(request, 'orders/checkout.html', context)


@login_required
def order_list(request):
    """Display user's orders"""
    orders = Order.objects.filter(user=request.user)
    context = {'orders': orders}
    return render(request, 'orders/order_list.html', context)


@login_required
def order_detail(request, order_number):
    """Display order details"""
    order = get_object_or_404(Order, order_number=order_number, user=request.user)
    context = {'order': order}
    return render(request, 'orders/order_detail.html', context)