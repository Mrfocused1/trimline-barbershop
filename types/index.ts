// ============================================
// BARBER & SETTINGS
// ============================================

export interface Barber {
  id: string;
  name: string;
  email: string;
  bio: string;
  phone: string;
  profileImage: string;
  settings: BarberSettings;
}

export interface BarberSettings {
  bookingBufferMin: number;        // Minutes between appointments
  advanceBookingDays: number;      // How far ahead clients can book
  depositPercentage: number;       // Percentage required as deposit
  cancellationHours: number;       // Hours notice for cancellation
}

// ============================================
// SERVICES
// ============================================

export interface Service {
  id: string;
  name: string;
  description: string;
  durationMin: number;
  priceGBP: number;                // Store in pounds
  isActive: boolean;
  displayOrder: number;
}

// ============================================
// AVAILABILITY
// ============================================

export interface AvailabilityRule {
  id: string;
  dayOfWeek: number;               // 0 = Sunday, 6 = Saturday
  startTime: string;               // "09:00"
  endTime: string;                 // "17:00"
  isActive: boolean;
}

export interface BlackoutDate {
  id: string;
  date: string;                    // ISO date string
  reason?: string;
  allDay: boolean;
  startTime?: string;
  endTime?: string;
}

// ============================================
// CLIENTS & BOOKINGS
// ============================================

export interface Client {
  name: string;
  email: string;
  phone: string;
}

export type BookingStatus =
  | 'pending'      // Awaiting payment
  | 'confirmed'    // Payment completed
  | 'completed'    // Service done
  | 'cancelled'    // Cancelled
  | 'no-show';     // Client didn't show

export interface Booking {
  id: string;
  service: Service;
  client: Client;
  startTime: string;               // ISO datetime string
  endTime: string;
  status: BookingStatus;
  totalPrice: number;
  depositPaid: number;
  notes?: string;
  createdAt: string;
}

// ============================================
// REVIEWS
// ============================================

export interface Review {
  id: string;
  clientName: string;
  rating: number;                  // 1-5
  comment: string;
  date: string;                    // ISO date string
  isPublic: boolean;
  serviceId?: string;
}

// ============================================
// GALLERY
// ============================================

export interface GalleryImage {
  id: string;
  beforeUrl?: string;
  afterUrl: string;
  caption?: string;
  displayOrder: number;
  isPublic: boolean;
}

// ============================================
// BOOKING FLOW
// ============================================

export interface TimeSlot {
  startTime: string;               // ISO datetime string
  endTime: string;
  isAvailable: boolean;
}

export type BookingStep =
  | 'service'
  | 'time'
  | 'details'
  | 'payment'
  | 'confirmation';

export interface BookingFlowState {
  currentStep: BookingStep;
  selectedService?: Service;
  selectedTimeSlot?: TimeSlot;
  clientDetails?: Client;
  notes?: string;
  bookingId?: string;
}

// ============================================
// LIVE CHAIR AVAILABILITY
// ============================================

export type ChairStatus = 'available' | 'occupied' | 'reserved';

export interface Chair {
  id: string;
  number: number;                  // Chair number (1-10)
  status: ChairStatus;
  currentBooking?: {
    clientName: string;
    serviceName: string;
    estimatedWaitMinutes: number;  // How long until available
  };
}
