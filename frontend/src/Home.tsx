import {useEffect, useState} from "react";

export default function Home() {
  const [songs, setSongs] = useState([]);
  const [saved, setSaved] = useState([]);

  const getAuthToken = () => {
    let atc = document.cookie.split(";").find((cookie) => cookie.startsWith("authToken"));
    return atc?.split('=')[1] || null
  }

  const getSongs = async () => {
    const response = await fetch("http://localhost:4000/saved?authToken=" + getAuthToken());
    const saved = await response.json();
    const res = await fetch("http://localhost:4000/songs?authToken=" + getAuthToken());
    const songs = await res.json();
    setSaved(saved);
    setSongs(songs);
  };

  const saveSong = async (song) => {
    await fetch("http://localhost:4000/saved?authToken=" + getAuthToken(), {
      body: JSON.stringify(song),
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  const deleteSong = async (song) => {
    await fetch("http://localhost:4000/saved?authToken=" + getAuthToken(), {
      body: JSON.stringify(song),
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  const findSongs = async (query) => {
    const response = await fetch("http://localhost:4000/songs?name=" + query + "&authToken=" + getAuthToken());
    setSongs(await response.json())
  }

  const findSongsSaved = async (query) => {
    const response = await fetch("http://localhost:4000/saved?name=" + query + "&authToken=" + getAuthToken());
    setSaved(await response.json())
  }

  useEffect(() => {
    getSongs();
  }, []);

  return (
    <div className="grid md:grid-cols-2 gap-4 p-4 justify-center container mx-auto h-screen my-auto">
      <div className="border-2 border-orange-500 rounded-md w-full">

        <div className="flex flex-col gap-2 p-4 ">
          <div className="text-4xl text-white font-bold py-2">Songs</div>
          <input
            type="search"
            className="w-full rounded border-2 border-orange-500 bg-transparent p-2 text-base text-white placeholder-white"
            id="exampleSearch"
            onChange={(e) => findSongs(e.target.value)}
            placeholder="Find songs..." />

          {songs.map((el) => (
            <div
              className="p-2 rounded-lg border-2 border-gray-500">
              <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                <li className="p-2">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img className="w-12 h-12 rounded-md"
                           src={el.albumImage}
                           referrerPolicy={'no-referrer'}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {el.name}
                      </div>
                      <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {el.artist}
                      </div>
                    </div>
                    <button onClick={() => saveSong(el)} className="hover:cursor-pointer rounded font-bold text-black bg-white  p-2 px-3">Add</button>
                  </div>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-2 border-orange-500 rounded-md w-full pt-2">

        <div className="flex flex-col h-full gap-2 p-4 ">
          <div className="text-4xl text-white font-bold py-2">Saved</div>
          <input
            type="search"
            className="w-full rounded border-2 border-orange-500 bg-transparent p-2 text-base text-white placeholder-white"
            id="exampleSearch"
            onChange={(e) => findSongsSaved(e.target.value)}
            placeholder="Find saved songs..." />
          {saved.map((el) => (
            <div
              className="p-2 rounded-lg border-2 border-gray-500">
              <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                <li className="p-2">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img className="w-12 h-12 rounded-md"
                           src={el.albumImage} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {el.name}
                      </div>
                      <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {el.artist}
                      </div>
                    </div>
                    <button onClick={() => deleteSong(el)} className="hover:cursor-pointer font-bold text-white bg-orange-500 rounded py-2 px-3">Delete</button>
                  </div>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}