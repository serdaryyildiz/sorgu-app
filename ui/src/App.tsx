export default function App() {
  const handlePing = () => {
    const res = window.api?.ping?.();
    alert(res ?? 'no api');
  };

  return (
    <div>
      <h1>Hello from Vite + React</h1>
      <button onClick={handlePing}>Ping preload</button>
    </div>
  );
}
