const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-8">
      <div className="container mx-auto text-center">
        <h2 className="text-xl font-semibold">
          Your trusted Bookkeeping Service
        </h2>
        <div className="mt-2">
          <a
            href="/privacy-policy"
            className="text-white underline mx-2 text-md"
          >
            Privacy Policy
          </a>
          <a
            href="/terms-conditions"
            className="text-white underline mx-2 text-md"
          >
            Terms & Conditions
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
