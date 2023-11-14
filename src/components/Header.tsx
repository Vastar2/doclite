import Image from "next/image";

const Header = () => {
  return (
    <div className="flex items-center justify-between bg-red-400 w-[1200px] px-6 h-14 fixed top-6 left-1/2 -translate-x-1/2 z-20">
      <div className="flex items-end gap-4">
        <Image
          src="/logo.png"
          alt="Editor Logo"
          width={26}
          height={0}
          priority
        />
        <p className="text-xl font-bold">Doclite</p>
      </div>
      <ul className="flex items-center gap-4">
        <li className="flex items-center">
          <button className="">bold</button>
        </li>
        <li className="flex items-center">
          <button>italic</button>
        </li>
        <li className="flex items-center">
          <button>underline</button>
        </li>
        <li className="flex items-center">
          <button>strikethrough</button>
        </li>
        <li className="flex items-center">
          <button>headers</button>
        </li>
      </ul>
    </div>
  );
};

export default Header;
