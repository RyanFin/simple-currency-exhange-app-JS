import { useEffect, useState } from "react";
// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

export default function App() {
  const [amount, setNewAmount] = useState(1);
  const [inputText, setInputText] = useState("");
  const [fromCurr, setFrom] = useState("GBP"); //GBP by default
  const [toCurr, setTo] = useState("USD");
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function convert() {
        setErr("");

        const controller = new AbortController();

        console.log(`${inputText}&from=${fromCurr}&to=${toCurr}`);

        try {
          setIsLoading(true);
          // fetch request
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${inputText}&from=${fromCurr}&to=${toCurr}`,
            { signal: controller.signal }
          );
          const data = await res.json();

          setIsLoading(false);
          console.log(data);
          console.log(toCurr);
          setNewAmount(data.rates[toCurr]);

          if (!res.ok) {
            throw new Error("something wrong with currency conversion.");
          }
        } catch (err) {
          console.log(err.message);
          console.log(err.message.length);
          setErr(err);
        }
      }

      if (fromCurr === toCurr) {
        return setNewAmount(inputText);
      }

      convert();
    },
    [inputText, toCurr, fromCurr]
  );

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setInputText(e.target.value)}
        placeholder={"enter currency amount..."}
        style={{ width: "50%", marginRight: "2em" }}
        // disabled={isLoading}
      />
      <select
        value={fromCurr}
        disabled={isLoading}
        onChange={(e) => {
          setFrom(e.target.value);
        }}
      >
        <option value="GBP">GBP</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCurr}
        disabled={isLoading}
        onChange={(e) => {
          setTo(e.target.value);
        }}
      >
        <option value="GBP">GBP</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      {/* {err.message.length > 0 ? <p>{err.message}</p> : <p>{amount}</p> } */}
      <p>
        {amount} {toCurr}
      </p>
    </div>
  );
}
