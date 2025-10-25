import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockBarber } from '@/data/barber';

export default function PoliciesPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Policies
          </h1>
          <p className="mt-4 text-lg text-black max-w-2xl mx-auto">
            Our commitment to transparency and excellent service
          </p>
        </div>
      </section>

      {/* Policies */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-6">
            {/* Booking Policy */}
            <Card>
              <CardHeader>
                <CardTitle>Booking & Appointments</CardTitle>
                <CardDescription>How to schedule and manage your appointments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>
                  • Online booking is available up to {mockBarber.settings.advanceBookingDays} days in advance
                </p>
                <p>
                  • A {mockBarber.settings.depositPercentage}% deposit is required to secure your appointment
                </p>
                <p>
                  • Walk-ins are welcome subject to availability
                </p>
                <p>
                  • Please arrive 5 minutes early for your appointment
                </p>
              </CardContent>
            </Card>

            {/* Cancellation Policy */}
            <Card>
              <CardHeader>
                <CardTitle>Cancellation & Rescheduling</CardTitle>
                <CardDescription>Important information about changing your appointment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>
                  • Cancellations must be made at least {mockBarber.settings.cancellationHours} hours in advance
                </p>
                <p>
                  • Deposits are fully refundable with {mockBarber.settings.cancellationHours}+ hours notice
                </p>
                <p>
                  • Late cancellations (less than {mockBarber.settings.cancellationHours} hours) will forfeit the deposit
                </p>
                <p>
                  • No-shows will forfeit the full deposit
                </p>
                <p>
                  • Rescheduling is free with {mockBarber.settings.cancellationHours}+ hours notice
                </p>
              </CardContent>
            </Card>

            {/* Payment Policy */}
            <Card>
              <CardHeader>
                <CardTitle>Payment</CardTitle>
                <CardDescription>Accepted payment methods and pricing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>
                  • We accept cash, credit cards, and digital payments
                </p>
                <p>
                  • Online deposits are processed securely through Stripe
                </p>
                <p>
                  • Prices are subject to change; rates locked in at time of booking
                </p>
                <p>
                  • Gratuity is appreciated but never expected
                </p>
              </CardContent>
            </Card>

            {/* Health & Safety */}
            <Card>
              <CardHeader>
                <CardTitle>Health & Safety</CardTitle>
                <CardDescription>Our commitment to your wellbeing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>
                  • All tools are sanitized between clients using professional-grade disinfectants
                </p>
                <p>
                  • Single-use items (towels, capes) are never reused
                </p>
                <p>
                  • If you're feeling unwell, please reschedule at no charge
                </p>
                <p>
                  • We maintain a clean, professional environment at all times
                </p>
              </CardContent>
            </Card>

            {/* Privacy Policy */}
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Data</CardTitle>
                <CardDescription>How we handle your information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>
                  • Your personal information is stored securely and never shared with third parties
                </p>
                <p>
                  • We use your contact information only for appointment reminders and service updates
                </p>
                <p>
                  • You can request deletion of your data at any time by contacting us
                </p>
                <p>
                  • Payment information is processed securely through Stripe and never stored on our servers
                </p>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Questions?</CardTitle>
                <CardDescription>Get in touch with us</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>
                  If you have questions about our policies, please contact us:
                </p>
                <p>
                  • Phone: {mockBarber.phone}
                </p>
                <p>
                  • Email: {mockBarber.email}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
