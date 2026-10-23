import { useState, useEffect, useRef } from "react";
import "./App.css";

/*
  Choose which content to show:  "people"  or  "places"
  Images: put files in  public/images/  named after the item, e.g.
    Narendra Modi -> narendra-modi.jpg      Goa -> goa.jpg
  Background image: public/images/background.jpg  (see --bg-image in App.css)
*/
const ACTIVE = "people";

const DATASETS = {
  people: {
    "Favourite Politicians": [
      { name: "Narendra Modi", note: "Prime Minister of India" , image: "/images/polytitian/naredra modi.png", },
      { name: "Atal Bihari Vajpayee", note: "Statesman & poet" , image: "/images/polytitian/atal bihari vajpayee.png",},
      { name: "Indira Gandhi", note: "India's first woman PM" ,image: "/images/polytitian/indira gandhi.png",},
      { name: "Manmohan Singh", note: "Economist & former PM" , image: "/images/polytitian/manmohan singh.png",},
      { name: "Sardar Vallabhbhai Patel", note: "Iron Man of India" , image: "/images/polytitian/sardar vallabhbhai patel.png",},
      { name: "Jawaharlal Nehru", note: "India's first PM", image: "/images/polytitian/jawaharlal neharu.png", },
    ],
    "Favourite Sports Persons": [
      { name: "Sachin Tendulkar", note: "Master Blaster" , image: "/images/sports persons/sachin tendulkar.png",},
      { name: "Virat Kohli", note: "Run machine",  image: "/images/sports persons/virat kohali.png",},
      { name: "MS Dhoni", note: "Captain Cool" ,image: "/images/sports persons/ms dhoni.png",},
      { name: "PV Sindhu", note: "Badminton champion",  image: "/images/sports persons/pv sindhu.png", },
      { name: "Neeraj Chopra", note: "Olympic javelin gold" , image: "/images/sports persons/neeraj chopra.png",},
      { name: "Mary Kom", note: "Boxing legend", image: "/images/sports persons/mary kom.png", },
    ],
    "Favourite Actors": [
      { name: "Shah Rukh Khan", note: "King of Bollywood", image: "/images/actores/shah rukh khan.png", },
      { name: "Amitabh Bachchan", note: "Shahenshah of cinema" , image: "/images/actores/amitabh bachchan.png",},
      { name: "Aamir Khan", note: "Mr. Perfectionist",  image: "/images/actores/aamir khan.png",},
      { name: "Salman Khan", note: "Bhaijaan" , image: "/images/actores/salman khan.png",},
      { name: "Deepika Padukone", note: "Global star" ,   image: "/images/actores/deepika padukon.png",},
      { name: "Priyanka Chopra", note: "Actor & producer" ,  image: "/images/actores/priyanka chopra.png",},
    ],
  },
 
};

const DATA = DATASETS[ACTIVE];
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// shown automatically when an image file is missing
const placeholder = (name) => {
  const ini = name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="524" height="398"><rect width="524" height="398" fill="#cfe8da"/><circle cx="262" cy="199" r="110" fill="#1b7a4b" opacity=".18"/><text x="262" y="228" font-family="Arial" font-size="88" font-weight="700" fill="#1b7a4b" text-anchor="middle">${ini}</text></svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
};

export default function App() {
  const categories = Object.keys(DATA);
  const [openMenu, setOpenMenu] = useState(categories[0]); // open on load, like the screenshot
  const last = categories[categories.length - 1];
  const [selected, setSelected] = useState({ cat: last, idx: 0 });
  const barRef = useRef(null);

  useEffect(() => {
    const onDown = (e) => {
      if (barRef.current && !barRef.current.contains(e.target)) setOpenMenu(null);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const item = DATA[selected.cat][selected.idx];

  return (
    <div className="page">
      <h1 className="title">My Favourites</h1>

      <div className="bar" ref={barRef}>
        {categories.map((cat) => {
          const isOpen = openMenu === cat;
          return (
            <div className="dd" key={cat}>
              <button
                className={"dd-btn" + (isOpen ? " open" : "")}
                onClick={() => setOpenMenu(isOpen ? null : cat)}
              >
                <span>{cat}</span>
                <span className="arrow">{isOpen ? "▲" : "▼"}</span>
              </button>

              {isOpen && (
                <ul className="menu">
                  {DATA[cat].map((p, i) => (
                    <li
                      key={p.name}
                      className="menu-item"
                      onClick={() => {
                        setSelected({ cat, idx: i });
                        setOpenMenu(null);
                      }}
                    >
                      {p.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      <div className="show">
        <div className="frame">
          <img
  src={item.image}
  alt={item.name}
  onError={(e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = placeholder(item.name);
  }}
/>
        </div>
        <p className="caption">
          {item.name} — {item.note}
        </p>
      </div>
    </div>
  );
}
