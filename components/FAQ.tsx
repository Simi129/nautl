'use client';

import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'What is Nexus?',
    answer: 'Nexus is a modern SaaS platform designed to help teams collaborate, manage projects, and ship products faster. It combines project management, real-time collaboration, and analytics in one unified workspace.',
  },
  {
    question: 'How does billing work?',
    answer: 'We offer monthly and annual billing options. You can upgrade, downgrade, or cancel your subscription at any time. All paid plans come with a 14-day free trial, no credit card required.',
  },
  {
    question: 'Can I change my plan later?',
    answer: 'Absolutely! You can upgrade or downgrade your plan at any time from your account settings. Changes take effect immediately, and we will prorate any differences.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes! All paid plans include a 14-day free trial. You can explore all features without entering payment information. After the trial, you can choose to continue with a paid plan or stay on the free tier.',
  },
  {
    question: 'What kind of support do you offer?',
    answer: 'Free plans include email support with responses within 48 hours. Pro plans get priority support with 24-hour response times. Enterprise customers receive dedicated account management and 24/7 support.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 px-6 max-w-4xl mx-auto border-b border-white/10">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-wider font-medium text-neutral-400 mb-6">
          FAQ
        </div>
        <h2 className="text-4xl md:text-5xl font-medium text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500 tracking-tight mb-4">
          Frequently asked questions.
        </h2>
        <p className="text-neutral-500">
          Have a different question? Contact our support team.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group border border-white/10 rounded-lg bg-white/5 overflow-hidden"
            open={openIndex === index}
          >
            <summary
              className="flex items-center justify-between p-5 cursor-pointer hover:bg-white/10 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                toggleFaq(index);
              }}
            >
              <span className="font-medium text-white">{faq.question}</span>
              {openIndex === index ? (
                <Minus size={18} className="text-neutral-400 transition-transform" />
              ) : (
                <Plus size={18} className="text-neutral-400 transition-transform" />
              )}
            </summary>
            <div className="px-5 pb-5 text-sm text-neutral-400 leading-relaxed">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}