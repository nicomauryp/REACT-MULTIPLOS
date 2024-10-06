import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState } from "react";

const Navigation = () => (
  <nav className="bg-gray-800 p-4 w-full">
    <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
      <Link to="/" className="text-green-500 font-bold text-xl">
        MathApp
      </Link>
      <div className="space-x-6">
        <Link to="/" className="text-gray-300 hover:text-gray-100">
          Inicio
        </Link>
        <Link to="/calculator" className="text-gray-300 hover:text-gray-100">
          Calculadora
        </Link>
      </div>
    </div>
  </nav>
);

const Home = () => (
  <div className="min-h-[calc(100vh-64px)] w-full">
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Matemáticas y Múltiplos
        </h1>
        <p className="text-gray-600 mb-6">
          Bienvenido a nuestra aplicación de matemáticas. Aquí aprenderás sobre
          múltiplos y sus propiedades de una manera interactiva y visual.
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          ¿Qué son los múltiplos?
        </h2>
        <p className="text-gray-600 mb-8">
          Los múltiplos son números que resultan de multiplicar un número por
          los números naturales. En esta aplicación, trabajaremos
          específicamente con múltiplos de 3, 5 y 7.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 rounded-lg p-6">
            <h3 className="font-bold text-green-800 mb-2">Múltiplos de 3</h3>
            <p className="text-green-700">3, 6, 9, 12, 15, ...</p>
          </div>
          <div className="bg-red-50 rounded-lg p-6">
            <h3 className="font-bold text-red-800 mb-2">Múltiplos de 5</h3>
            <p className="text-red-700">5, 10, 15, 20, 25, ...</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="font-bold text-blue-800 mb-2">Múltiplos de 7</h3>
            <p className="text-blue-700">7, 14, 21, 28, 35, ...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Calculator = () => {
  const [number, setNumber] = useState("");
  const [results, setResults] = useState([]);

  const calculateMultiples = (num) => {
    const newResults = [];
    for (let i = 0; i <= num; i++) {
      const multiples = [];
      if (i % 3 === 0) multiples.push(3);
      if (i % 5 === 0) multiples.push(5);
      if (i % 7 === 0) multiples.push(7);

      let color = "text-black";
      if (multiples.length > 0) {
        const minMultiple = Math.min(...multiples);
        if (minMultiple === 3) color = "text-green-500";
        else if (minMultiple === 5) color = "text-red-500";
        else if (minMultiple === 7) color = "text-blue-500";
      }

      newResults.push({
        number: i,
        multiples,
        color,
      });
    }
    setResults(newResults);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateMultiples(parseInt(number));
  };

  return (
    <div className="min-h-[calc(100vh-64px)] w-full">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Calculadora de Múltiplos
          </h2>
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ingresa un número"
              min="0"
              required
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Calcular
            </button>
          </form>

          {results.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Resultados:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {results.map(({ number, multiples, color }) => (
                  <div key={number} className="p-3 border rounded-lg">
                    <div className="text-center">
                      <span className={`text-lg font-bold ${color}`}>
                        {number}
                      </span>
                      {multiples.length > 0 && (
                        <div className="text-gray-500 text-sm">
                          Múltiplo de: {multiples.join(", ")}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<Calculator />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
