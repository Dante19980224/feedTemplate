import React, { useState, useEffect } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import "./feed.css";

const Feed = () => {
  const [postList, setPostList] = useState([]);
  const [pokenum, setPokenum] = useState(1);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  async function fetch10(pnum, plist) {
    setIsLoading(true);
    const maxNum = await axios.get("https://pokeapi.co/api/v2/pokemon");
    if(pnum > maxNum.data.count){
      setHasMore(false);
      return;
    }
    try {
      let f10 = plist;
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
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  let handleScroll = debounce(() => {
    if(window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight){
      return;
    }
    if(isLoading || error || !hasMore){
      return;
    }
    fetch10();
  }, 100, [isLoading, error, hasMore, fetch10]);

  useEffect(() => {
    fetch10(pokenum, postList)
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pokenum, postList, handleScroll, fetch10]);

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
        {postList.map((item, index) => (
          <div className="Feed" key={index}>
            <img src={item.sprites.front_default} alt={"image of "+item.name} />
            <p>ID: {item.id}</p>
            <p>Name: <b>{item.name}</b></p>
            <p>Height: {item.height}</p>
            <p>Weight: {item.weight}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
