import profileImage from "@/assets/images/person.png";

export default function FAQButton() {
  return (
    <a
      href="https://mypery.com/#faqs"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50"
    >
      <div className="flex items-center gap-3 px-4 py-2 bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md transition">
        {/* Head-cropped circle */}
        <div className="w-11 h-11 rounded-full overflow-hidden relative">
          <img
            src={profileImage}
            alt="Support"
            className="absolute scale-[1.4] -translate-x-[-15%] -translate-y-[-10%] object-cover"
          />
        </div>
        <span className="font-semibold text-black text-base">FAQs & help</span>
      </div>
    </a>
  );
}
