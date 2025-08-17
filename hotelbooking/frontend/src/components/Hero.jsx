import {assets} from "../assets/assets.js";

const Hero = () => {
  const cities = [
    "India",
    "New York",
    "London",
    
  ];

  return (
    <div className="flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url('https://wallpaperaccess.com/full/902487.jpg')] bg-no-repeat bg-cover bg-center h-screen">
      <p className="bg-black/50 px-4 py-1 rounded-full mt-20">
        The Hotel Experience
      </p>
      <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
        Discover Your Destination
      </h1>
      <p className="text-base md:text-lg mt-4 max-w-lg text-white leading-relaxed">
        Explore the best hotels and accommodations around the world, curated just for you. 
        Book your dream stay with ease and style.
      </p>
     {/*<button className="mt-8 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 rounded-full font-semibold text-white shadow-lg shadow-rose-500/30 transition-all duration-300">
        Start Exploring
      </button>*/}
      <form className='bg-white text-gray-500 rounded-lg px-6 py-4   mt-8 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto'>

            <div>
                <div className='flex items-center gap-2'>
                    <img src="/src/assets/calenderIcon.svg" alt="calender" className="h-4 " />
                    <label htmlFor="destinationInput">Destination</label>
                </div>
                <input list='destinations' id="destinationInput" type="text" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" placeholder="Type here" required />
                <datalist id='destinations'>
{
  cities.map((city, index) => (
    <option key={index} value={city} />
  ))
}
                </datalist>
            </div>

            <div>
                <div className='flex items-center gap-2'>
                   <img src="/src/assets/calenderIcon.svg" alt="calender" className="h-4 " />
                    <label htmlFor="checkIn">Check in</label>
                </div>
                <input id="checkIn" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
            </div>

            <div>
                <div className='flex items-center gap-2'>
                    <img src="/src/assets/calenderIcon.svg" alt="calender" className="h-4 " />
                    <label htmlFor="checkOut">Check out</label>
                </div>
                <input id="checkOut" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
            </div>

            <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
                <label htmlFor="guests">Guests</label>
                <input min={1} max={4} id="guests" type="number" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16" placeholder="0" />
            </div>

            <button className='flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1' >
                <img src="/src/assets/searchIcon.svg" alt="search" className="h-4 " />
                <span>Search</span>
            </button>
        </form>
    </div>
  );
};

export default Hero;
