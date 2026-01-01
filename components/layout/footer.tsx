import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-[#2E2E2E] dark:bg-[#1A1A1A]">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-[#EEEEEE]">
              <span>Adhyayan</span>
            </Link>
            <p className="text-sm text-[#EEEEEE]/80">
              Collaborative study materials platform for college students. Share, learn, and grow together.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm text-[#EEEEEE]">Quick links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/departments" className="text-[#EEEEEE]/80 hover:text-[#EEEEEE] transition-colors">
                  Browse Departments
                </Link>
              </li>
              <li>
                <Link href="/upload" className="text-[#EEEEEE]/80 hover:text-[#EEEEEE] transition-colors">
                  Upload content
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="text-[#EEEEEE]/80 hover:text-[#EEEEEE] transition-colors">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/discussion" className="text-[#EEEEEE]/80 hover:text-[#EEEEEE] transition-colors">
                  Discussion form
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm text-[#EEEEEE]">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-[#EEEEEE]/80 hover:text-[#EEEEEE] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="text-[#EEEEEE]/80 hover:text-[#EEEEEE] transition-colors">
                  Upload Guidelines
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-[#EEEEEE]/80 hover:text-[#EEEEEE] transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#EEEEEE]/80 hover:text-[#EEEEEE] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm text-[#EEEEEE]">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-[#EEEEEE]/80 hover:text-[#EEEEEE] transition-colors">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[#EEEEEE]/80 hover:text-[#EEEEEE] transition-colors">
                  Terms of services
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-[#EEEEEE]/20" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#EEEEEE]/80">
          <p>© {currentYear} Adhyayan. All rights reserved.</p>
          <p>Built with ❤️ by Pankaj Chouksey</p>
        </div>
      </div>
    </footer>
  );
}
