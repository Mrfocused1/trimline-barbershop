'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ServiceSelector } from '@/components/booking/ServiceSelector';
import { TimeSlotPicker } from '@/components/booking/TimeSlotPicker';
import { ClientDetailsForm } from '@/components/booking/ClientDetailsForm';
import { PaymentPrototype } from '@/components/booking/PaymentPrototype';
import { BookingConfirmation } from '@/components/booking/BookingConfirmation';
import { LoadingScreen } from '@/components/shared/LoadingScreen';
import { useServiceStore } from '@/store/serviceStore';
import { useBookingStore } from '@/store/bookingStore';
import { useBarberStore } from '@/store/barberStore';
import { generateId } from '@/lib/utils';
import { Service, TimeSlot, Client, BookingStep } from '@/types';

const STEPS: { key: BookingStep; label: string }[] = [
  { key: 'service', label: 'Service' },
  { key: 'time', label: 'Date & Time' },
  { key: 'details', label: 'Your Info' },
  { key: 'payment', label: 'Payment' },
  { key: 'confirmation', label: 'Confirmation' },
];

function BookingPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getActiveServices } = useServiceStore();
  const { bookingFlow, setBookingFlow, resetBookingFlow, addBooking, getBooking } = useBookingStore();
  const { barber } = useBarberStore();
  const [isLoading, setIsLoading] = useState(true);

  const services = getActiveServices();
  const currentStepIndex = STEPS.findIndex((s) => s.key === bookingFlow.currentStep);

  // Check if booking from live page (same-day only)
  const fromLive = searchParams.get('fromLive') === 'true';

  useEffect(() => {
    // Reset flow when component mounts
    if (bookingFlow.bookingId) {
      const existingBooking = getBooking(bookingFlow.bookingId);
      if (!existingBooking) {
        resetBookingFlow();
      }
    }

    // Show loading screen very briefly
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleServiceSelect = (service: Service) => {
    setBookingFlow({ selectedService: service });
  };

  const handleTimeSlotSelect = (slot: TimeSlot) => {
    setBookingFlow({ selectedTimeSlot: slot });
  };

  const handleClientDetails = (data: Client & { notes?: string }) => {
    const { notes, ...client } = data;
    setBookingFlow({ clientDetails: client, notes });
  };

  const handlePaymentComplete = () => {
    // Create the booking
    if (!bookingFlow.selectedService || !bookingFlow.selectedTimeSlot || !bookingFlow.clientDetails) {
      return;
    }

    const depositAmount = bookingFlow.selectedService.priceGBP * (barber.settings.depositPercentage / 100);

    const booking = {
      id: generateId('booking'),
      service: bookingFlow.selectedService,
      client: bookingFlow.clientDetails,
      startTime: bookingFlow.selectedTimeSlot.startTime,
      endTime: bookingFlow.selectedTimeSlot.endTime,
      status: 'confirmed' as const,
      totalPrice: bookingFlow.selectedService.priceGBP,
      depositPaid: depositAmount,
      notes: bookingFlow.notes,
      createdAt: new Date().toISOString(),
    };

    addBooking(booking);
    setBookingFlow({ bookingId: booking.id, currentStep: 'confirmation' });
  };

  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      const nextStep = STEPS[currentStepIndex + 1].key;
      setBookingFlow({ currentStep: nextStep });
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      const prevStep = STEPS[currentStepIndex - 1].key;
      setBookingFlow({ currentStep: prevStep });
    }
  };

  const canProceed = () => {
    switch (bookingFlow.currentStep) {
      case 'service':
        return !!bookingFlow.selectedService;
      case 'time':
        return !!bookingFlow.selectedTimeSlot;
      case 'details':
        return !!bookingFlow.clientDetails;
      case 'payment':
        return false; // Payment button handles this
      case 'confirmation':
        return false;
      default:
        return false;
    }
  };

  const currentBooking = bookingFlow.bookingId ? getBooking(bookingFlow.bookingId) : null;

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="min-h-screen bg-white py-12"
      >
        <div className="container mx-auto px-4 max-w-4xl">
        {/* Progress Steps */}
        {bookingFlow.currentStep !== 'confirmation' && (
          <Card className="mb-8 p-4 md:p-6">
            <div className="flex items-center justify-between overflow-x-auto">
              {STEPS.filter((s) => s.key !== 'confirmation').map((step, index) => {
                const isActive = step.key === bookingFlow.currentStep;
                const isCompleted = index < currentStepIndex;

                return (
                  <div key={step.key} className="flex items-center flex-shrink-0">
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full border-2 transition-colors text-sm md:text-base ${
                          isActive
                            ? 'border-primary bg-primary text-white'
                            : isCompleted
                            ? 'border-primary bg-primary text-white'
                            : 'border-muted-foreground/25 text-black'
                        }`}
                      >
                        {index + 1}
                      </div>
                      <span className={`mt-1 md:mt-2 text-[10px] md:text-xs font-medium whitespace-nowrap ${isActive ? 'text-foreground' : 'text-black'}`}>
                        {step.label}
                      </span>
                    </div>
                    {index < STEPS.length - 2 && (
                      <div className={`mx-1 md:mx-2 h-0.5 w-6 md:w-12 flex-shrink-0 ${isCompleted ? 'bg-primary' : 'bg-muted-foreground/25'}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {/* Main Content */}
        <Card className="p-6 md:p-8">
          {bookingFlow.currentStep === 'service' && (
            <ServiceSelector
              services={services}
              selectedService={bookingFlow.selectedService}
              onSelect={handleServiceSelect}
            />
          )}

          {bookingFlow.currentStep === 'time' && bookingFlow.selectedService && (
            <TimeSlotPicker
              service={bookingFlow.selectedService}
              selectedSlot={bookingFlow.selectedTimeSlot}
              onSelect={handleTimeSlotSelect}
              sameDayOnly={fromLive}
            />
          )}

          {bookingFlow.currentStep === 'details' && (
            <ClientDetailsForm
              initialData={bookingFlow.clientDetails ? { ...bookingFlow.clientDetails, notes: bookingFlow.notes } : undefined}
              onSubmit={handleClientDetails}
              notes={bookingFlow.notes}
            />
          )}

          {bookingFlow.currentStep === 'payment' && bookingFlow.selectedService && (
            <PaymentPrototype
              totalAmount={bookingFlow.selectedService.priceGBP}
              depositAmount={bookingFlow.selectedService.priceGBP * (barber.settings.depositPercentage / 100)}
              onComplete={handlePaymentComplete}
            />
          )}

          {bookingFlow.currentStep === 'confirmation' && currentBooking && (
            <BookingConfirmation booking={currentBooking} />
          )}
        </Card>

        {/* Navigation */}
        {bookingFlow.currentStep !== 'confirmation' && bookingFlow.currentStep !== 'payment' && (
          <div className="mt-6 flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStepIndex === 0}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            {bookingFlow.currentStep === 'details' ? (
              <Button
                onClick={() => {
                  document.getElementById('client-form-submit')?.click();
                  if (canProceed()) {
                    handleNext();
                  }
                }}
                disabled={!canProceed()}
              >
                Continue to Payment
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleNext} disabled={!canProceed()}>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        )}
        </div>
      </motion.div>
    </>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<LoadingScreen isLoading={true} />}>
      <BookingPageContent />
    </Suspense>
  );
}
