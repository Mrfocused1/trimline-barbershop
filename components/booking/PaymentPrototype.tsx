'use client';

import { useState } from 'react';
import { AlertTriangle, CreditCard } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';

interface PaymentPrototypeProps {
  totalAmount: number;
  depositAmount: number;
  onComplete: () => void;
}

export function PaymentPrototype({ totalAmount, depositAmount, onComplete }: PaymentPrototypeProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onComplete();
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Secure Deposit Payment</h2>
        <p className="text-black">Complete your booking with a secure deposit</p>
      </div>

      {/* Prototype Warning */}
      <Card className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-900 dark:text-yellow-500">
            <AlertTriangle className="h-5 w-5" />
            Prototype Mode - Test Only
          </CardTitle>
          <CardDescription className="text-yellow-800 dark:text-yellow-600">
            This is a frontend prototype. No real payment processing will occur.
            In production, this would integrate with Stripe payment elements.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Payment Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-black">Service Total</span>
            <span className="font-medium">{formatPrice(totalAmount)}</span>
          </div>
          <div className="flex justify-between border-t pt-4">
            <div>
              <p className="font-semibold">Deposit Due Today</p>
              <p className="text-xs text-black">
                Remaining balance due at appointment
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{formatPrice(depositAmount)}</p>
              <Badge variant="secondary" className="mt-1">
                25% deposit
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Simulated Payment Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Card Information
          </CardTitle>
          <CardDescription>
            In production, this would show Stripe Payment Elements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 text-center">
            <CreditCard className="mx-auto h-12 w-12 text-black" />
            <p className="mt-4 text-sm text-black">
              Stripe Payment Element would appear here
            </p>
            <p className="mt-2 text-xs text-black">
              Test card: 4242 4242 4242 4242
            </p>
          </div>

          <div className="space-y-2 rounded-lg bg-muted/50 p-4 text-sm">
            <p className="font-semibold">Security Features:</p>
            <ul className="ml-4 list-disc space-y-1 text-black">
              <li>256-bit SSL encryption</li>
              <li>PCI DSS Level 1 compliant</li>
              <li>No card details stored on our servers</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button
        onClick={handlePayment}
        disabled={isProcessing}
        className="w-full"
        size="lg"
      >
        {isProcessing ? 'Processing...' : `Pay ${formatPrice(depositAmount)} (Prototype)`}
      </Button>

      <p className="text-center text-xs text-black">
        By completing this booking, you agree to our cancellation and refund policies
      </p>
    </div>
  );
}
