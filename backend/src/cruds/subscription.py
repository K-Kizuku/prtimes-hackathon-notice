import uuid
from datetime import datetime, timedelta, timezone
from typing import Annotated

import stripe
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from src.models import SubscriptionCreate, SubscriptionPublic, User, UserCreate
from passlib.context import CryptContext
from sqlmodel import Session, select
from src.utils import hash_password


def create_stripe_customer(user: UserCreate) -> dict:
    res = stripe.Customer.create(
        name=user.name,
        email=user.email,
    )
    return res


def create_subscription(user: User, sub: SubscriptionCreate) -> SubscriptionPublic:
    res = stripe.checkout.Session.create(
        success_url=sub.success_url,
        customer=user.stripe_id,
        line_items=[{"price": "price_1QVy4tLKTvy6hReesFgAcX8J", "quantity": 1}],
        mode="subscription",
    )
    return res


def delete_subscription(user: User):

    subscriptions = stripe.Subscription.list(customer=user.stripe_id)

    for subscription in subscriptions.data:
        stripe.Subscription.cancel(subscription.id)


def is_subscription_paid(user: User) -> bool:
    # Fetch all subscriptions for the customer
    subscriptions = stripe.Subscription.list(customer=user.stripe_id)

    for subscription in subscriptions.data:
        # Check subscription status
        if subscription.status == "active":
            return True
    return False
