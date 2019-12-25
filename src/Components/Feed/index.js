import React, { useState, useEffect } from "react";
import axios from "axios";
import debounce from "lodash.debounce"; // debounce for timed delay, so that only 'one' update per scroll trigger
// import { Link } from "react-router-dom";

const Feed = () => {
  const [postList, setPostList] = useState([]);
  const [pokenum, setPokenum] = useState(1);

  useEffect(() => {
    fetch10();
  }, []);

  async function fetch10() {
    try {
      let f10 = [];
      let i = pokenum;
      let currpkm;
      for(i; i <= 10; i++){
          currpkm = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
          f10.push(currpkm.data);
      }
      setPokenum(i);
      setPostList(f10);
    } catch (e) {
      console.log(e, "error");
    }
  }

  let add10 = () => {
    fetch10();
  }

//   let sortByRecent = recentData.sort(function(a, b) {
//     return new Date(b.ts) - new Date(a.ts);
//   });

  return (
    <div>
      <h2>Feed</h2>
      <div>
        {/* <h4>Pinned items</h4>
        <ol>
          {likeData.map((item, index) => (
            <li key={index}>
              <Link to={`/tiermaker/${item._id}`}>{item.title}</Link>
            </li>
          ))}
        </ol> */}
        <h4>Using POKEAPI /pokemon/:id starting from 1 </h4>
        <ol>
          {sortByRecent.map((item, index) => (
            <li key={index}>
              <Link to={`/tiermaker/${item._id}`}>{item.title}</Link>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Feed;
