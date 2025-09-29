import { useState } from "react";


export default function App() {
  const [username , setUsername] = useState("");
  const [password , setPassword] = useState("");

  const handlePing = () => {
    const res = window.api?.ping?.();
    alert(res ?? 'no api');
  };

  const pingServer = async  () => {
    return await fetch("http://localhost:3030");
  }

  const loginButton = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginRequest = {
      method: "POST",
      headers : {"Content-Type" : "application/json"},
      body: JSON.stringify({username , password})
    };
    try{
      const response = await fetch(
        "http://localhost:3030/auth/sign-in",
        loginRequest
      );
      const data = await response.json();
      console.log("Login response" , data);
      alert("Login succesfull");
    }catch(err){
      console.error(err);
      console.log(`Username : ` , username);
      console.log("Password : " , password);
      alert("Login failed");
    }
  }

  return (
    <div>
      <h1>Hello from Vite + React</h1>
      <button onClick={pingServer}>a</button>
      <form onSubmit={loginButton}>
        <input 
        type="text"
        name="username"
        value={username}
        placeholder="Enter your username"
        onChange={(e) => setUsername(e.target.value)}/>

        <input 
        type="password"
        name="password"
        value={password}
        placeholder="Enter your password"
        onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
