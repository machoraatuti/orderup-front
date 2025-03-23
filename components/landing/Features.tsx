import React from 'react';

type FeatureProps = {
  icon: string;
  title: string;
  description: string;
};

const Feature = ({ icon, title, description }: FeatureProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center text-center sm:items-start sm:text-left">
      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: '⏱️',
      title: 'Save Time',
      description: 'No more waiting in queues. Your meal is ready when you arrive.',
    },
    {
      icon: '🍽️',
      title: 'Customize Orders',
      description: 'Easily customize your meal exactly as you want it.',
    },
    {
      icon: '💸',
      title: 'Easy Payment',
      description: 'Pay in advance and forget about waiting for the bill.',
    },
    {
      icon: '📱',
      title: 'Track Status',
      description: 'Know exactly when your order will be ready with real-time updates.',
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose OrderUp?</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform is designed to make your dining experience seamless and efficient.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;