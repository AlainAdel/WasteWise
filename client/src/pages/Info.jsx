import React from 'react';

const Info = () => {
  return (
    <div className="montserrat-regular bg-black text-white min-h-screen px-6 py-10 max-w-4xl mx-auto space-y-10">
      <h1 className="text-blue-400 text-3xl text-center">
        About WasteWise
      </h1>

      {/* What is WasteWise */}
      <section>
        <h2 className="text-xl font-semibold text-blue-300 mb-2">What is WasteWise?</h2>
        <p className="text-gray-300">
          WasteWise is an intelligent tool that helps you identify types of waste
          and find nearby recycling centers that accept them. Just upload an image of an item,
          and we’ll take care of the classification and location matching.
        </p>
      </section>

      {/* How Classification Works */}
      <section>
        <h2 className="text-xl font-semibold text-blue-300 mb-2">How Classification Works</h2>
        <p className="text-gray-300">
          We use OpenAI's Vision model to analyze your uploaded image and detect
          what kind of waste it is — such as plastic, glass, or e-waste.
          Don’t worry — your image is not stored and is used only to generate a prediction.
        </p>
      </section>

      {/* Types of Waste Recognized */}
      <section>
        <h2 className="text-xl font-semibold text-blue-300 mb-2">Supported Waste Types</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li>Plastic</li>
          <li>Metal</li>
          <li>Glass</li>
          <li>Paper</li>
          <li>E-waste</li>
          <li>Organic</li>
          <li>Textiles</li>
          <li>Shoes</li>
        </ul>
      </section>

      {/* Facility Matching */}
      <section>
        <h2 className="text-xl font-semibold text-blue-300 mb-2">Facility Matching</h2>
        <p className="text-gray-300">
          Once your waste type is classified, we use your ZIP code to show nearby facilities
          that accept that type. Our database includes real-world centers and drop-off points across several categories.
        </p>
      </section>

      {/* Privacy */}
      <section>
        <h2 className="text-xl font-semibold text-blue-300 mb-2">Privacy & Data</h2>
        <p className="text-gray-300">
          We don’t save your uploaded images. All classification is done instantly and temporarily.
          We may store local session history in your browser to help you track past items.
        </p>
      </section>

      {/* FAQs */}
      <section>
        <h2 className="text-xl font-semibold text-blue-300 mb-2">FAQs</h2>
        <ul className="text-gray-300 space-y-3">
          <li><strong>Q:</strong> Is this free? <br /><strong>A:</strong> Yes, 100% free.</li>
          <li><strong>Q:</strong> Can I use this on my phone? <br /><strong>A:</strong> Absolutely. The site is fully mobile responsive.</li>
          <li><strong>Q:</strong> Do I need to sign up? <br /><strong>A:</strong> No account needed.</li>
          <li><strong>Q:</strong> Can I upload more than one image? <br /><strong>A:</strong> Yes — multi-image support is built in!</li>
        </ul>
      </section>

      {/* Credits */}
      {/* <section>
        <h2 className="text-xl font-semibold text-blue-300 mb-2">Credits & Technology</h2>
        <p className="text-gray-300">
          WasteWise was built using:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li>React + Tailwind CSS</li>
          <li>Express.js (Node.js backend)</li>
          <li>PostgreSQL database</li>
          <li>OpenAI Vision API</li>
          <li>Vercel / Render / Netlify for deployment</li>
        </ul>
      </section> */}

      {/* Contact */}
      <section>
        <h2 className="text-xl font-semibold text-blue-300 mb-2">Contact / Feedback</h2>
        <p className="text-gray-300">
          Spot a bug or have a suggestion? Reach out at{' '}
          <a href="mailto:your@email.com" className="text-blue-400 underline">alainadel2020@outlook.com</a>.
        </p>
      </section>
    </div>
  );
};

export default Info;
