
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CalendarClock, Users, FileText, Clock, ShieldCheck } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary">Bank Time Saver</h1>
          <div className="flex gap-4">
            <Button variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button className="bg-primary hover:bg-secondary" asChild>
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Save Time with Smart Banking Appointments
            </h2>
            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
              Schedule bank appointments online and skip the long waiting times. The smart way to manage your banking needs.
            </p>
            <div className="mt-8 flex justify-center">
              <Button size="lg" className="bg-primary hover:bg-secondary" asChild>
                <Link to="/register">Get Started</Link>
              </Button>
            </div>
          </div>

          <div className="mt-20">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">Key Features</h3>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              <FeatureCard 
                icon={<CalendarClock className="h-10 w-10 text-primary" />}
                title="Easy Appointment Booking"
                description="Schedule appointments with the right bank personnel at your convenience."
              />
              <FeatureCard 
                icon={<Users className="h-10 w-10 text-primary" />}
                title="Employee Availability Tracking"
                description="See which bank employees are available and book time with the right specialist."
              />
              <FeatureCard 
                icon={<FileText className="h-10 w-10 text-primary" />}
                title="Document Checklist"
                description="Know exactly which documents to bring for your specific banking service."
              />
              <FeatureCard 
                icon={<Clock className="h-10 w-10 text-primary" />}
                title="Regular Notifications"
                description="Receive timely reminders and updates about your scheduled appointments."
              />
            </div>
          </div>

          <div className="mt-20 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="p-8 md:w-1/2">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Bank Time Saver?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <ShieldCheck className="h-6 w-6 text-primary mt-0.5 mr-2" />
                    <span>Secure and reliable appointment scheduling</span>
                  </li>
                  <li className="flex items-start">
                    <ShieldCheck className="h-6 w-6 text-primary mt-0.5 mr-2" />
                    <span>Match with the right banking professional for your needs</span>
                  </li>
                  <li className="flex items-start">
                    <ShieldCheck className="h-6 w-6 text-primary mt-0.5 mr-2" />
                    <span>Save time by avoiding unnecessary waiting at the bank</span>
                  </li>
                  <li className="flex items-start">
                    <ShieldCheck className="h-6 w-6 text-primary mt-0.5 mr-2" />
                    <span>Be prepared with all required documents before your visit</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Button className="bg-primary hover:bg-secondary" asChild>
                    <Link to="/register">Sign Up Now</Link>
                  </Button>
                </div>
              </div>
              <div className="bg-gradient-to-r from-primary to-accent md:w-1/2 flex items-center justify-center p-12">
                <div className="text-white text-center">
                  <h3 className="text-2xl font-bold mb-4">Ready to save time?</h3>
                  <p className="mb-6">Join thousands of customers who have simplified their banking experience.</p>
                  <Button variant="outline" className="text-white border-white hover:bg-white hover:text-primary" asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white mt-20">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              <Link to="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
            </div>
            <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
              &copy; 2025 Bank Time Saver. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Index;
