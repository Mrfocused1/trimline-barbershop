import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import { PageTransition } from '@/components/shared/PageTransition';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Header />
      <main className="flex-1 bg-black">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </div>
  );
}
