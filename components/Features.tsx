'use client';

import { Zap, ShieldCheck, Users, LayoutDashboard, Code2, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Built with performance in mind. Deploy projects in seconds and experience minimal latency.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure by Default',
    description: 'Enterprise-grade encryption and security protocols to keep your data safe.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Work seamlessly with your team in real-time with built-in chat and comments.',
  },
  {
    icon: LayoutDashboard,
    title: 'Customizable Dashboards',
    description: 'Tailor your workspace to fit your workflow. Drag, drop, and organize.',
  },
  {
    icon: Code2,
    title: 'Developer Friendly',
    description: 'Powerful API, extensive documentation, and integrations with your favorite tools.',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Track progress, monitor performance, and gain insights with detailed analytics.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-6 max-w-7xl mx-auto border-b border-white/10">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-wider font-medium text-neutral-400 mb-6">
          Features
        </div>
        <h2 className="text-4xl md:text-5xl font-medium text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500 tracking-tight mb-4">
          Everything you need.
        </h2>
        <p className="text-neutral-500 max-w-2xl mx-auto">
          Nexus brings together all the tools you need to manage projects, collaborate with teams, and ship products faster than ever.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <div
              key={index}
              className="p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors">
                <IconComponent size={20} className="text-white" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}