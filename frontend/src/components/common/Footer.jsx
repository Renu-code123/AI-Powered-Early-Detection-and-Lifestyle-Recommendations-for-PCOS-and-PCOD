const Footer = ({ setActiveTab }) => {
  return (
    <footer className="bg-gray-100 text-black border-t-4 border-gray-400 shadow-md">
      <div className="container mx-auto px-6 py-10 border border-gray-300 rounded-lg">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Branding */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800">PCOS Guardian</h3>
            <p className="text-gray-600 mt-2 text-sm">
              AI-powered early detection and lifestyle guidance for PCOS/PCOD.
            </p>
          </div>

          {/* Navigation Links in Boxes */}
          <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: "Community", tab: "community" },
              { name: "Doctors", tab: "doctors" },
              { name: "Tracker", tab: "tracker" },
              { name: "Early Detection", tab: "early-detection" },
              { name: "Resources", tab: "resources" },
              { name: "Contact", tab: "contact" }
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => setActiveTab && setActiveTab(item.tab)}
                className="w-full text-center px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-200 transition hover:scale-105 duration-300"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 text-center text-xs text-gray-600 space-y-2">
          <p>
            Disclaimer: Educational information only, not medical advice. Consult a professional.
          </p>
          <p>
            Made with ❤️ by <span className="font-semibold text-gray-800">Renu</span>,{" "}
            <span className="font-semibold text-gray-800">Stuti</span>,{" "}
            <span className="font-semibold text-gray-800">Arushi</span>, and{" "}
            <span className="font-semibold text-gray-800">Palchhin</span>.
          </p>
          <p>
            © 2025 PCOS Guardian. All rights reserved. |{" "}
            <a href="#" className="hover:underline">Privacy Policy</a> |{" "}
            <a href="#" className="hover:underline">Terms of Use</a> |{" "}
            <a href="#" className="hover:underline">Cookie Policy</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
