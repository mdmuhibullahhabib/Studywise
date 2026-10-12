import { ContactCTASection } from "@/components/contact/ContactCTASection";
import { ContactFAQSection } from "@/components/contact/ContactFAQSection";
import { ContactFormSection } from "@/components/contact/ContactFormSection";
import { ContactHeroBanner } from "@/components/contact/ContactHeroBanner";
import { submitContactAction } from "@/features/contact/submit-contact-action";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
    <ContactHeroBanner/>
    <ContactFormSection/>
    <ContactFAQSection/>
    <ContactCTASection/>
    </>
  );
}
