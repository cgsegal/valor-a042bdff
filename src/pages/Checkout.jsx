import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Trash2, Calendar, Clock, Car, CreditCard, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Initialize Stripe
// To use Stripe, create a .env file in your project root with:
// VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
// Get your keys from: https://dashboard.stripe.com/apikeys
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_YOUR_STRIPE_PUBLISHABLE_KEY_HERE');

const CheckoutForm = () => {
  const { items, removeFromCart, getTotalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      // Step 1: Create payment intent on your backend
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: getTotalPrice(),
          currency: 'usd',
          metadata: {
            bookings: JSON.stringify(items.map(item => ({
              vehicleId: item.vehicle.id,
              vehicleName: item.vehicle.name,
              startDate: item.rentalDetails.startDate,
              duration: item.rentalDetails.duration,
              rentalType: item.rentalDetails.rentalType,
              totalPrice: item.totalPrice
            }))),
            customerInfo: JSON.stringify(customerInfo)
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.json();

      // Step 2: Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${customerInfo.firstName} ${customerInfo.lastName}`,
            email: customerInfo.email,
            phone: customerInfo.phone,
            address: {
              line1: customerInfo.address,
              city: customerInfo.city,
              state: customerInfo.state,
              postal_code: customerInfo.zipCode,
              country: 'US'
            }
          }
        }
      });

      if (error) {
        console.error('Payment failed:', error);
        alert(`Payment failed: ${error.message}`);
      } else if (paymentIntent.status === 'succeeded') {
        // Payment successful
        clearCart();
        alert('Payment successful! Your booking has been confirmed.');
        navigate('/');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    }

    setLoading(false);
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#ffffff',
        backgroundColor: 'transparent',
        '::placeholder': {
          color: '#9ca3af',
        },
      },
    },
    hidePostalCode: true,
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <Car className="w-16 h-16 mx-auto mb-4 text-white/50" />
          <h1 className="text-3xl font-display mb-4">Your cart is empty</h1>
          <p className="text-white/70 mb-6">Add some vehicles to your cart to proceed with checkout.</p>
          <Button onClick={() => navigate('/')} className="bg-white text-black hover:bg-white/90">
            Browse Fleet
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-display mb-4">Checkout</h1>
          <p className="text-white/70 text-lg">Complete your luxury vehicle booking</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Car className="w-5 h-5" />
                  Your Bookings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 rounded-lg p-4 border border-white/10"
                  >
                    <div className="flex gap-4">
                      <img
                        src={item.vehicle.image}
                        alt={item.vehicle.name}
                        className="w-24 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg">{item.vehicle.name}</h3>
                        <p className="text-white/60 text-sm">{item.vehicle.brand} • {item.vehicle.year}</p>
                        
                        <div className="flex items-center gap-4 mt-2 text-sm text-white/70">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {item.rentalDetails.startDate}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {item.rentalDetails.startTime}
                          </div>
                        </div>
                        
                        <div className="mt-2">
                          <p className="text-white/80">
                            {item.rentalDetails.duration} {item.rentalDetails.rentalType === 'hourly' ? 'hours' : 'days'} 
                            @ ${item.rentalDetails.rentalType === 'hourly' ? item.vehicle.marketHourlyPrice : item.vehicle.marketDailyPrice}
                            /{item.rentalDetails.rentalType === 'hourly' ? 'hr' : 'day'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-display text-white">
                          ${item.totalPrice.toLocaleString()}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-400/10 mt-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Customer Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-white/80">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={customerInfo.firstName}
                      onChange={handleInputChange}
                      className="bg-black/50 border-white/20 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-white/80">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={customerInfo.lastName}
                      onChange={handleInputChange}
                      className="bg-black/50 border-white/20 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white/80">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      className="bg-black/50 border-white/20 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-white/80">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      className="bg-black/50 border-white/20 text-white"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address" className="text-white/80">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={customerInfo.address}
                      onChange={handleInputChange}
                      className="bg-black/50 border-white/20 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="city" className="text-white/80">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={customerInfo.city}
                      onChange={handleInputChange}
                      className="bg-black/50 border-white/20 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-white/80">State</Label>
                    <Input
                      id="state"
                      name="state"
                      value={customerInfo.state}
                      onChange={handleInputChange}
                      className="bg-black/50 border-white/20 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode" className="text-white/80">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={customerInfo.zipCode}
                      onChange={handleInputChange}
                      className="bg-black/50 border-white/20 text-white"
                      required
                    />
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-black/50 border border-white/20 rounded-lg p-4 mb-4">
                  <CardElement options={cardElementOptions} />
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <Lock className="w-4 h-4" />
                  Your payment information is secure and encrypted
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-white/5 border-white/10 sticky top-6">
              <CardHeader>
                <CardTitle className="text-white">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-white/80">{item.vehicle.name}</span>
                    <span className="text-white">${item.totalPrice.toLocaleString()}</span>
                  </div>
                ))}
                
                <Separator className="bg-white/20" />
                
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-white">Total</span>
                  <span className="text-white">${getTotalPrice().toLocaleString()}</span>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={loading || !stripe}
                  className="w-full bg-white text-black hover:bg-white/90 disabled:opacity-50"
                  size="lg"
                >
                  {loading ? 'Processing...' : `Complete Booking - $${getTotalPrice().toLocaleString()}`}
                </Button>

                <p className="text-xs text-white/60 text-center">
                  By completing this booking, you agree to our terms of service and privacy policy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout; 