'use client';

import { Check } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    name: 'Starter',
    price: '$0',
    period: 'Forever',
    description: 'Perfect for individuals and small projects.',
    features: [
      '3 projects',
      'Up to 5 team members',
      '5GB storage',
      'Basic analytics',
      'Email support',
    ],
  },
  {
    name: 'Pro',
    price: '$29',
    period: 'per month',
    description: 'For growing teams that need more power.',
    features: [
      'Unlimited projects',
      'Up to 50 team members',
      '100GB storage',
      'Advanced analytics',
      'Priority support',
      'Custom integrations',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large organizations with custom needs.',
    features: [
      'Everything in Pro',
      'Unlimited team members',
      'Unlimited storage',
      'Dedicated account manager',
      'SLA guarantee',
      'Custom contracts',
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 max-w-7xl mx-auto border-b border-white/10">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-wider font-medium text-neutral-400 mb-6">
          Pricing
        </div>
        <h2 className="text-4xl md:text-5xl font-medium text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500 tracking-tight mb-4">
          Simple, transparent pricing.
        </h2>
        <p className="text-neutral-500 max-w-2xl mx-auto">
          Choose the plan that's right for you. All plans include a 14-day free trial.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`p-8 rounded-xl border transition-all ${
              plan.popular
                ? 'border-white/30 bg-white/10 scale-105'
                : 'border-white/10 bg-white/5 hover:bg-white/10'
            }`}
          >
            {plan.popular && (
              <div className="inline-flex items-center px-2 py-1 rounded-full bg-white text-black text-[10px] font-medium mb-4">
                MOST POPULAR
              </div>
            )}
            
            <h3 className="text-xl font-medium text-white mb-2">{plan.name}</h3>
            <div className="mb-2">
              <span className="text-4xl font-medium text-white">{plan.price}</span>
              {plan.period && <span className="text-neutral-500 text-sm ml-2">{plan.period}</span>}
            </div>
            <p className="text-sm text-neutral-400 mb-6">{plan.description}</p>
            
            <Link
              href="/auth"
              className={`w-full h-10 rounded-full text-sm font-medium flex items-center justify-center transition-all mb-6 ${
                plan.popular
                  ? 'bg-white text-black hover:bg-neutral-200'
                  : 'bg-transparent text-white border border-white/20 hover:bg-white/10'
              }`}
            >
              Get Started
            </Link>

            <ul className="space-y-3">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-neutral-300">
                  <Check size={16} className="text-white mt-0.5 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}