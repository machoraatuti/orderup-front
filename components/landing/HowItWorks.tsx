import React from 'react';

type StepProps = {
  number: number;
  title: string;
  description: string;
};

const Step = ({ number, title, description }: StepProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
        {number}
      </div>
      <h3 className="text-lg font-semibold mb-2 text-center">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: 'Browse Restaurants',
      description: 'Find restaurants near you with our easy search.',
    },
    {
      number: 2,
      title: 'Pre-Order',
      description: 'Select your meals and set your arrival time.',
    },
    {
      number: 3,
      title: 'Pay in App',
      description: 'Secure payment for a seamless experience.',
    },
    {
      number: 4,
      title: 'Enjoy!',
      description: 'Arrive, pick up your meal, and enjoy!',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            OrderUp makes pre-ordering your meals simple and convenient.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <Step
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;