**Entity Medical** is a **fully functional e-commerce website** specialized in **selling medical supplies and equipment**, built using **Django (Python)**.

It’s designed for **Arabic-speaking users**, with:
- **Right-to-Left (RTL)** layout
- Clean, modern UI
- Responsive design (mobile, tablet, desktop)

The platform allows customers to:
- Browse medical products
- View special **offers & discounts**
- Add items to a **shopping cart**
- Search and filter products
- View detailed offer pages

---

## **Core Features**

| Feature | Description |
|--------|-------------|
| **Product Catalog** | Browse all medical products with images, prices, and brands |
| **Smart Offers System** | Create two types of offers: **Percentage (%)** or **Fixed Amount** |
| **Dynamic Discount Badges** | Red badges appear automatically on offers and products showing discount % |
| **Search & Filter** | Search by name + filter by category |
| **Shopping Cart** | Add/remove items, view total, persist across pages |
| **Offer Detail Page** | Full view of an offer: description, validity, all included products |
| **Admin Panel** | Full control over products, offers, categories, and users |
| **User Authentication** | Login, register, profile, logout |
| **Responsive Design** | Works perfectly on phones, tablets, and desktops |

---

## **How Offers Work**

### Two Offer Types:
1. **Percentage Discount**  
   → e.g., `25% off` on selected items  
2. **Fixed Amount Discount**  
   → e.g., `150 EGP off` on selected items  

> The system **automatically shows the correct badge**:
> - `%` for percentage
> - `EGP` for fixed amount

---

## **Technology Stack**

| Layer | Technology |
|------|------------|
| **Backend** | Django 4.x |
| **Frontend** | HTML, CSS, Vanilla JavaScript |
| **Database** | SQLite (production-ready with PostgreSQL) |
| **Templating** | Django Templates |
| **Static Files** | `django-static`, FontAwesome icons |
| **Deployment** | Ready for Heroku, Render, or any Python host |

---

## **Project Structure**

```
entity_medical/
├── manage.py
├── offers/                  # Offers app
│   ├── models.py            # Offer, OfferProduct
│   ├── views.py             # List & detail views
│   └── templates/offers/
├── products/                # Products app
├── users/                   # Authentication
├── static/
│   ├── css/style.css
│   ├── js/main.js           # Cart logic
│   └── images/logo.jpg
├── templates/
│   └── base.html            # Navbar, footer, cart modal
└── requirements.txt
```

---

## **Key Pages**

| URL | Purpose |
|-----|--------|
| `/` | Home page |
| `/products/` | All products |
| `/offers/` | List of active offers |
| `/offers/1/` | Detailed offer page |
| `/admin/` | Django admin panel |
| `/cart/` | View cart (via modal) |

---

## **How to Run the Project**

```bash
# Clone the project
git clone https://github.com/yourname/entity-medical.git
cd entity-medical

# Set up virtual environment
python -m venv venv
source venv/bin/activate    # Linux/Mac
# venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create admin user
python manage.py createsuperuser

# Start server
python manage.py runserver
```

Visit: [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## **Admin Guide (How to Add an Offer)**

1. Go to **/admin**
2. Login with superuser
3. Go to **Offers → Add Offer**
4. Fill:
   - Title, description
   - **Offer Type**: `percentage` or `fixed`
   - **Discount Value**: e.g., `30.00`
   - Start & end dates
   - Select products
   - Activate (`is_active = True`)
5. Save → Offer appears on frontend with **discount badge**

---

## **Future Improvements (Optional)**

- [ ] Add order checkout & payment (Stripe/Paymob)
- [ ] User order history
- [ ] Wishlist
- [ ] Email notifications
- [ ] Multi-language (English toggle)
- [ ] Docker support
- [ ] API with Django REST Framework

---

## **Contact & Support**

- **WhatsApp**: [+20 101 392 8114](https://wa.me/201013928114)
- **Email**: entityeg21@gmail.com
- **Telegram**: [t.me/EntityMedical](https://t.me/+201013928114)

---



I’ll build it for you in seconds.
