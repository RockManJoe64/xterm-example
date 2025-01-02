import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";

const handleEnterKey = (term) => {
  term.write("\r\n"); // Move to the next line
  if (inputBuffer === "exit") {
    console.log("exit");
    term.write("Goodbye!\r\n");
    window.location.href = "https://www.ecosia.org";
    // term.dispose();
  } else {
    term.write(`Echo: ${inputBuffer}\r\n`);
  }

  term.write("\r\n"); // Move to the next line
  term.write("$ "); // Print the prompt
};

const initTerminal = () => {
  const element = document.getElementById("terminal");
  const term = new Terminal();
  const fitAddon = new FitAddon();
  term.loadAddon(fitAddon);
  term.open(element);
  fitAddon.fit();
  window.addEventListener("resize", () => {
    console.log("resize");
    fitAddon.fit();
  });

  return term;
};

const term = initTerminal();
term.write("Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ");

let inputBuffer = "";
term.onData((data) => {
  // Handle Enter key press
  if (data === "\r" || data === "\n") {
    handleEnterKey(term);
    // Clear the buffer
    inputBuffer = "";
  } else {
    term.write(data); // Echo other characters
    inputBuffer += data;
  }
});
