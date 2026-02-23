import Header from '../components/header';
import Footer from '../components/footer';
import ContactMe from '../components/contactme';

export default function ContactPage() {
  return (
    <main className="bg-white min-h-screen flex flex-col scroll-smooth">
      <Header />
      
      <section className="w-full pt-32 pb-12 bg-white flex justify-center items-center">
        <h1 className="text-4xl sm:text-6xl font-black text-gray-900 tracking-tighter text-center">
          Get in <span className="text-[#E46362]">Touch</span>
        </h1>
      </section>

      <div className="flex-grow flex flex-col bg-white relative">
        <div className="pt-0">
          <ContactMe />
        </div>
      </div>
      
      <Footer />
    </main>
  );
}