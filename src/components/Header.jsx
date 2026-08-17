import {useNavigate} from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="border-b border-zinc-800 bg-black fixed top-0 z-50 w-full">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-5 px-4 py-5  lg:flex-row lg:items-center lg:justify-between sm:flex-row sm:items-center sm:justify-between ">
        
        <div>
            <span className="text-2xl  tracking-tight text-red-500">Netflix Lite</span>

          <p className="mt-1 text-sm text-zinc-500">
            Get the movies you love
          </p>
        </div>

        <button onClick={(e) => { navigate("/search") }}>
          <input className='border border-gray-600 px-3 py-2 rounded-lg transition-all duration-200 hover:border-white' type="text" placeholder='Search movies'/>
        </button>

        <button
          type="button"
          onClick={(e)=>{navigate("/favourites")}}
          className=" rounded-xl border border-zinc-700 px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white lg:block"
        >
          Favorites
        </button>
      </div>
    </header>
    
  );
}

export default Header;