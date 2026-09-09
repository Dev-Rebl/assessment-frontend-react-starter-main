import {useState} from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [data, setData] = useState({email: "", password: ""});
  const navigate = useNavigate()

  const sendData = async () => {
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      navigate("/");
    }
  };

  return (
    <div
      className="p-8 h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <svg width="350" height="350" viewBox="0 0 585 400"  xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0L127.162 213.373L8.86943 400H30.3012L137.549 230.352L238.873 400H309.772L174.198 172.378L203.395 127.178L193.343 109.411L164.314 155.388L71.4019 0H0Z" fill="#EEE"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M554.254 0L447.354 169.659L346.369 0H275.688L410.812 227.622L381.721 272.822L391.729 290.6L420.654 244.612L513.287 400H584.458L457.707 186.639L575.617 0H554.254Z" fill="#EEE"/>
        </svg>
      </div>
      <form method="post" onSubmit={sendData} className="md:w-1/3 max-w-sm">
        <input className="w-full rounded border-2 text-white border-white-200 bg-transparent p-2 mb-4"
               type="text"
               value={data.email}
               onChange={(e) => setData({email: e.target.value})}
               placeholder="Email"
        />
        <input className="w-full rounded border-2 text-white border-white-200 bg-transparent p-2"
               type="password"
               placeholder="Password"
               value={data.password}
               onChange={(e) => setData({password: e.target.value})}/>
        <div className="text-center md:text-left">
          <button
            className="hover:cursor-pointer  text-white bg-orange-500 rounded py-2 px-3 mt-6"
            type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}