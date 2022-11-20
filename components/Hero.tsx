export default function Hero() {
  return (
    <section className="w-full bg-gradient-to-r from-white via-gray-200 to-pink-200 mb-24 px-4">
      <div className="mx-auto py-36 sm:py-48 flex flex-col items-center">
        <h2 className="text-5xl p-4 text-center font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
          Black and White images for babies
        </h2>
        <p className="text-center text-black">
          Download these images free and print them out for your newborn to
          enjoy!
        </p>
        <div className="text-black mt-8">
          <p>Instructions:</p>
          <p>1. Choose a dark or light background</p>
          <p>2. Download image as a PDF or PNG file</p>
          <p>3. Print it out and let your newborn enjoy</p>
        </div>
      </div>
    </section>
  );
}
